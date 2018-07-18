import IndexedDBOpen from './indexeddb-open';

const IndexedDBDelete = id => (
  new Promise((resolve, reject) => {
    IndexedDBOpen()
      .then((db) => {
        const tx = db.transaction('session', 'readwrite');
        const store = tx.objectStore('session');
        store.delete(id);
        return tx.complete;
      })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  })
);
export default IndexedDBDelete;
