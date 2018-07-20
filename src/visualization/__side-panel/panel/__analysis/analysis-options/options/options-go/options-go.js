import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';
import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons';

import Advanced from './options-go__advanced';
import Database from './options-go__db';
import Orgnaism from './options-go__organism';

const Go = ({
  form,
  handleCheckbox,
  handleGoCheckbox,
  handleInput,
  handleSelect,
  showAdvanced,
  toggleAdvanced,
}) => (
  <div className="analysis-option">
    <div className="analysis-option__help">
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      <span>
        Gene Ontology (GO) analysis is performed using{' '}
        <a
          href="https://biit.cs.ut.ee/gprofiler/"
          rel="noopener noreferrer"
          target="_blank"
        >
          g:Profiler
        </a>. Please see their help for descriptions of the options below.
      </span>
    </div>
    <Orgnaism
      handleSelect={handleSelect}
      organism={form.organism}
    />
    <Database
      form={form}
      handleCheckbox={handleCheckbox}
      handleGoCheckbox={handleGoCheckbox}
    />
    <div className="anaylsis-option__advanced">
      <Button
        onClick={toggleAdvanced}
      >
        { showAdvanced ? 'Hide advanced' : 'Show advanced' }
      </Button>
      {
        showAdvanced &&
        <Advanced
          handleCheckbox={handleCheckbox}
          handleInput={handleInput}
          handleSelect={handleSelect}
          form={form}
        />
      }
    </div>
  </div>
);

Go.propTypes = {
  form: PropTypes.shape({}).isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleGoCheckbox: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  showAdvanced: PropTypes.bool.isRequired,
  toggleAdvanced: PropTypes.func.isRequired,
};

export default Go;
