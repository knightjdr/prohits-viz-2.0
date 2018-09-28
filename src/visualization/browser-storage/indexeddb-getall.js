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
          date: session.parameters && session.parameters.date ?
            convertISODate(session.parameters.date) : '-',
          id: session.id,
          name: session.parameters && session.parameters.name ?
            session.parameters.name : 'unnamed session',
        }));
        resolve(info);
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  })
);
export default getall;
