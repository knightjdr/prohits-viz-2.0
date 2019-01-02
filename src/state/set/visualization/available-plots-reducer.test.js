import availablePlots, { defaultState } from './available-plots-reducer';
import * as fileActions from '../interactive-file-actions';

describe('Available plots set reducer', () => {
  it('should return an empty initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(availablePlots(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = [
      ...defaultState,
    ];
    expect(availablePlots(undefined, action)).toEqual(expectedState);
  });

  describe('parse file', () => {
    it('should handle PARSE_INTERACTIVE_FILE action when availablePlots field present', () => {
      const action = {
        file: {
          availablePlots: [
            { data: [] },
          ],
        },
        type: fileActions.PARSE_INTERACTIVE_FILE,
      };
      const expectedState = [
        { data: [] },
      ];
      expect(availablePlots(undefined, action)).toEqual(expectedState);
    });

    it('should handle PARSE_INTERACTIVE_FILE action when availablePlots field missing', () => {
      const action = {
        file: {},
        type: fileActions.PARSE_INTERACTIVE_FILE,
      };
      const expectedState = [...defaultState];
      expect(availablePlots(undefined, action)).toEqual(expectedState);
    });
  });
});
