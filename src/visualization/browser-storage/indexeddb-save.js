import Open from './indexeddb-open';

const ResolveRequest = (db, item, store = 'session') => (
  new Promise((resolve) => {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).add(item);
    tx.oncomplete = () => {
      resolve();
    };
  })
);

const Save = (item, store) => (
  new Promise((resolve, reject) => {
    Open()
      .then(db => (
        ResolveRequest(db, item, store)
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
export default Save;
