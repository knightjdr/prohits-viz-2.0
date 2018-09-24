import Open from './indexeddb-open';

const ResolveRequest = (db, id, store = 'session') => (
  new Promise((resolve) => {
    const tx = db.transaction(store, 'readonly');
    const request = tx.objectStore(store).get(id);
    request.onsuccess = () => {
      resolve(request.result);
    };
  })
);

const Get = (id, store) => (
  new Promise((resolve, reject) => {
    Open()
      .then(db => (
        ResolveRequest(db, id, store)
      ))
      .then((session) => {
        // If id cannot be found, session will be undefined.
        if (!session) {
          reject();
        }
        resolve(session);
      })
      .catch(() => {
        reject();
      });
  })
);
export default Get;
