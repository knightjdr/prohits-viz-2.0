import isJson from '../../helpers/is-json';

const validTypes = ['dotplot', 'heatmap', 'scatter'];

// SelectValidate validates that an input file is JSON formatted and has the
// necessary fields and values for the interactive viewer. If the analysis
// type is "dotplot" or "heatmap", this includes checking for the "column"
// and "rows" props. The "minimap" is not required.
const SelectValidate = (jsonString) => {
  const json = isJson(jsonString);

  // If the json is not valid, return err.
  if (!json) {
    return {
      err: true,
      message: 'Invalid file format',
    };
  }

  const { columns, params, rows } = json;

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
    !params.imageType ||
    !validTypes.includes(params.imageType)
  ) {
    return {
      err: true,
      message: 'The image type must be specified in the params object and be of a supported type',
    };
  }

  // Validate dotplot/heatmaps.
  if (
    params.imageType === 'dotplot' ||
    params.imageType === 'heatmap'
  ) {
    // The file should have a "column" key container a "names" array.
    if (
      !columns ||
      !Object.prototype.hasOwnProperty.call(columns, 'names') ||
      !Array.isArray(columns.names)
    ) {
      return {
        err: true,
        message: 'The JSON object must have a "column" property with an array of column names',
      };
    }

    // The file should have a "rows" key with an array list.
    if (
      !rows ||
      !Object.prototype.hasOwnProperty.call(rows, 'list') ||
      !Array.isArray(rows.list)
    ) {
      return {
        err: true,
        message: 'The JSON object must have a "rows" property with a list of row values',
      };
    }

    // The row entries should have "data" and "name" props.
    if (
      rows.list.length === 0 ||
      !Object.prototype.hasOwnProperty.call(rows.list[0], 'data') ||
      !Object.prototype.hasOwnProperty.call(rows.list[0], 'name')
    ) {
      return {
        err: true,
        message: 'Each "rows" entry should have a "data" and "name" prop',
      };
    }

    // The row data prop should be an array with a "value" key.
    if (
      !Array.isArray(rows.list[0].data) ||
      !Object.prototype.hasOwnProperty.call(rows.list[0].data[0], 'value')
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
export default SelectValidate;
