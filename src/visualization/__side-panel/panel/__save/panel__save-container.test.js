import React from 'react';
import { shallow } from 'enzyme';

import download from '../../../../helpers/download';
import indexedDBDelete from './browser-storage/indexeddb-delete';
import indexedDBGet from './browser-storage/indexeddb-get';
import indexedDBGetAll from './browser-storage/indexeddb-getall';
import indexedDBSave from './browser-storage/indexeddb-save';
import indexedDBSupport from './browser-storage/indexeddb-support';
import notification from './browser-storage/notification';
import { SaveContainer } from './panel__save-container';

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
indexedDBGetAll.mockImplementation(() => Promise.resolve(sessions));
jest.mock('./browser-storage/indexeddb-save');
jest.mock('./browser-storage/indexeddb-support');
indexedDBSupport.mockReturnValue(true);
jest.mock('./browser-storage/notification');

const saveImageType = jest.fn();
const saveSessionName = jest.fn();

const sleep = ms => (
  new Promise(resolve => setTimeout(resolve, ms))
);

describe('Panel save container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <SaveContainer
        save={{
          error: false,
          imageType: 'svg',
          isSaving: false,
          name: '',
        }}
        saveImage={jest.fn()}
        saveImageType={saveImageType}
        saveSessionName={saveSessionName}
      />,
    );
  });

  describe('default state', () => {
    it('should set sessions', () => {
      expect(wrapper.state('sessions')).toEqual(sessions);
    });

    it('should set sessionsPage', () => {
      expect(wrapper.state('sessionsPage')).toBe(1);
    });

    it('should set sessionsPageArr', () => {
      expect(wrapper.state('sessionsPageArr')).toEqual(sessions.slice(0, 5));
    });

    it('should set storageSupport', () => {
      expect(wrapper.state('storageSupport')).toBeTruthy();
    });
  });

  describe('changing page', () => {
    beforeAll(() => {
      wrapper.instance().changePage(2);
    });

    it('should change session page', () => {
      expect(wrapper.state('sessionsPage')).toBe(2);
    });

    it('should change session page array', () => {
      expect(wrapper.state('sessionsPageArr')).toEqual(sessions.slice(5, 7));
    });
  });

  describe('successfully deleting session', () => {
    beforeAll(async (done) => {
      wrapper.setState({ sessionsPage: 1 });
      notification.mockClear();
      indexedDBDelete.mockImplementationOnce(() => Promise.resolve());
      indexedDBGetAll.mockImplementationOnce(() => Promise.resolve(sessions.slice(1, 7)));
      wrapper.instance().deleteSession(1, 'a');
      await sleep(200);
      done();
    });

    it('should display notification', () => {
      expect(notification).toHaveBeenCalledWith('Session \'a\' was deleted.', true);
    });

    it('should update sessions', () => {
      expect(wrapper.state('sessions')).toEqual(sessions.slice(1, 7));
    });

    it('should update page', () => {
      expect(wrapper.state('sessionsPage')).toBe(1);
    });

    it('should display notification on deleting session item and update page items', () => {
      expect(wrapper.state('sessionsPageArr')).toEqual(sessions.slice(1, 6));
    });
  });

  it('unsuccessfully deleting session', async () => {
    notification.mockClear();
    indexedDBDelete.mockImplementationOnce(() => Promise.reject());
    wrapper.instance().deleteSession(1, 'a');
    await sleep(200);
    expect(notification).toHaveBeenCalledWith('Session \'a\' could not be deleted.', false);
  });

  it('should display notification on opening a session', async () => {
    notification.mockClear();
    indexedDBGet.mockImplementationOnce(() => Promise.resolve());
    wrapper.instance().openSession(1, 'a');
    await sleep(200);
    expect(notification).toHaveBeenCalledWith('Session \'a\' was loaded.', true);
  });

  it('should display notification when a session could not be opened', async () => {
    notification.mockClear();
    indexedDBGet.mockImplementationOnce(() => Promise.reject());
    wrapper.instance().openSession(1, 'a');
    await sleep(200);
    expect(notification).toHaveBeenCalledWith('Session \'a\' could not be loaded.', false);
  });

  describe('saving unnamed sessions', () => {
    const newSessions = sessions.concat([{ id: 8, name: 'unnamed session', date: 'today' }]);

    beforeAll(async (done) => {
      notification.mockClear();
      indexedDBSave.mockImplementationOnce(() => Promise.resolve());
      indexedDBGetAll.mockImplementationOnce(() => Promise.resolve(newSessions));
      wrapper.instance().saveSessionBrowser();
      await sleep(200);
      done();
    });

    it('should call save method', () => {
      expect(indexedDBSave).toHaveBeenCalledWith(expect.objectContaining({ name: 'unnamed session' }));
    });

    it('should display notification', () => {
      expect(notification).toHaveBeenCalledWith('Session \'unnamed session\' was saved.', true);
    });

    it('should update sessions', async () => {
      expect(wrapper.state('sessions')).toEqual(newSessions);
    });

    it('should set page', () => {
      expect(wrapper.state('sessionsPage')).toBe(1);
    });

    it('should set page arr', () => {
      expect(wrapper.state('sessionsPageArr')).toEqual(sessions.slice(0, 5));
    });
  });

  describe('saving named session', () => {
    const newSessions = sessions.concat([{ id: 8, name: 'named session', date: 'today' }]);

    beforeAll(async (done) => {
      notification.mockClear();
      wrapper.setProps({
        save: {
          error: false,
          imageType: 'svg',
          isSaving: false,
          name: 'named session',
        },
      });
      indexedDBSave.mockImplementationOnce(() => Promise.resolve());
      indexedDBGetAll.mockImplementationOnce(() => Promise.resolve(newSessions));
      wrapper.instance().saveSessionBrowser();
      await sleep(200);
      done();
    });

    it('should call save method', () => {
      expect(indexedDBSave).toHaveBeenCalledWith(expect.objectContaining({ name: 'named session' }));
    });

    it('should display notification', () => {
      expect(notification).toHaveBeenCalledWith('Session \'named session\' was saved.', true);
    });

    it('should update sessions', async () => {
      expect(wrapper.state('sessions')).toEqual(newSessions);
    });

    it('should set page', () => {
      expect(wrapper.state('sessionsPage')).toBe(1);
    });

    it('should set page arr', () => {
      expect(wrapper.state('sessionsPageArr')).toEqual(sessions.slice(0, 5));
    });
  });

  it('should display notification on failing to save session item', async () => {
    wrapper.setProps({
      save: {
        error: false,
        imageType: 'svg',
        isSaving: false,
        name: '',
      },
    });
    notification.mockClear();
    indexedDBSave.mockImplementationOnce(() => Promise.reject());
    wrapper.instance().saveSessionBrowser();
    await sleep(200);
    expect(notification).toHaveBeenCalledWith('Session \'unnamed session\' could not be saved.', false);
  });

  it('should save unnamed session to file', () => {
    download.mockClear();
    wrapper.instance().saveSessionFile();
    expect(download).toHaveBeenCalledWith('{}', 'prohits-viz-session.json', 'application/json');
  });

  it('should save named session to file', () => {
    download.mockClear();
    wrapper.setProps({
      save: {
        error: false,
        imageType: 'svg',
        isSaving: false,
        name: 'named session',
      },
    });
    wrapper.instance().saveSessionFile();
    expect(download).toHaveBeenCalledWith('{}', 'named session.json', 'application/json');
  });

  it('should update page items when session array has length to support current page selection', () => {
    const newPage = wrapper.instance().updatePage(sessions, 1);
    expect(newPage.sessionsPage).toBe(1);
    expect(newPage.sessionsPageArr).toEqual(sessions.slice(0, 5));
  });

  it('should update page items when session array does not have length to support current page selection', () => {
    const newPage = wrapper.instance().updatePage(sessions, 3);
    expect(newPage.sessionsPage).toBe(2);
    expect(newPage.sessionsPageArr).toEqual(sessions.slice(5, 7));
  });
});
