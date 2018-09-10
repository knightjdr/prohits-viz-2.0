import React from 'react';
import { mount, shallow } from 'enzyme';

import Download from '../../../../helpers/download';
import IndexedDBDelete from './browser-storage/indexeddb-delete';
import IndexedDBGet from './browser-storage/indexeddb-get';
import IndexedDBGetall from './browser-storage/indexeddb-getall';
import IndexedDBSave from './browser-storage/indexeddb-save';
import IndexedDBSupport from './browser-storage/indexeddb-support';
import Notification from './browser-storage/notification';
import { SaveContainer } from './panel__save-container';

const props = {
  save: {
    imageType: 'svg',
    name: '',
  },
};
const sessions = [
  { id: 1, name: 'a', date: 'July 18, 2018' },
  { id: 2, name: 'b', date: 'July 19, 2018' },
  { id: 3, name: 'c', date: 'July 19, 2018' },
  { id: 4, name: 'd', date: 'July 19, 2018' },
  { id: 5, name: 'e', date: 'July 19, 2018' },
  { id: 6, name: 'f', date: 'July 19, 2018' },
  { id: 7, name: 'g', date: 'July 19, 2018' },
];

jest.mock('../../../../helpers/download');
jest.mock('./browser-storage/indexeddb-delete');
jest.mock('./browser-storage/indexeddb-get');
jest.mock('./browser-storage/indexeddb-getall');
IndexedDBGetall.mockImplementation(() => Promise.resolve(sessions));
jest.mock('./browser-storage/indexeddb-save');
jest.mock('./browser-storage/indexeddb-support');
IndexedDBSupport.mockReturnValue(true);
jest.mock('./browser-storage/notification');

const saveImageType = jest.fn();
const saveSessionName = jest.fn();

const sleep = ms => (
  new Promise(resolve => setTimeout(resolve, ms))
);

describe('Panel save container', () => {
  beforeEach(() => {
    /* Clear call count */
    Download.mockClear();
    Notification.mockClear();
    saveImageType.mockClear();
    saveSessionName.mockClear();
  });

  it('should set default state', () => {
    const wrapper = shallow(
      <SaveContainer
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
        {...props}
      />,
    );
    expect(wrapper.state('sessions')).toEqual([]);
    expect(wrapper.state('sessionsPage')).toBe(1);
    expect(wrapper.state('sessionsPageArr')).toEqual([]);
    expect(wrapper.state('storageSupport')).toBeTruthy();
  });

  it('should update state on mount', async () => {
    const wrapper = mount(
      <SaveContainer
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
        {...props}
      />,
    );
    await sleep(200);
    expect(wrapper.state('sessions')).toEqual(sessions);
    expect(wrapper.state('sessionsPageArr')).toEqual(sessions.slice(0, 5));
  });

  it('should change session page', () => {
    const wrapper = shallow(
      <SaveContainer
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
        {...props}
      />,
    );
    wrapper.setState({
      sessions,
    });
    wrapper.instance().changePage(2);
    expect(wrapper.state('sessionsPage')).toBe(2);
    expect(wrapper.state('sessionsPageArr')).toEqual(sessions.slice(5, 7));
  });

  it('should display notification on deleting session item and update page items', async () => {
    const wrapper = shallow(
      <SaveContainer
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
        {...props}
      />,
    );
    IndexedDBDelete.mockImplementationOnce(() => Promise.resolve());
    IndexedDBGetall.mockImplementationOnce(() => Promise.resolve(sessions.slice(1, 7)));
    wrapper.instance().deleteSession(1, 'a');
    await sleep(200);
    expect(Notification).toHaveBeenCalledWith('Session \'a\' was deleted.', true);
    expect(wrapper.state('sessions')).toEqual(sessions.slice(1, 7));
    expect(wrapper.state('sessionsPage')).toBe(1);
    expect(wrapper.state('sessionsPageArr')).toEqual(sessions.slice(1, 6));
  });

  it('should display notification when session item could not be deleted', async () => {
    const wrapper = shallow(
      <SaveContainer
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
        {...props}
      />,
    );
    IndexedDBDelete.mockImplementationOnce(() => Promise.reject());
    wrapper.instance().deleteSession(1, 'a');
    await sleep(200);
    expect(Notification).toHaveBeenCalledWith('Session \'a\' could not be deleted.', false);
  });

  it('should display notification on opening a session', async () => {
    const wrapper = shallow(
      <SaveContainer
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
        {...props}
      />,
    );
    IndexedDBGet.mockImplementationOnce(() => Promise.resolve());
    wrapper.instance().openSession(1, 'a');
    await sleep(200);
    expect(Notification).toHaveBeenCalledWith('Session \'a\' was loaded.', true);
  });

  it('should display notification when a session could not be opened', async () => {
    const wrapper = shallow(
      <SaveContainer
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
        {...props}
      />,
    );
    IndexedDBGet.mockImplementationOnce(() => Promise.reject());
    wrapper.instance().openSession(1, 'a');
    await sleep(200);
    expect(Notification).toHaveBeenCalledWith('Session \'a\' could not be loaded.', false);
  });

  it('should display notification on saving unnamed session item and update page items', async () => {
    const wrapper = shallow(
      <SaveContainer
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
        {...props}
      />,
    );
    const newSessions = sessions.concat([{ id: 8, name: 'unnamed session', date: 'today' }]);
    IndexedDBSave.mockImplementationOnce(() => Promise.resolve());
    IndexedDBGetall.mockImplementationOnce(() => Promise.resolve(newSessions));
    wrapper.instance().saveSessionBrowser();
    await sleep(200);
    expect(IndexedDBSave).toHaveBeenCalledWith(expect.objectContaining({ name: 'unnamed session' }));
    expect(Notification).toHaveBeenCalledWith('Session \'unnamed session\' was saved.', true);
    expect(wrapper.state('sessions')).toEqual(newSessions);
    expect(wrapper.state('sessionsPage')).toBe(1);
    expect(wrapper.state('sessionsPageArr')).toEqual(sessions.slice(0, 5));
  });

  it('should display notification on saving named session item and update page items', async () => {
    const wrapper = shallow(
      <SaveContainer
        save={{
          imageType: 'svg',
          name: 'named session',
        }}
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
      />,
    );
    const newSessions = sessions.concat([{ id: 8, name: 'named session', date: 'today' }]);
    IndexedDBSave.mockImplementationOnce(() => Promise.resolve());
    IndexedDBGetall.mockImplementationOnce(() => Promise.resolve(newSessions));
    wrapper.instance().saveSessionBrowser();
    await sleep(200);
    expect(IndexedDBSave).toHaveBeenCalledWith(expect.objectContaining({ name: 'named session' }));
    expect(Notification).toHaveBeenCalledWith('Session \'named session\' was saved.', true);
    expect(wrapper.state('sessions')).toEqual(newSessions);
    expect(wrapper.state('sessionsPage')).toBe(1);
    expect(wrapper.state('sessionsPageArr')).toEqual(sessions.slice(0, 5));
  });

  it('should display notification on failing to save session item', async () => {
    const wrapper = shallow(
      <SaveContainer
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
        {...props}
      />,
    );
    IndexedDBSave.mockImplementationOnce(() => Promise.reject());
    wrapper.instance().saveSessionBrowser();
    await sleep(200);
    expect(Notification).toHaveBeenCalledWith('Session \'unnamed session\' could not be saved.', false);
  });

  it('should save unnamed session to file', () => {
    const wrapper = shallow(
      <SaveContainer
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
        {...props}
      />,
    );
    wrapper.instance().saveSessionFile();
    expect(Download).toHaveBeenCalledWith('{}', 'prohits-viz-session.json', 'application/json');
  });

  it('should save named session to file', () => {
    const wrapper = shallow(
      <SaveContainer
        save={{
          imageType: 'svg',
          name: 'named session',
        }}
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
      />,
    );
    wrapper.instance().saveSessionFile();
    expect(Download).toHaveBeenCalledWith('{}', 'named session.json', 'application/json');
  });

  it('should update page items when session array has length to support current page selection', () => {
    const wrapper = shallow(
      <SaveContainer
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
        {...props}
      />,
    );
    const newPage = wrapper.instance().updatePage(sessions, 1);
    expect(newPage.sessionsPage).toBe(1);
    expect(newPage.sessionsPageArr).toEqual(sessions.slice(0, 5));
  });

  it('should update page items when session array does not have length to support current page selection', () => {
    const wrapper = shallow(
      <SaveContainer
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
        {...props}
      />,
    );
    const newPage = wrapper.instance().updatePage(sessions, 3);
    expect(newPage.sessionsPage).toBe(2);
    expect(newPage.sessionsPageArr).toEqual(sessions.slice(5, 7));
  });
});
