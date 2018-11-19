import React from 'react';
import { Tag } from 'antd';

import FalsyButNotZero from '../../../helpers/falsy-but-not-zero';

const validTypes = {
  logBase: [2, 'e', 10],
  normalization: ['readout', 'total'],
};

const Settings = (form) => {
  const tagArray = [];
  switch (form.analysisType) {
    case 'dotplot':
      tagArray.push({
        key: 'primaryFilter',
        text: `Primary filter: ${FalsyButNotZero(form.primaryFilter) ? 'not set' : form.primaryFilter}`,
      });
      tagArray.push({
        key: 'secondaryFilter',
        text: `Secondary filter: ${FalsyButNotZero(form.secondaryFilter) ? 'not set' : form.secondaryFilter}`,
      });
      tagArray.push({
        key: 'minAbundance',
        text: `Minimum abundance: ${FalsyButNotZero(form.minAbundance) ? 'not set' : form.minAbundance}`,
      });
      if (form.ctrlSub) {
        tagArray.push({
          key: 'ctrlSub',
          text: 'Control subtraction is selected',
        });
      }
      if (form.readoutLengthNorm) {
        tagArray.push({
          key: 'readoutLengthNorm',
          text: 'Readout length normalization is selected',
        });
      }
      if (
        form.normalization &&
        validTypes.normalization.includes(form.normalization)
      ) {
        tagArray.push({
          key: 'normalization',
          text: `Condition normalization: ${form.normalization === 'total' ? 'total abundance' : 'specific readout'}`,
        });
      }
      if (
        form.logBase &&
        validTypes.logBase.includes(form.logBase)
      ) {
        tagArray.push({
          key: 'logBase',
          text: `Log transformation: base ${form.logBase}`,
        });
      }
      tagArray.push({
        key: 'clustering',
        text: `Clustering type: ${form.clustering || 'not set'}`,
      });
      return (tagArray.map(tag => (
        <Tag
          className="submit__tag"
          key={tag.key}
        >
          {tag.text}
        </Tag>
      )));
    default:
      return null;
  }
};
export default Settings;
