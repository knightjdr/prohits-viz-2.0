import ReadFileLines from '../../../helpers/read-file-lines';
import ParseString from '../../../helpers/parse-string';

/* Reads the first line of a file and splits it to an array based on the type:
** tsv or csv. The resulting array is put in the store */

const ParseHeader = file => (
  new Promise((resolve) => {
    const { type } = file;
    ReadFileLines(file)
      .then((headerString) => {
        const header = ParseString(headerString, type);
        resolve(header);
      })
      .catch(() => {
        resolve();
      });
  })
);
export default ParseHeader;
