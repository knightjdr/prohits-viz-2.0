import PropTypes from 'prop-types';
import React from 'react';
import { Select } from 'antd';

import Species from './species';

const { Option } = Select;

const filterSpecies = (input, option) => (
  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
);

const Organism = ({
  handleSelect,
  organism,
}) => (
  <div>
    <div className="analysis-option__label">Organism</div>
    <Select
      filterOption={filterSpecies}
      onChange={(value) => { handleSelect('organism', value); }}
      placeholder="Organism..."
      showSearch
      value={organism}
    >
      {
        Species.map(option => (
          <Option
            disabled={option.disabled}
            key={option.value}
            value={option.value}
          >
            {option.name}
          </Option>
        ))
      }
    </Select>
  </div>
);

Organism.defaultProps = {
  organism: undefined,
};

Organism.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  organism: PropTypes.string,
};

export default Organism;
