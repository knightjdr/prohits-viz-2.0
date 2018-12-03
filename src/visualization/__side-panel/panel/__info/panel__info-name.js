import PropTypes from 'prop-types';
import React from 'react';
import { Popconfirm } from 'antd';

import Button from '../../../../components/button/button';

import './panel__info.css';

const Name = ({
  loadNewFile,
  name,
}) => (
  <div className="panel__info-name">
    <div>
      File/session name:
    </div>
    <div>
      {name}
    </div>
    <div>
      <Popconfirm
        cancelText="No"
        onConfirm={loadNewFile}
        okText="Yes"
        placement="bottomRight"
        title="Confirm open new file."
      >
        <Button
          type="light"
        >
          Load new file
        </Button>
      </Popconfirm>
    </div>
  </div>
);

Name.propTypes = {
  loadNewFile: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Name;
