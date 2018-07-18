import Idb from 'idb';

/* Opens the IndexDB or creates it if it doesn't exist. */
const IndexedDBOpen = () => (
  Idb.open('prohits-viz', 1, (upgradeDb) => {
    if (!upgradeDb.objectStoreNames.contains('session')) {
      const sessionOS = upgradeDb.createObjectStore('session', { keyPath: 'id', autoIncrement: true });
      sessionOS.createIndex('id', 'id', { unique: true });
    }
  })
);
export default IndexedDBOpen;
