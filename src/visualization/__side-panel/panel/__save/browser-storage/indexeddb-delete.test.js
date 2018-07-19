import indexedDB from 'fake-indexeddb';

import Delete from './indexeddb-delete';
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

describe('Delete indexeddb', () => {
  it('should delete an entry', () => (
    Delete(1)
      .then(() => (
        expect(Get(1)).rejects.toBeUndefined()
      ))
  ));

  it('should reject if transaction/request error', () => (
    // Using undefined store to trigger error.
    expect(Delete(1, 'missingStore')).rejects.toBeUndefined()
  ));
});
