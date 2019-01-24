/* Convert a Javascript object to a form. */
const convertToForm = obj => (
  Object.entries(obj).reduce((form, [key, value]) => {
    if (key === 'file') {
      value.forEach((item) => {
        form.append('file', item.originFileObj);
      });
    } else if (Array.isArray(value)) {
      form.append(key, JSON.stringify(value));
    } else {
      form.append(key, value);
    }
    return form;
  }, new FormData())
);

export default convertToForm;
