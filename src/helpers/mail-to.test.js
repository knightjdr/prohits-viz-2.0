import mailTo from './mail-to';

const { href } = window.location;
const spyFn = jest.fn();

beforeAll(() => {
  Object.defineProperty(window.location, 'href', {
    set: spyFn,
  });
});

afterAll(() => {
  Object.defineProperty(window.location, 'href', {
    set: href,
  });
});

describe('Mail to', () => {
  it('should open mail to href with default subject', () => {
    spyFn.mockClear();
    const expected = 'mailto:contact@prohits-viz.org?subject=ProHit-viz help';
    mailTo();
    expect(spyFn).toBeCalledWith(expected);
  });

  it('should open mail to href with specified subject', () => {
    spyFn.mockClear();
    const expected = 'mailto:contact@prohits-viz.org?subject=test';
    mailTo('test');
    expect(spyFn).toBeCalledWith(expected);
  });

  it('should open mail to href with body', () => {
    spyFn.mockClear();
    const expected = 'mailto:contact@prohits-viz.org?subject=test&body=body test';
    mailTo('test', 'body test');
    expect(spyFn).toBeCalledWith(expected);
  });
});
