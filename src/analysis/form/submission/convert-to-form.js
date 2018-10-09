/* Convert a Javascript object to a form. */
const convertToForm = obj => (
  Object.entries(obj).reduce((form, [key, value]) => {
    if (key === 'file') {
      value.forEach((item) => {
        form.append('file', item.originFileObj);
      });
    } else {
      form.append(key, value);
    }
    return form;
  }, new FormData())
);

export default convertToForm;
