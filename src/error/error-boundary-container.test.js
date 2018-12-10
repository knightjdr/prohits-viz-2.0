import React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from './error-boundary-container';
import mailTo from '../helpers/mail-to';

jest.mock('../helpers/mail-to');

const consoleError = global.console.error;

beforeAll(() => {
  global.console.error = jest.fn();
});

afterAll(() => {
  global.console.error = consoleError;
});

describe('Error boundary', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <ErrorBoundary>
        child
      </ErrorBoundary>,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not show error component', () => {
    expect(wrapper.find('Error').length).toBe(0);
  });

  it('should render children', () => {
    expect(wrapper.text()).toBe('child');
  });

  describe('on catching error', () => {
    beforeAll(() => {
      global.console.error.mockClear();
      wrapper.instance().componentDidCatch(new Error('error test'), 'info test');
    });

    it('should call console.error', () => {
      expect(global.console.error).toHaveBeenCalled();
    });

    it('should set error class property', () => {
      expect(wrapper.instance().error).toBe('Error: error test');
    });

    it('should set info class property', () => {
      expect(wrapper.instance().info).toBe('info test');
    });
  });

  /* Enzyme doesn't support getDerivedStateFromError
  ** describe('update UI on error', () => {
    beforeAll(() => {
      wrapper.instance().getDerivedStateFromError();
      wrapper.update();
    });

    it('should set error state to true', () => {
      console.log(wrapper.state());
      expect(wrapper.state('hasError')).toBeTruthy();
    });

    it('should show error component', () => {
      expect(wrapper.find('Error').length).toBe(1);
    });
  }); */

  describe('reporting error', () => {
    beforeAll(() => {
      mailTo.mockClear();
      wrapper.instance().error = 'error';
      wrapper.instance().info = 'info';
      wrapper.instance().reportError();
    });

    it('should call mail to', () => {
      const body = 'error: error\n\ninfo: info';
      expect(mailTo).toHaveBeenCalledWith('ProHits-viz error', body);
    });
  });
});
