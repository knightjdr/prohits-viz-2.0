import indexedDB from 'fake-indexeddb';

import Open from './indexeddb-open';
import Support from './indexeddb-support';
import Upgrade from './indexeddb-upgrade';

jest.mock('./indexeddb-support');
jest.mock('./indexeddb-upgrade');

// Mock indexedDB
Object.defineProperty(window, 'indexedDB', {
  writable: true,
  value: indexedDB,
});

// Setup up memory indexeddb for version 1 of database.
beforeAll(() => (
  new Promise((resolve) => {
    const memDB = indexedDB.open('prohits-viz', 1);
    memDB.onupgradeneeded = () => {
      const db = memDB.result;
      const store = db.createObjectStore('session', { keyPath: 'id', autoIncrement: true });
      store.createIndex('id', 'id', { unique: true });
    };
    memDB.onsuccess = () => {
      resolve();
    };
  })
));

describe('Open indexedDB instance', () => {
  it('should reject if no indexesDB support', () => {
    Support.mockReturnValueOnce(false);
    return expect(Open()).rejects.toBeUndefined();
  });

  it('should open indexeddb and not call upgrade', () => {
    Support.mockReturnValueOnce(true);
    return Open()
      .then(() => {
        expect(Upgrade).not.toHaveBeenCalled();
      });
  });

  it('should open indexeddb and call upgrade', () => {
    Support.mockReturnValueOnce(true);
    return Open('test', 2)
      .then(() => {
        expect(Upgrade).toHaveBeenCalled();
      });
  });
});
