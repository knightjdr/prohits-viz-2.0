import sessionState from './session-state';

jest.mock('../../state/store', () => ({
  store: {
    getState: () => ({
      display: {},
      parameters: {
        imageType: 'dotplot',
        name: 'original name',
      },
      settings: { fillColor: 'blueBlack' },
    }),
  },
}));

describe('Copy redux state for save', () => {
  describe('with supplied name', () => {
    let saveState;
    beforeAll(() => {
      saveState = sessionState('saveName');
    });

    it('should remove display prop', () => {
      expect(saveState.display).toBeUndefined();
    });

    it('should keep settings prop', () => {
      expect(saveState.settings).toEqual({ fillColor: 'blueBlack' });
    });

    it('should set name prop', () => {
      expect(saveState.parameters.name).toBe('saveName');
    });

    it('should add date', () => {
      expect(saveState.parameters.date).not.toBeNull();
    });
  });
  
  describe('with supplied name', () => {
    let saveState;
    beforeAll(() => {
      saveState = sessionState();
    });


    it('should keep original name value', () => {
      expect(saveState.parameters.name).toBe('original name');
    });
  });
});
