import PropTypes from 'prop-types';
import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const Order = ({
  deleteBy,
  handleSelect,
  orderBy,
}) => (
  <div>
    <div className="analysis-option__label">Customization</div>
    <div className="analysis-option__details">
      <div className="analysis-option__group">
        <div>
          Delete:
        </div>
        <Select
          allowClear
          onChange={(value) => { handleSelect('deleteBy', value); }}
          placeholder="Delete by..."
          value={deleteBy}
        >
          <Option
            value="column"
          >
            by column
          </Option>
          <Option
            value="row"
          >
            by row
          </Option>
        </Select>
      </div>
      <div className="analysis-option__group">
        <div>
          Order:
        </div>
        <Select
          allowClear
          onChange={(value) => { handleSelect('orderBy', value); }}
          placeholder="Order by..."
          value={orderBy}
        >
          <Option
            value="column"
          >
            by column
          </Option>
          <Option
            value="row"
          >
            by row
          </Option>
        </Select>
      </div>
    </div>
  </div>
);

Order.defaultProps = {
  deleteBy: undefined,
  orderBy: undefined,
};

Order.propTypes = {
  deleteBy: PropTypes.string,
  handleSelect: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
};

export default Order;
