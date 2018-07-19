import ConvertISODate from '../../../../../helpers/convert-iso-date';
import Open from './indexeddb-open';

const ResolveRequest = (db, store = 'session') => (
  new Promise((resolve) => {
    const tx = db.transaction(store, 'readonly');
    const request = tx.objectStore(store).getAll();
    request.onsuccess = () => {
      resolve(request.result);
    };
  })
);

const Getall = store => (
  new Promise((resolve, reject) => {
    Open()
      .then(db => (
        ResolveRequest(db, store)
      ))
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
  })
);
export default Getall;
