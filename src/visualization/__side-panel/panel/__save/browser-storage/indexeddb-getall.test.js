import indexedDB from 'fake-indexeddb';

import ConvertISODate from '../../../../../helpers/convert-iso-date';
import GetAll from './indexeddb-getall';
import Open from './indexeddb-open';

jest.mock('../../../../../helpers/convert-iso-date');
ConvertISODate.mockReturnValue('today');
jest.mock('./indexeddb-open');

// Setup up memory indexeddb and set as return value of open module.
beforeAll(() => (
  new Promise((resolve) => {
    const memDB = indexedDB.open('prohits-viz', 1);
    memDB.onupgradeneeded = () => {
      const db = memDB.result;
      const store = db.createObjectStore('session', { keyPath: 'id', autoIncrement: true });
      store.createIndex('id', 'id', { unique: true });
      store.put({ id: 1, name: 'test 1', date: new Date() });
      store.put({ id: 2, name: 'test 2', date: new Date() });
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

describe('Get all indexeddb', () => {
  it('should get all entries', () => (
    GetAll().then((sessions) => {
      expect(sessions).toEqual([
        { id: 1, name: 'test 1', date: 'today' },
        { id: 2, name: 'test 2', date: 'today' },
      ]);
    })
  ));

  it('should reject if transaction/request error', () => (
    // Using undefined store to trigger error.
    expect(GetAll('missingStore')).rejects.toBeUndefined()
  ));
});
