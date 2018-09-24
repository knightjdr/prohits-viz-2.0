const Upgrade = (upgradeDb) => {
  if (!upgradeDb.objectStoreNames.contains('session')) {
    const store = upgradeDb.createObjectStore('session', { keyPath: 'id', autoIncrement: true });
    store.createIndex('id', 'id', { unique: true });
  }
};
export default Upgrade;
