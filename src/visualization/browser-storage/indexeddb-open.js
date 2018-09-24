import Support from './indexeddb-support';
import Upgrade from './indexeddb-upgrade';

export const indexedDBexists = () => (
  window.indexedDB ||
  window.mozIndexedDB ||
  window.msIndexedDB ||
  window.webkitIndexedDB
);

/* Opens the IndexDB or creates it if it doesn't exist. */
const Open = (name = 'prohits-viz', version = 1) => (
  new Promise((resolve, reject) => {
    if (Support()) {
      const indexedDB = indexedDBexists();
      const request = indexedDB.open(name, version);
      request.onupgradeneeded = () => {
        Upgrade(request.result);
      };
      request.onsuccess = (e) => {
        resolve(e.target.result);
      };
    } else {
      reject();
    }
  })
);
export default Open;
