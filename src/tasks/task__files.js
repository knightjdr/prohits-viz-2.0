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
  viewFile,
}) => {
  if (!files.length) {
    return '-';
  }
  return (
    <div className="tasks__files">
      <Select
        onChange={(value) => { changeFile(id, value); }}
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
        onClick={() => { viewFile(id); }}
      >
        View
      </Button>

      <Button
        className="tasks__files-download"
        onClick={() => { downloadFolder(id); }}
        type="success"
      >
        <FontAwesomeIcon icon={faDownload} />
      </Button>
    </div>
  );
};

Files.defaultProps = {
  files: [],
};

Files.propTypes = {
  changeFile: PropTypes.func.isRequired,
  downloadFolder: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.string,
  ),
  id: PropTypes.string.isRequired,
  viewFile: PropTypes.func.isRequired,
};

export default Files;
