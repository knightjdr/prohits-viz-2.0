import React from 'react';

import ConvertCamel from '../../../../helpers/convert-camel';

const InfoSettings = (params) => {
  // Do not show parameter keys for things in this array.
  const omitKeys = ['colorSpace', 'imageType', 'name'];
  // Convert score type value as indicated in this object.
  const scoreType = {
    gte: 'larger scores better',
    lte: 'smaller scores better',
  };
  const sortedKeys = Object.keys(params).sort();
  return (
    <div className="panel__info-settings">
      {
        sortedKeys.map((key) => {
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
        })
      }
    </div>
  );
};
export default InfoSettings;
