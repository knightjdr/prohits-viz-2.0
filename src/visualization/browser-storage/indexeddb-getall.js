import convertISODate from '../../helpers/convert-iso-date';
import openIndex from './indexeddb-open';

const ResolveRequest = (db, store = 'session') => (
  new Promise((resolve) => {
    const tx = db.transaction(store, 'readonly');
    const request = tx.objectStore(store).getAll();
    request.onsuccess = () => {
      resolve(request.result);
    };
  })
);

const getall = store => (
  new Promise((resolve, reject) => {
    openIndex()
      .then(db => (
        ResolveRequest(db, store)
      ))
      .then((sessions) => {
        const info = sessions.map(session => ({
          date: convertISODate(session.parameters.date),
          id: session.id,
          name: session.parameters.name,
        }));
        resolve(info);
      })
      .catch(() => {
        reject();
      });
  })
);
export default getall;
