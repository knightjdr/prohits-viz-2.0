/* eslint-disable no-param-reassign */

const onResize = (component, func, timeout = 500) => {
  if (component.resizeTimeout) {
    clearTimeout(component.resizeTimeout);
  }
  component.resizeTimeout = setTimeout(() => {
    func();
  }, timeout);
};

export default onResize;
