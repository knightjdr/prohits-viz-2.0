import onResize from './on-resize';

const callback = jest.fn();

describe('On resize', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Clear call counts.
    callback.mockClear();
    clearTimeout.mockClear();
  });

  it('should call input callback on calling with no resizeTimeout', () => {
    const component = {
      resizeTimeout: null,
    };
    onResize(component, callback);
    jest.runAllTimers();
    expect(clearTimeout).not.toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it('should call clearTimeout with resizeTimeout value', () => {
    const component = {
      resizeTimeout: true,
    };
    onResize(component, callback);
    jest.runAllTimers();
    expect(clearTimeout).toHaveBeenCalled();
  });

  it('should call timeout at time as specified in arguments', () => {
    const component = {
      resizeTimeout: null,
    };
    onResize(component, callback, 1000);
    jest.runTimersToTime(600);
    expect(callback).not.toHaveBeenCalled();
    jest.runTimersToTime(1000);
    expect(callback).toHaveBeenCalled();
  });
});
