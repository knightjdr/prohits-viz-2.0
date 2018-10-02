import indexedDB from 'fake-indexeddb';

import Get from './indexeddb-get';
import Open from './indexeddb-open';
import Save from './indexeddb-save';

jest.mock('./indexeddb-open');

// Setup up memory indexeddb and set as return value of open module.
beforeAll(() => (
  new Promise((resolve) => {
    const memDB = indexedDB.open('prohits-viz', 1);
    memDB.onupgradeneeded = () => {
      const db = memDB.result;
      const store = db.createObjectStore('session', { keyPath: 'id', autoIncrement: true });
      store.createIndex('id', 'id', { unique: true });
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

const item = { id: 1, name: 'test', date: 'today' };

describe('Save indexeddb', () => {
  describe('successfully', () => {
    let spy;

    afterAll(() => {
      spy.mockRestore();
    });

    beforeAll(async (done) => {
      spy = jest.spyOn(window, 'dispatchEvent');
      Save(item)
        .then(() => {
          done();
        });
    });

    it('should save an entry', () => {
      expect(Get(1)).resolves.toEqual(item);
    });

    it('should emit event that indexeddb was updated', () => {
      const event = new Event('indexeddb-update');
      expect(spy).toHaveBeenCalledWith(event);
    });
  });

  it('should reject if transaction/request error', () => (
    // Using undefined store to trigger error.
    expect(Save(item, 'missingStore')).rejects.toBeUndefined()
  ));
});
