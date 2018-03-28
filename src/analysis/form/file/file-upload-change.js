/* takes an array object (of files) and updates the redux form by passing this value
** to input.onChange */
import deepEqual from 'deep-equal';

import ParseHeader from './parse-header';
import { store } from '../../../state/store';
import { clearFileHeader, setFileHeader } from '../../../state/set/header-actions';

const FileUploadChange = (value, input) => {
  // if there are no files, clear header field in store
  if (value.fileList.length === 0) {
    store.dispatch(clearFileHeader());
  } else if ( // if first file has changed, update header in store
    !deepEqual(input.value[0], value.fileList[0])
  ) {
    ParseHeader(value.fileList[0])
      .then((header) => {
        store.dispatch(setFileHeader(header));
      });
  }
  // update redux store with file list
  const newValue = value.fileList || [];
  input.onChange(newValue);
};
export default FileUploadChange;
