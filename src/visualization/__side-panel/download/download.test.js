import Download from './download';

beforeAll(() => {
  jest.clearAllMocks();
});

describe('Download', () => {
  test('should create and revoke object url', () => {
    // Mock document createElement.
    const element = document.createElement('a');
    const { createElement } = document;
    Object.defineProperty(document, 'createElement', {
      value: () => (element),
      writable: true,
    });

    // Create spies.
    const createSpy = jest.spyOn(window.URL, 'createObjectURL');
    const clickSpy = jest.spyOn(element, 'click');
    const revokeSpy = jest.spyOn(window.URL, 'revokeObjectURL');

    // Call method and define expected result.
    Download('test', 'test.txt', 'text/plain');
    const expectedBlob = new Blob(['test'], { type: 'text/plain' });

    // Create and revoke object URL called with blob.
    expect(createSpy).toHaveBeenCalledWith(expectedBlob);
    createSpy.mockRestore();
    expect(revokeSpy).toHaveBeenCalledWith(expectedBlob);
    revokeSpy.mockRestore();

    // Link created and clicked.
    expect(element.download).toBe('test.txt');
    expect(clickSpy).toHaveBeenCalledTimes(1);
    clickSpy.mockRestore();

    // Restore createElement;
    Object.defineProperty(document, 'createElement', {
      value: createElement,
    });
  });
});
