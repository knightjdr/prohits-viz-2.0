import MailTo from './mail-to';

const expected = {
  defaultSubject: 'mailto:contact@prohits-viz.org?subject=ProHit-viz help',
  specifiedSubject: 'mailto:contact@prohits-viz.org?subject=Test',
};

describe('MailTo', () => {
  test('Should open mail to href with default subject', () => {
    const spyFn = jest.fn();
    Object.defineProperty(window.location, 'href', {
      set: spyFn,
    });
    MailTo();
    expect(spyFn).toBeCalledWith(expected.defaultSubject);
  });
});
