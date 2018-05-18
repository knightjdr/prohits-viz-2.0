import InteractiveFileSelector from './interactive-file-selector';

const state = {
  interactiveFile: {},
};
const expectedInteractiveFile = {};

describe('Interactive file selector', () => {
  it('Should return the interactive file', () => {
    expect(InteractiveFileSelector(state)).toEqual(expectedInteractiveFile);
  });
});
