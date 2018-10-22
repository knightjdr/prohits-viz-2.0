import PropTypes from 'prop-types';
import React from 'react';
import { Switch } from 'antd';

const Order = ({
  deleteRC,
  handleCheckbox,
  reorder,
}) => (
  <div>
    <div className="analysis-option__label">Customization</div>
    <div className="analysis-option__details analysis-option__details-order">
      <div>
        Delete:
      </div>
      <Switch
        onChange={(value) => { handleCheckbox('deleteRC', value); }}
        checked={deleteRC}
      />
      <div>
        Reorder:
      </div>
      <Switch
        onChange={(value) => { handleCheckbox('reorder', value); }}
        checked={reorder}
      />
    </div>
  </div>
);

Order.defaultProps = {
  deleteRC: false,
  reorder: false,
};

Order.propTypes = {
  deleteRC: PropTypes.bool,
  handleCheckbox: PropTypes.func.isRequired,
  reorder: PropTypes.bool,
};

export default Order;
