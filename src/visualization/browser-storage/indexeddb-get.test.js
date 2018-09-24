import indexedDB from 'fake-indexeddb';

import Get from './indexeddb-get';
import Open from './indexeddb-open';

jest.mock('./indexeddb-open');

// Setup up memory indexeddb and set as return value of open module.
beforeAll(() => (
  new Promise((resolve) => {
    const memDB = indexedDB.open('prohits-viz', 1);
    memDB.onupgradeneeded = () => {
      const db = memDB.result;
      const store = db.createObjectStore('session', { keyPath: 'id', autoIncrement: true });
      store.createIndex('id', 'id', { unique: true });
      store.put({ id: 1, name: 'test 1', date: 'today' });
    };
    memDB.onsuccess = (e) => {
      const db = e.target.result;
      Open.mockImplementation(() => (
        new Promise((resolveDB) => { resolveDB(db); })
      ));
      resolve();
    };
  })
));

describe('Get indexeddb', () => {
  it('should get an entry', () => (
    Get(1).then((session) => {
      expect(session).toEqual({ id: 1, name: 'test 1', date: 'today' });
    })
  ));

  it('should reject if id not found', () => (
    expect(Get(2)).rejects.toBeUndefined()
  ));

  it('should reject if transaction/request error', () => (
    // Using undefined store to trigger error.
    expect(Get(1, 'missingStore')).rejects.toBeUndefined()
  ));
});
