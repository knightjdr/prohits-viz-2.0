import Open from './indexeddb-open';

const ResolveRequest = (db, id, store = 'session') => (
  new Promise((resolve) => {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).delete(id);
    tx.oncomplete = () => {
      resolve();
    };
  })
);

const Delete = (id, store) => (
  new Promise((resolve, reject) => {
    Open()
      .then(db => (
        ResolveRequest(db, id, store)
      ))
      .then(() => {
        const event = new Event('indexeddb-update');
        window.dispatchEvent(event);
        resolve();
      })
      .catch(() => {
        reject();
      });
  })
);
export default Delete;
