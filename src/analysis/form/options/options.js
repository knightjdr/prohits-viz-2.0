import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'antd';

import CustomField from '../field/field';
import DefaultChange from '../field/default-change';

import './options.css';

const Options = ({
  show,
}) => {
  const optionsElement = (
    <div className="Options-container">
      <Divider>Advanced options</Divider>
      <CustomField
        helpMessage="The score direction defines how the scoring system in the
        input file works, i.e. are smaller scores better that large scores, or
        vice versa?"
        label="Score direction"
        name="scoreDir"
        onChange={DefaultChange}
        options={[
          { text: 'smaller values are better', value: 'lte' },
          { text: 'larger values are better', value: 'gte' },
        ]}
        placeHolder="Score direction..."
        required
        type="select"
      />
      <CustomField
        helpMessage="All preys that satisfy this score filter for at least one
        bait will be displayed on the dot plot. If a prey satisfies this filter
        for at least one bait, all the quantitative values for this prey – even
        those that did not satisfy the cutoff in particular bait-prey pairs -
        will also be included."
        inputType="number"
        label="Primary filter"
        name="primaryFilter"
        onChange={DefaultChange}
        placeHolder="Primary filter..."
        required
        type="input"
      />
      <CustomField
        helpMessage="Interactions that do no pass the primary score filter but
        pass this secondary filter will be marked with an intermediate intensity
        edge in the dot plot. Interactions that do not pass either filter will be
        marked with a low intensity edge. The secondary filter can be adjusted
        depending on the dataset to allow a greater or lesser number of interactions
        into this 'medium' confidence range."
        inputType="number"
        label="Secondary filter"
        name="secondaryFilter"
        onChange={DefaultChange}
        placeHolder="Secondary filter..."
        required
        type="input"
      />
    </div>
  );
  return (
    show ? optionsElement : null
  );
};

Options.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Options;
