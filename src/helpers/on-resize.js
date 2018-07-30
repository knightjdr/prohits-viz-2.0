/* eslint-disable no-param-reassign */

const OnResize = (component, func, timeout = 500) => {
  if (component.resizeTimeout) {
    clearTimeout(this.resizeTimeout);
  }
  component.resizeTimeout = setTimeout(() => {
    func();
  }, timeout);
};

export default OnResize;
