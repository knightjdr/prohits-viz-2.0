import React from 'react';
import { mount, shallow } from 'enzyme';

import indexedDBDelete from './indexeddb-delete';
import indexedDBGet from './indexeddb-get';
import indexedDBGetAll from './indexeddb-getall';
import indexedDBSave from './indexeddb-save';
import indexedDBSupport from './indexeddb-support';
import notification from './notification';
import sessionState from '../session/session-state';
import { IndexedDBContainer } from './indexeddb-container';

const sessions = [
  { id: 1, parameters: { name: 'a', date: 'July 18, 2018' } },
  { id: 2, parameters: { name: 'b', date: 'July 19, 2018' } },
  { id: 3, parameters: { name: 'c', date: 'July 19, 2018' } },
  { id: 4, parameters: { name: 'd', date: 'July 19, 2018' } },
  { id: 5, parameters: { name: 'e', date: 'July 19, 2018' } },
  { id: 6, parameters: { name: 'f', date: 'July 19, 2018' } },
  { id: 7, parameters: { name: 'g', date: 'July 19, 2018' } },
];

jest.mock('./indexeddb-delete');
jest.mock('./indexeddb-get');
jest.mock('./indexeddb-getall');
indexedDBGetAll.mockImplementation(() => Promise.resolve(sessions));
jest.mock('./indexeddb-save');
jest.mock('./indexeddb-support');
indexedDBSupport.mockReturnValue(true);
jest.mock('./notification');
jest.mock('../session/session-state');
sessionState.mockReturnValue({});

const parseFile = jest.fn();

const sleep = ms => (
  new Promise(resolve => setTimeout(resolve, ms))
);

describe('Panel save container', () => {
  describe('mounting', () => {
    let updateFn;
    let spyAdd;
    let spyRemove;
    let wrapper;

    beforeAll(async (done) => {
      wrapper = mount(
        <IndexedDBContainer
          parseFile={parseFile}
          render={() => <div />}
          save={{
            name: '',
          }}
        />,
      );
      updateFn = wrapper.instance().updateSessions;
      wrapper.instance().updateSessions = jest.fn();
      spyAdd = jest.spyOn(window, 'addEventListener');
      spyRemove = jest.spyOn(window, 'removeEventListener');
      wrapper.update();
      await sleep(200);
      wrapper.unmount();
      wrapper.mount();
      done();
    });

    afterAll(() => {
      spyAdd.mockRestore();
      spyRemove.mockRestore();
      wrapper.instance().updateSessions = updateFn;
    });

    it('should add resize event listener', () => {
      expect(spyAdd).toHaveBeenCalledWith('indexeddb-update', wrapper.instance().updateSessions);
    });

    it('should remove resize event listener', () => {
      const { updateSessions } = wrapper.instance();
      wrapper.unmount();
      expect(spyRemove).toHaveBeenCalledWith('indexeddb-update', updateSessions);
    });
  });

  describe('shallow mount', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <IndexedDBContainer
          parseFile={parseFile}
          render={jest.fn()}
          save={{
            name: '',
          }}
        />,
      );
    });

    describe('default state', () => {
      it('should set sessions', () => {
        expect(wrapper.state('sessions')).toEqual(sessions);
      });

      it('should set sessionsPageNumber', () => {
        expect(wrapper.state('sessionsPageNumber')).toBe(1);
      });

      it('should set sessionsPage', () => {
        expect(wrapper.state('sessionsPage')).toEqual(sessions.slice(0, 5));
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
        expect(wrapper.state('sessionsPageNumber')).toBe(2);
      });

      it('should change session page array', () => {
        expect(wrapper.state('sessionsPage')).toEqual(sessions.slice(5, 7));
      });
    });

    describe('successfully deleting session', () => {
      beforeAll(async (done) => {
        wrapper.setState({ sessionsPageNumber: 1 });
        notification.mockClear();
        indexedDBDelete.mockImplementationOnce(() => Promise.resolve());
        wrapper.instance().deleteSession(1, 'a');
        await sleep(200);
        done();
      });

      it('should call delete method', () => {
        expect(indexedDBDelete).toHaveBeenCalledWith(1);
      });

      it('should display notification', () => {
        expect(notification).toHaveBeenCalledWith('Session \'a\' was deleted.', true);
      });
    });

    it('unsuccessfully deleting session', async () => {
      notification.mockClear();
      indexedDBDelete.mockImplementationOnce(() => Promise.reject());
      wrapper.instance().deleteSession(1, 'a');
      await sleep(200);
      expect(notification).toHaveBeenCalledWith('Session \'a\' could not be deleted.', false);
    });

    describe('open a session', () => {
      beforeAll(async (done) => {
        notification.mockClear();
        indexedDBGet.mockImplementationOnce(() => Promise.resolve({}));
        wrapper.instance().openSession(1, 'a');
        await sleep(200);
        done();
      });

      it('should parse file', () => {
        expect(parseFile).toHaveBeenCalledWith({});
      });

      it('should display notification on opening a session', () => {
        expect(notification).toHaveBeenCalledWith('Session \'a\' was loaded.', true);
      });
    });

    it('should display notification when a session could not be opened', async () => {
      notification.mockClear();
      indexedDBGet.mockImplementationOnce(() => Promise.reject());
      wrapper.instance().openSession(1, 'a');
      await sleep(200);
      expect(notification).toHaveBeenCalledWith('Session \'a\' could not be loaded.', false);
    });

    describe('saving unnamed sessions', () => {
      beforeAll(async (done) => {
        notification.mockClear();
        indexedDBSave.mockImplementationOnce(() => Promise.resolve());
        sessionState.mockReturnValue({ name: 'unnamed session' });
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
    });

    describe('saving named session', () => {
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
        sessionState.mockReturnValue({ name: 'named session' });
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
    });

    it('should display notification on failing to save session item', async () => {
      wrapper.setProps({
        save: {
          name: '',
        },
      });
      notification.mockClear();
      indexedDBSave.mockImplementationOnce(() => Promise.reject());
      wrapper.instance().saveSessionBrowser();
      await sleep(200);
      expect(notification).toHaveBeenCalledWith('Session \'unnamed session\' could not be saved.', false);
    });

    describe('update page', () => {
      it('should update items when session array has length to support current page selection', () => {
        const newPage = wrapper.instance().updatePage(sessions, 1);
        expect(newPage.sessionsPageNumber).toBe(1);
        expect(newPage.sessionsPage).toEqual(sessions.slice(0, 5));
      });

      it('should update items when session array does not have length to support current page selection', () => {
        const newPage = wrapper.instance().updatePage(sessions, 3);
        expect(newPage.sessionsPageNumber).toBe(2);
        expect(newPage.sessionsPage).toEqual(sessions.slice(5, 7));
      });
    });

    describe('update sessions', () => {
      const newSessions = sessions.concat([{ id: 8, name: 'unnamed session', date: 'today' }]);

      beforeAll(async (done) => {
        indexedDBGetAll.mockImplementationOnce(() => Promise.resolve(newSessions));
        wrapper.instance().updateSessions();
        await sleep(200);
        done();
      });

      it('should update sessions', async () => {
        expect(wrapper.state('sessions')).toEqual(newSessions);
      });

      it('should update total sessions count', async () => {
        expect(wrapper.state('sessionItemsTotal')).toBe(8);
      });

      it('should set page arr', () => {
        expect(wrapper.state('sessionsPage')).toEqual(sessions.slice(0, 5));
      });

      it('should set page', () => {
        expect(wrapper.state('sessionsPageNumber')).toBe(1);
      });
    });
  });
});
