import ReadFileLines from '../../../helpers/read-file-lines';
import ParseHeader from './parse-header';
import ParseString from '../../../helpers/parse-string';

const file = {
  type: 'text/plain',
};
const headerString = 'column1\tcolumn2\tcolumn3\n';
const parsedHeader = ['column1', 'column2', 'column3'];

jest.mock('../../../helpers/read-file-lines');
ReadFileLines
  .mockReturnValueOnce(Promise.resolve(headerString))
  .mockReturnValueOnce(Promise.reject());

jest.mock('../../../helpers/parse-string');
ParseString.mockReturnValue(parsedHeader);

describe('ParseHeader', () => {
  test('Resolves with header', () => (
    ParseHeader(file)
      .then((header) => {
        expect(header).toEqual(parsedHeader);
        expect(ParseString).toHaveBeenCalledWith(headerString, file.type);
      })
  ));

  test('Rejects with null', () => (
    ParseHeader(file)
      .catch((err) => {
        expect(err).toBeNull();
      })
  ));
});
