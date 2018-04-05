import ToOptions from './to-options';

/* filters an array of header strings into two groups: suggested and other.
** The return object contains an array of options for a Select menu and
** an initial value for that menu if the header matches a string in the
** recommended arg. */

const FilterHeader = (recommended, allHeaders) => {
  let initialValue; // pick first suggested match
  const suggestedOptions = [];
  let otherOptions = [];
  if (
    !recommended ||
    !Array.isArray(recommended) ||
    recommended.length < 1
  ) {
    otherOptions = [...allHeaders];
  } else {
    // make headers lower case for comparison with recommended values
    const lowercaseHeader = allHeaders.map(header => (header.toLowerCase()));
    // filter header for columns that are found in recommended array
    recommended.forEach((suggestedHeader) => {
      const headerIndex = lowercaseHeader.indexOf(suggestedHeader);
      if (headerIndex > -1) {
        const headerValue = allHeaders[headerIndex];
        suggestedOptions.push(headerValue);
        initialValue = initialValue || headerValue;
      }
    });
    // add any header not in recommended array to other options
    allHeaders.forEach((header) => {
      if (!suggestedOptions.includes(header)) {
        otherOptions.push(header);
      }
    });
  }
  return {
    initialValue,
    options: ToOptions(suggestedOptions, otherOptions),
  };
};
export default FilterHeader;
