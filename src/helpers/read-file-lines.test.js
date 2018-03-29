import TextEnconding from 'text-encoding';
import ReadFileLines from './read-file-lines';

const err = {
  args: new Error('Invalid function args'),
  frError: new Error('Test error'),
};
const file = {
  csv: new File(['col1,col2\na,b\n'], 'filename.csv', { type: 'text/csv' }),
  tsv: new File(['col1\tcol2\na\tb\n'], 'filename.tsv', { type: 'text/tab-separated-values' }),
  txt: new File(['col1\tcol2\na\tb\n'], 'filename.txt', { type: 'text/plain' }),
  windowsTxt: new File(['col1\tcol2\r\na\tb\n'], 'filename.txt', { type: 'text/plain' }),
};
const expected = {
  all: ['col1\tcol2', 'a\tb'],
  csv: 'col1,col2',
  tsv: 'col1\tcol2',
  txt: 'col1\tcol2',
};

afterAll(() => {
  jest.clearAllMocks();
});

describe('ReadFileLines', () => {
  beforeEach(() => {
    jest.unmock('text-encoding');
  });

  test('No input types rejects', () => (
    ReadFileLines()
      .catch((error) => {
        expect(error).toEqual(err.args);
      })
  ));

  test('Invalid file arguments rejects', () => (
    ReadFileLines('a')
      .catch((error) => {
        expect(error).toEqual(err.args);
      })
  ));

  test('Less than one line rejects', () => (
    ReadFileLines(file.txt, 0)
      .catch((error) => {
        expect(error).toEqual(err.args);
      })
  ));

  test('CSV file returns header', () => (
    ReadFileLines(file.csv, 1)
      .then((header) => {
        expect(header).toEqual(expected.csv);
      })
  ));

  test('TSV file returns header', () => (
    ReadFileLines(file.tsv, 1)
      .then((header) => {
        expect(header).toEqual(expected.tsv);
      })
  ));

  test('TXT file returns header', () => (
    ReadFileLines(file.txt, 1)
      .then((header) => {
        expect(header).toEqual(expected.tsv);
      })
  ));

  test('TXT file returns 2 lines', () => (
    ReadFileLines(file.txt, 2)
      .then((header) => {
        expect(header).toEqual(expected.all);
      })
  ));

  test('Windows newlines okay', () => (
    ReadFileLines(file.windowsTxt, 1)
      .then((header) => {
        expect(header).toEqual(expected.txt);
      })
  ));

  test('If call asks for more lines than are in the file, return all the lines', () => (
    ReadFileLines(file.txt, 3)
      .then((header) => {
        expect(header).toEqual(expected.all);
      })
  ));

  test('If more than one line is read be decorder, return one line', () => {
    // mock decorder
    TextEnconding.TextDecoder = jest.fn().mockImplementation(() => (
      {
        decode: () => ('col1\tcol2\na\tb\n1\t2'),
      }
    ));
    return ReadFileLines(file.txt, 1)
      .then((header) => {
        expect(header).toEqual(expected.txt);
        TextEnconding.TextDecoder.mockClear();
      });
  });

  test('FileReader error rejects', () => {
    // mock FileReader
    window.FileReader = jest.fn().mockImplementation(() => (
      {
        readAsArrayBuffer: function RAAB() { this.onerror(new Error('Test error')); },
      }
    ));
    return ReadFileLines(file.txt, 1)
      .catch((error) => {
        expect(error).toEqual(err.frError);
        window.FileReader.mockClear();
      });
  });
});
