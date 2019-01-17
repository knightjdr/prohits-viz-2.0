import circHeatmapSettings, { defaultState } from './circ-heatmap-settings-reducer';
import * as fileActions from '../interactive-file-actions';

describe('CircHeatmap settings set reducer', () => {
  it('should return an empty initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(circHeatmapSettings(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = [
      ...defaultState,
    ];
    expect(circHeatmapSettings(undefined, action)).toEqual(expectedState);
  });

  describe('parse file', () => {
    it('should handle PARSE_INTERACTIVE_FILE action when circHeatmapSettings field present', () => {
      const action = {
        file: {
          circHeatmapSettings: {
            thickness: 10,
          },
        },
        type: fileActions.PARSE_INTERACTIVE_FILE,
      };
      const expectedState = {
        thickness: 10,
      };
      expect(circHeatmapSettings(undefined, action)).toEqual(expectedState);
    });

    it('should handle PARSE_INTERACTIVE_FILE action when avacircHeatmapSettingsilablePlots field missing', () => {
      const action = {
        file: {},
        type: fileActions.PARSE_INTERACTIVE_FILE,
      };
      const expectedState = [...defaultState];
      expect(circHeatmapSettings(undefined, action)).toEqual(expectedState);
    });
  });
});
