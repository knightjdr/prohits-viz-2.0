import Support from './indexeddb-support';

describe('Support indexeddb', () => {
  it('should return false when there is no support', () => {
    expect(Support()).toBeFalsy();
  });

  it('should return true when there is general support', () => {
    // Mock indexedDB
    Object.defineProperty(window, 'indexedDB', {
      writable: true,
      value: 'value',
    });
    expect(Support()).toBeTruthy();
  });

  it('should return true when there is moz support', () => {
    // Mock indexedDB
    Object.defineProperty(window, 'indexedDB', {
      writable: true,
      value: undefined,
    });
    Object.defineProperty(window, 'mozIndexedDB', {
      writable: true,
      value: 'value',
    });
    expect(Support()).toBeTruthy();
  });

  it('should return true when there is webkit support', () => {
    // Mock indexedDB
    Object.defineProperty(window, 'indexedDB', {
      writable: true,
      value: undefined,
    });
    Object.defineProperty(window, 'mozIndexedDB', {
      writable: true,
      value: undefined,
    });
    Object.defineProperty(window, 'webkitIndexedDB', {
      writable: true,
      value: 'value',
    });
    expect(Support()).toBeTruthy();
  });

  it('should return true when there is ms support', () => {
    // Mock indexedDB
    Object.defineProperty(window, 'indexedDB', {
      writable: true,
      value: undefined,
    });
    Object.defineProperty(window, 'mozIndexedDB', {
      writable: true,
      value: undefined,
    });
    Object.defineProperty(window, 'webkitIndexedDB', {
      writable: true,
      value: undefined,
    });
    Object.defineProperty(window, 'msIndexedDB', {
      writable: true,
      value: 'value',
    });
    expect(Support()).toBeTruthy();
  });
});
