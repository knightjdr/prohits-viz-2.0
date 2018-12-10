import React from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

import MailTo from '../helpers/mail-to';

import './404.css';

const Missing = () => {
  const handleClick = () => {
    MailTo('404: missing page');
  };
  return (
    <main className="missing">
      <h1>
        Page Not Found
      </h1>
      <p>
        The page you were looking for was moved, removed, renamed or never existed.
      </p>
      <div className="missing__nav-buttons">
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
          onClick={handleClick}
          type="primary"
        >
          Contact
        </Button>
      </div>
    </main>
  );
};

export default Missing;
