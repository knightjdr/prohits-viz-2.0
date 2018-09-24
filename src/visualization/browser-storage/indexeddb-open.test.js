import indexedDB from 'fake-indexeddb';

import Open, { indexedDBexists } from './indexeddb-open';
import Support from './indexeddb-support';
import Upgrade from './indexeddb-upgrade';

jest.mock('./indexeddb-support');
jest.mock('./indexeddb-upgrade');

describe('Indexed db', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'indexedDB', {
      writable: true,
      value: null,
    });
    Object.defineProperty(window, 'mozIndexedDB', {
      writable: true,
      value: null,
    });
    Object.defineProperty(window, 'msIndexedDB', {
      writable: true,
      value: null,
    });
    Object.defineProperty(window, 'webkitIndexedDB', {
      writable: true,
      value: null,
    });
  });

  it('should be returned', () => {
    // Mock indexedDB
    Object.defineProperty(window, 'indexedDB', {
      writable: true,
      value: { db: 'db' },
    });
    expect(indexedDBexists()).toEqual({ db: 'db' });
  });

  it('should be returned for mozilla', () => {
    // Mock indexedDB
    Object.defineProperty(window, 'mozIndexedDB', {
      writable: true,
      value: { db: 'db' },
    });
    expect(indexedDBexists()).toEqual({ db: 'db' });
  });

  it('should be returned for edge', () => {
    // Mock indexedDB
    Object.defineProperty(window, 'msIndexedDB', {
      writable: true,
      value: { db: 'db' },
    });
    expect(indexedDBexists()).toEqual({ db: 'db' });
  });

  it('should be returned for webkit', () => {
    // Mock indexedDB
    Object.defineProperty(window, 'webkitIndexedDB', {
      writable: true,
      value: { db: 'db' },
    });
    expect(indexedDBexists()).toEqual({ db: 'db' });
  });
});

describe('Open indexedDB instance', () => {
  // Setup up memory indexeddb for version 1 of database.
  beforeAll(async (done) => {
    // Mock indexedDB
    Object.defineProperty(window, 'indexedDB', {
      writable: true,
      value: indexedDB,
    });

    const memDB = indexedDB.open('prohits-viz', 1);
    memDB.onupgradeneeded = () => {
      const db = memDB.result;
      const store = db.createObjectStore('session', { keyPath: 'id', autoIncrement: true });
      store.createIndex('id', 'id', { unique: true });
    };
    memDB.onsuccess = () => {
      done();
    };
  });

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
