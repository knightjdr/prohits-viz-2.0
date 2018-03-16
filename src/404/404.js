import React from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

import MailTo from '../helpers/mail-to';

import './404.css';

const Missing = () => (
  <div className="Missing-container">
    <div className="Missing-title">
      Page Not Found
    </div>
    <div className="Missing-test">
      The page you were looking for was moved, removed, renamed or never existed.
    </div>
    <div className="Missing-nav-buttons">
      <Button type="primary">
        <NavLink to="/">
          Home
        </NavLink>
      </Button>
      <Button type="primary">
        <NavLink to="/help">
          Help
        </NavLink>
      </Button>
      <Button
        onClick={() => { MailTo('Missing page'); }}
        type="primary"
      >
        Contact
      </Button>
    </div>
  </div>
);

export default Missing;
