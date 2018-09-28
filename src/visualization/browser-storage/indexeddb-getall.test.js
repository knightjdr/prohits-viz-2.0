import indexedDB from 'fake-indexeddb';

import convertISODate from '../../helpers/convert-iso-date';
import getAll from './indexeddb-getall';
import openIndex from './indexeddb-open';

jest.mock('../../helpers/convert-iso-date');
convertISODate.mockReturnValue('today');
jest.mock('./indexeddb-open');

// Setup up memory indexeddb and set as return value of open module.
beforeAll(() => (
  new Promise((resolve) => {
    const memDB = indexedDB.open('prohits-viz', 1);
    memDB.onupgradeneeded = () => {
      const db = memDB.result;
      const store = db.createObjectStore('session', { keyPath: 'id', autoIncrement: true });
      store.createIndex('id', 'id', { unique: true });
      store.put({ id: 1, parameters: { name: 'test 1', date: new Date() } });
      store.put({ id: 2, parameters: { name: 'test 2', date: new Date() } });
      store.put({ id: 3, parameters: {} });
    };
    memDB.onsuccess = (e) => {
      const db = e.target.result;
      openIndex.mockImplementation(() => (
        new Promise((resolveDB) => { resolveDB(db); })
      ));
      resolve();
    };
  })
));

describe('Get all indexeddb', () => {
  it('should get all entries', () => (
    getAll().then((sessions) => {
      expect(sessions).toEqual([
        { id: 1, name: 'test 1', date: 'today' },
        { id: 2, name: 'test 2', date: 'today' },
        { id: 3, name: 'unnamed session', date: '-' },
      ]);
    })
  ));

  it('should reject if transaction/request error', () => (
    // Using undefined store to trigger error.
    expect(getAll('missingStore')).rejects.toBeUndefined()
  ));
});
