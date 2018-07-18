import IndexedDBOpen from './indexeddb-open';
import IndexedDBSupport from './indexeddb-support';

const IndexedDBSave = item => (
  new Promise((resolve, reject) => {
    if (IndexedDBSupport()) {
      IndexedDBOpen()
        .then((db) => {
          const tx = db.transaction('session', 'readwrite');
          const store = tx.objectStore('session');
          store.add(item);
          return tx.complete;
        })
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    } else {
      reject();
    }
  })
);
export default IndexedDBSave;
