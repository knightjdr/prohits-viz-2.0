import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Pagination, Popconfirm } from 'antd';
import {
  faFolderOpen,
  faTimes,
} from '@fortawesome/pro-solid-svg-icons';

import './session.css';

const Browser = ({
  changePage,
  deleteSession,
  openSession,
  sessionItemsTotal,
  sessions,
  sessionsPage,
}) => (
  <div className="session__browser">
    <strong>Saved browser sessions:</strong>
    <div className="session__browser-header">
      <div>ID</div>
      <div>Name</div>
      <div>Date</div>
      <div />
      <div />
    </div>
    <div className="session__browser-grid">
      {
        sessions.map(session => ([
          <div key={`${session.id}-id`}>{session.id}</div>,
          <div
            className="session_ellipsis"
            key={`${session.id}-name`}
            tooltip={session.name}
            tooltip-position="top"
          >
            <div>
              {session.name}
            </div>
          </div>,
          <div
            className="session_ellipsis"
            key={`${session.id}-date`}
          >
            <div>
              {session.date}
            </div>
          </div>,
          <div key={`${session.id}-open`}>
            <Popconfirm
              cancelText="No"
              onConfirm={() => { openSession(session.id, session.name); }}
              okText="Yes"
              placement="topRight"
              title="Confirm session launch"
            >
              <FontAwesomeIcon className="open-icon" icon={faFolderOpen} />
            </Popconfirm>
          </div>,
          <div key={`${session.id}-close`}>
            <Popconfirm
              cancelText="No"
              onConfirm={() => { deleteSession(session.id, session.name); }}
              okText="Yes"
              placement="topRight"
              title="Confirm session deletion"
            >
              <FontAwesomeIcon className="close-icon" icon={faTimes} />
            </Popconfirm>
          </div>,
        ]))
      }
    </div>
    <div className="session__pageination">
      <Pagination
        current={sessionsPage}
        hideOnSinglePage
        onChange={changePage}
        pageSize={5}
        total={sessionItemsTotal}
      />
    </div>
  </div>
);

Browser.propTypes = {
  changePage: PropTypes.func.isRequired,
  deleteSession: PropTypes.func.isRequired,
  openSession: PropTypes.func.isRequired,
  sessionItemsTotal: PropTypes.number.isRequired,
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  sessionsPage: PropTypes.number.isRequired,
};

export default Browser;
