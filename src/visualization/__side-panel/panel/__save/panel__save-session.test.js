import React from 'react';
import { shallow } from 'enzyme';

import Session from './panel__save-session';

const props = {
  changePage: jest.fn(),
  deleteSession: jest.fn(),
  openSession: jest.fn(),
  sessionItemsTotal: 5,
  sessionName: 'test',
  sessions: [{ id: 1, name: 'a', date: 'today' }],
  sessionsPage: 1,
};

const saveSessionBrowser = jest.fn();
const saveSessionFile = jest.fn();
const saveSessionName = jest.fn();

describe('Save session component', () => {
  describe('with indexeddb storage and sessions present', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Session
          saveSessionBrowser={saveSessionBrowser}
          saveSessionFile={saveSessionFile}
          saveSessionName={saveSessionName}
          storageSupport
          {...props}
        />,
      );
    });

    beforeEach(() => {
      /* Clear call count */
      saveSessionBrowser.mockClear();
      saveSessionFile.mockClear();
      saveSessionName.mockClear();
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call save to browser prop method on button click', () => {
      wrapper.find('Button').last().simulate('click');
      expect(saveSessionBrowser).toHaveBeenCalled();
    });

    it('should call save to file prop method on button click', () => {
      wrapper.find('Button').first().simulate('click');
      expect(saveSessionFile).toHaveBeenCalled();
    });

    it('should call change name prop method on button click', () => {
      wrapper.find('Input').simulate('change', { target: { value: 1 } });
      expect(saveSessionName).toHaveBeenCalled();
    });
  });
  
  it('should render with no support for indexeddb storage', () => {
    const wrapper = shallow(
      <Session
        saveSessionBrowser={saveSessionBrowser}
        saveSessionFile={saveSessionFile}
        saveSessionName={saveSessionName}
        storageSupport={false}
        {...props}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with support for indexeddb storage but no sessions saved', () => {
    const wrapper = shallow(
      <Session
        saveSessionBrowser={saveSessionBrowser}
        saveSessionFile={saveSessionFile}
        saveSessionName={saveSessionName}
        storageSupport={false}
        {...props}
        sessions={[]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
