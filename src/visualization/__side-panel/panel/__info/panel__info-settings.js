import React from 'react';

import ConvertCamel from '../../../../helpers/convert-camel';
import TestParams from '../../../test/params';

// Do not show parameter keys for things in this array.
const omitKeys = ['colorSpace', 'imageType'];
// Convert score type value as indicated in this object.
const scoreType = {
  gte: 'larger scores better',
  lte: 'smaller scores better',
};

const InfoSettings = (params = TestParams) => {
  const sortedKeys = Object.keys(params).sort();
  return sortedKeys.map((key) => {
    if (
      !params[key] ||
      omitKeys.includes(key)
    ) {
      return null;
    } else if (key === 'scoreType') {
      return [
        <div key={`${key}-name`}>
          {ConvertCamel(key)}
        </div>,
        <div key={`${key}-value`}>
          {scoreType[params[key]]}
        </div>,
      ];
    } else if (
      params[key] &&
      typeof params[key] === 'string'
    ) {
      return [
        <div key={`${key}-name`}>
          {ConvertCamel(key)}
        </div>,
        <div key={`${key}-value`}>
          {params[key]}
        </div>,
      ];
    } else if (
      params[key] &&
      Array.isArray(params[key])
    ) {
      return [
        <div key={`${key}-name`}>
          {ConvertCamel(key)}
        </div>,
        <div key={`${key}-value`}>
          {params[key].map(value => (
            <div key={value}>
              {value}
            </div>
          ))}
        </div>,
      ];
    }
    return null;
  });
};
export default InfoSettings;
