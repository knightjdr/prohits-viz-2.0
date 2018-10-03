import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import columns from './tasks__columns';
import format from './tasks__format';
import Navbar from '../navbar/navbar-container';
import Refresh from './tasks__refresh';
import Status from './tasks__status';
import Table from '../components/table/table-container';

import './tasks.css';

const links = [
  {
    route: '/analysis',
    text: 'analysis',
  },
  {
    route: '/visualization',
    text: 'visualization',
  },
  {
    route: '/news',
    text: 'news',
  },
  {
    route: '/help',
    text: 'help',
  },
];

const columnTemplate = 'minmax(150px, 20%) minmax(150px, 20%) minmax(150px, 20%) minmax(250px, 40%)';

const Tasks = ({
  changeFile,
  downloadFolder,
  error,
  isUpdating,
  tasks,
  refreshStatus,
  viewFile,
}) => (
  <Fragment>
    <Navbar links={links} />
    <main className="tasks">

      {
        error ||
        isUpdating ||
        tasks.length === 0 ?
          <Status
            error={error}
            isUpdating={isUpdating}
            taskNo={tasks.length}
          />
          : (
            <Fragment>
              <Table
                cellHeight={50}
                columns={columns.header}
                columnOrder={columns.order}
                columnTemplate={columnTemplate}
                firstColumn={{
                  minWidth: 100,
                  name: 'id',
                }}
                maxBodyWidth={400}
                rows={format(tasks, changeFile, viewFile, downloadFolder)}
              />
            </Fragment>
          )
      }
      <Refresh
        handleClick={refreshStatus}
        tooltip="Refresh status"
        tooltip-position="right"
      />
    </main>
  </Fragment>
);

Tasks.propTypes = {
  changeFile: PropTypes.func.isRequired,
  downloadFolder: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  refreshStatus: PropTypes.func.isRequired,
  viewFile: PropTypes.func.isRequired,
};

export default Tasks;
