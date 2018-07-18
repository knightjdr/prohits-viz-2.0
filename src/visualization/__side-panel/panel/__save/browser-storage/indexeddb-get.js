import IndexedDBOpen from './indexeddb-open';
import IndexedDBSupport from './indexeddb-support';

const IndexedDBGet = id => (
  new Promise((resolve, reject) => {
    if (IndexedDBSupport()) {
      IndexedDBOpen()
        .then((db) => {
          const tx = db.transaction('session', 'readonly');
          const store = tx.objectStore('session');
          return store.get(id);
        })
        .then((session) => {
          resolve(session);
        })
        .catch(() => {
          reject();
        });
    } else {
      reject();
    }
  })
);
export default IndexedDBGet;
