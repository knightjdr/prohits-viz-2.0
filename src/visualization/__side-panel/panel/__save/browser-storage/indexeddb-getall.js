import ConvertISODate from '../../../../../helpers/convert-iso-date';
import IndexedDBOpen from './indexeddb-open';
import IndexedDBSupport from './indexeddb-support';

const IndexedDBGetall = () => (
  new Promise((resolve, reject) => {
    if (IndexedDBSupport()) {
      IndexedDBOpen()
        .then((db) => {
          const tx = db.transaction('session', 'readonly');
          const store = tx.objectStore('session');
          return store.getAll();
        })
        .then((sessions) => {
          const info = sessions.map(session => ({
            date: ConvertISODate(session.date),
            id: session.id,
            name: session.name,
          }));
          resolve(info);
        })
        .catch(() => {
          reject();
        });
    } else {
      reject();
    }
  })
);
export default IndexedDBGetall;
