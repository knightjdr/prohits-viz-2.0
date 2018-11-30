import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import columns from './tasks__columns';
import format from './tasks__format';
import Modal from './tasks__modal';
import Refresh from './tasks__refresh';
import Status from './tasks__status';
import Table from '../components/table/table-container';

import './tasks.css';

const columnTemplate = 'minmax(150px, 20%) minmax(150px, 20%) minmax(150px, 20%) minmax(250px, 40%)';

const Tasks = ({
  changeFile,
  closeModal,
  downloadFolder,
  error,
  isUpdating,
  missing,
  modalContent,
  modalTitle,
  openModal,
  tasks,
  refreshStatus,
  viewFile,
}) => (
  <Fragment>
    <main className="tasks">

      {
        error ||
        isUpdating ||
        missing ||
        tasks.length === 0 ?
          <Status
            error={error}
            isUpdating={isUpdating}
            missing={missing}
            taskNo={tasks.length}
          />
          : (
            <Table
              cellHeight={50}
              columns={columns.header}
              columnOrder={columns.order}
              columnTemplate={columnTemplate}
              firstColumn={{
                minWidth: 150,
                name: 'id',
                width: 150,
              }}
              maxBodyWidth={700}
              rows={format(tasks, changeFile, viewFile, downloadFolder)}
            />
          )
      }
      <Refresh
        handleClick={refreshStatus}
        tooltip="Refresh status"
        tooltip-position="right"
      />
    </main>
    <Modal
      closeModal={closeModal}
      modalContent={modalContent}
      title={modalTitle}
      visible={openModal}
    />
  </Fragment>
);

Tasks.defaultProps = {
  missing: null,
  modalContent: null,
  modalTitle: null,
};

Tasks.propTypes = {
  changeFile: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  downloadFolder: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  missing: PropTypes.bool,
  modalContent: PropTypes.string,
  modalTitle: PropTypes.string,
  openModal: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  refreshStatus: PropTypes.func.isRequired,
  viewFile: PropTypes.func.isRequired,
};

export default Tasks;
