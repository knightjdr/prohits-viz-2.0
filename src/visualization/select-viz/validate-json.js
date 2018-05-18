import isJson from '../../helpers/is-json';

const validTypes = ['dotplot', 'heatmap', 'scatter'];

// ValidateJson validates that an input file is JSON formatted and has the
// necessary fields and values for the interactive viewer. If the analysis
// type is "dotplot" or "heatmap", this includes checking for the "column"
// and "rows" props. The "minimap" is not required.
const ValidateJson = (jsonString) => {
  const json = isJson(jsonString);

  // If the json is not valid, return err.
  if (!json) {
    return {
      err: true,
      message: 'Invalid file format',
    };
  }

  // The file should have a "params" key that is an object.
  if (
    !Object.prototype.hasOwnProperty.call(json, 'params') ||
    Object.prototype.toString.call(json.params) !== '[object Object]'
  ) {
    return {
      err: true,
      message: 'The JSON object must have a "params" property with an object containing analysis parameters',
    };
  }

  // The image type should be specified.
  if (
    !json.params.imageType ||
    !validTypes.includes(json.params.imageType)
  ) {
    return {
      err: true,
      message: 'The image type must be specified in the params object and be of a supported type',
    };
  }

  // Validate dotplot/heatmaps.
  if (
    json.params.imageType === 'dotplot' ||
    json.params.imageType === 'heatmap'
  ) {
    // The file should have a "column" key that is an array.
    if (
      !Object.prototype.hasOwnProperty.call(json, 'columns') ||
      !Array.isArray(json.columns)
    ) {
      return {
        err: true,
        message: 'The JSON object must have a "column" property with an array of column names',
      };
    }

    // The file should have a "rows" key that is an array.
    if (
      !Object.prototype.hasOwnProperty.call(json, 'rows') ||
      !Array.isArray(json.rows)
    ) {
      return {
        err: true,
        message: 'The JSON object must have a "rows" property with an array of row values',
      };
    }

    // The row entries should have "data" and "name" props.
    if (
      json.rows.length === 0 ||
      !Object.prototype.hasOwnProperty.call(json.rows[0], 'data') ||
      !Object.prototype.hasOwnProperty.call(json.rows[0], 'name')
    ) {
      return {
        err: true,
        message: 'Each "rows" entry should have a "data" and "name" prop',
      };
    }

    // The row data prop should be an array with a "value" key.
    if (
      !Array.isArray(json.rows[0].data) ||
      !Object.prototype.hasOwnProperty.call(json.rows[0].data[0], 'value')
    ) {
      return {
        err: true,
        message: 'The row data should be an array with at least a "value" key',
      };
    }
  }

  return {
    err: false,
    json,
  };
};
export default ValidateJson;
