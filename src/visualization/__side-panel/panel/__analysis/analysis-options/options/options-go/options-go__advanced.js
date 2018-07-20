import PropTypes from 'prop-types';
import React from 'react';
import { Checkbox, InputNumber, Select } from 'antd';

const { Option } = Select;

const Advanced = ({
  form,
  handleCheckbox,
  handleInput,
  handleSelect,
}) => (
  <div className="anaylsis-option__advanced-inner">
    <div className="anaylsis-option__advanced-label">Advanced</div>
    <div className="anaylsis-option__advanced-inner-checkboxes">
      <Checkbox
        checked={form.region_query}
        onChange={() => { handleCheckbox('region_query'); }}
      >
        Chromosomal regions
      </Checkbox>
      <Checkbox
        checked={form.sort_by_structure}
        onChange={() => { handleCheckbox('sort_by_structure'); }}
      >
        Hierarchical sorting
      </Checkbox>
      <Checkbox
        checked={form.underrep}
        onChange={() => { handleCheckbox('underrep'); }}
      >
        Measure underrepresentation
      </Checkbox>
      <Checkbox
        checked={form.no_iea}
        onChange={() => { handleCheckbox('no_iea'); }}
      >
        No electronic GO annotations
      </Checkbox>
      <Checkbox
        checked={form.ordered_query}
        onChange={() => { handleCheckbox('ordered_query'); }}
      >
        Ordered query
      </Checkbox>
      <Checkbox
        checked={form.significant}
        onChange={() => { handleCheckbox('significant'); }}
      >
        Significant only
      </Checkbox>
    </div>
    <div>
      <div>Functional category (min):</div>
      <Select
        allowClear
        onChange={(value) => { handleSelect('min_set_size', value); }}
        placeholder="Select..."
        showSearch
        value={form.min_set_size}
      >
        <Option value={0}>min</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={5}>5</Option>
        <Option value={10}>10</Option>
        <Option value={25}>25</Option>
        <Option value={50}>50</Option>
      </Select>
    </div>
    <div>
      <div>Functional category (max):</div>
      <Select
        allowClear
        onChange={(value) => { handleSelect('max_set_size', value); }}
        placeholder="Select..."
        showSearch
        value={form.max_set_size}
      >
        <Option value={0}>max</Option>
        <Option value={50}>50</Option>
        <Option value={100}>100</Option>
        <Option value={350}>350</Option>
        <Option value={500}>500</Option>
        <Option value={1000}>1000</Option>
        <Option value={1500}>1500</Option>
        <Option value={2000}>2000</Option>
        <Option value={3500}>3500</Option>
        <Option value={5000}>5000</Option>
      </Select>
    </div>
    <div>
      <div>Hierarchical filtering:</div>
      <Select
        onChange={(value) => { handleSelect('hierfiltering', value); }}
        placeholder="Select..."
        showSearch
        value={form.hierfiltering}
      >
        <Option value="">Show all terms (no filtering)</Option>
        <Option value="compact_rgroups">Best per parent (moderate)</Option>
        <Option value="compact_ccomp">Best per parent group (strong)</Option>
      </Select>
    </div>
    <div>
      <div>Query/term intersection:</div>
      <Select
        allowClear
        onChange={(value) => { handleSelect('min_isect_size', value); }}
        placeholder="Select..."
        showSearch
        value={form.min_isect_size}
      >
        <Option value={0}>max</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={5}>5</Option>
        <Option value={10}>10</Option>
      </Select>
    </div>
    <div>
      <div>Significance threshold:</div>
      <Select
        onChange={(value) => { handleSelect('threshold_algo', value); }}
        placeholder="Select..."
        showSearch
        value={form.threshold_algo}
      >
        <Option value="analytical">g:SCS threshold</Option>
        <Option value="bonferroni">Bonferroni correction</Option>
        <Option value="fdr">Benjamini-Hochberg FDR</Option>
      </Select>
    </div>
    <div>
      <div>Statistical domain size:</div>
      <Select
        onChange={(value) => { handleSelect('domain_size_type', value); }}
        placeholder="Select..."
        showSearch
        value={form.domain_size_type}
      >
        <Option value="known">All known genes</Option>
        <Option value="annotated">Only annotated genes</Option>
      </Select>
    </div>
    <div>
      <div>User p-value:</div>
      <InputNumber
        onChange={(value) => { handleInput('user_thr', value); }}
        value={form.user_thr}
      />
    </div>
  </div>
);

Advanced.propTypes = {
  form: PropTypes.shape({
    domain_size_type: PropTypes.string,
    hierfiltering: PropTypes.string,
    max_set_size: PropTypes.number,
    min_isect_size: PropTypes.number,
    min_set_size: PropTypes.number,
    no_iea: PropTypes.bool,
    ordered_query: PropTypes.bool,
    region_query: PropTypes.bool,
    significant: PropTypes.bool,
    sort_by_structure: PropTypes.bool,
    threshold_algo: PropTypes.string,
    underrep: PropTypes.bool,
    user_thr: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default Advanced;
