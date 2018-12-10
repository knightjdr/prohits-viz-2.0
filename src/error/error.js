import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';

import './error.css';

const Error = ({
  reportError,
}) => (
  <main className="error">
    <h1>
      Whoops, something went wrong
    </h1>
    <p>
      You can report the error by clicking below. If you do so please record any
      details about what you were doing and include the file you were using if
      applicable.
    </p>
    <div className="error__nav-buttons">
      <Button
        onClick={reportError}
        type="primary"
      >
        Report error
      </Button>
    </div>
  </main>
);

Error.propTypes = {
  reportError: PropTypes.func.isRequired,
};

export default Error;
