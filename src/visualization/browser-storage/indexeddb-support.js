const indexedDBSupport = () => (
  'indexedDB' in window ||
  'mozIndexedDB' in window ||
  'webkitIndexedDB' in window ||
  'msIndexedDB' in window
);
export default indexedDBSupport;
