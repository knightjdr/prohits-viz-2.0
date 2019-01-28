import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Select } from 'antd';
import { faDownload } from '@fortawesome/pro-solid-svg-icons';

import Button from '../components/button/button';

const { Option } = Select;

const Files = ({
  changeFile,
  downloadFolder,
  files,
  id,
  primaryFile,
  viewFile,
}) => {
  if (!files.length) {
    return '-';
  }
  const download = () => {
    downloadFolder(id);
  };
  const handleChange = (value) => {
    changeFile(id, value);
  };
  const view = () => {
    viewFile(id);
  };
  return (
    <div className="tasks__files">
      <Select
        defaultValue={primaryFile}
        onChange={handleChange}
        placeholder="File..."
      >
        {
          files.map(file => (
            <Option
              key={file}
              value={file}
            >
              { file }
            </Option>
          ))
        }
      </Select>
      <Button
        className="tasks__files-view"
        onClick={view}
      >
        View
      </Button>

      <Button
        className="tasks__files-download"
        onClick={download}
        type="success"
      >
        <FontAwesomeIcon icon={faDownload} />
      </Button>
    </div>
  );
};

Files.defaultProps = {
  files: [],
  primaryFile: undefined,
};

Files.propTypes = {
  changeFile: PropTypes.func.isRequired,
  downloadFolder: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.string,
  ),
  id: PropTypes.string.isRequired,
  primaryFile: PropTypes.string,
  viewFile: PropTypes.func.isRequired,
};

export default Files;
