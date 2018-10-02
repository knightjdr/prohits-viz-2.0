import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import columns from './tasks__columns';
import Navbar from '../navbar/navbar-container';
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

const columnTemplate = 'minmax(150px, 25%) minmax(150px, 25%) minmax(150px, 25%) minmax(150px, 25%)';

const Tasks = ({
  tasks,
}) => (
  <Fragment>
    <Navbar links={links} />
    <main className="tasks">
      <Table
        cellHeight={40}
        columns={columns.header}
        columnOrder={columns.order}
        columnTemplate={columnTemplate}
        firstColumn={{
          minWidth: 100,
          name: 'id',
        }}
        maxBodyWidth={400}
        rows={tasks}
      />
    </main>
  </Fragment>
);

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default Tasks;
