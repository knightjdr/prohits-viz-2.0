import React from 'react';
import { shallow } from 'enzyme';

import Session from './session';

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
  beforeEach(() => {
    /* Clear call count */
    saveSessionBrowser.mockClear();
    saveSessionFile.mockClear();
    saveSessionName.mockClear();
  });

  it('should render with support for indexeddb storage and sessions present', () => {
    const wrapper = shallow(
      <Session
        saveSessionBrowser={saveSessionBrowser}
        saveSessionFile={saveSessionFile}
        saveSessionName={saveSessionName}
        storageSupport
        {...props}
      />,
    );
    expect(wrapper).toMatchSnapshot();
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

  it('should call save to browser prop method on button click', () => {
    const wrapper = shallow(
      <Session
        saveSessionBrowser={saveSessionBrowser}
        saveSessionFile={saveSessionFile}
        saveSessionName={saveSessionName}
        storageSupport
        {...props}
      />,
    );
    wrapper.find('button').last().simulate('click');
    expect(saveSessionBrowser).toHaveBeenCalled();
  });

  it('should call save to file prop method on button click', () => {
    const wrapper = shallow(
      <Session
        saveSessionBrowser={saveSessionBrowser}
        saveSessionFile={saveSessionFile}
        saveSessionName={saveSessionName}
        storageSupport
        {...props}
      />,
    );
    wrapper.find('button').first().simulate('click');
    expect(saveSessionFile).toHaveBeenCalled();
  });

  it('should call change name prop method on button click', () => {
    const wrapper = shallow(
      <Session
        saveSessionBrowser={saveSessionBrowser}
        saveSessionFile={saveSessionFile}
        saveSessionName={saveSessionName}
        storageSupport
        {...props}
      />,
    );
    wrapper.find('Input').simulate('change', { target: { value: 1 } });
    expect(saveSessionName).toHaveBeenCalled();
  });
});
