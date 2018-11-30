import fillSettings from './fill__settings';
import { defaultState } from '../../state/set/visualization/settings-reducer';

describe('Fill settings', () => {
  it('should return default when nothing passed to function', () => {
    expect(fillSettings()).toEqual({ current: defaultState });
  });

  it('should return parameter imageType when valid and settings type not specified', () => {
    const expectedSettings = {
      current: {
        ...defaultState,
        imageType: 'dotplot',
      },
    };
    expect(fillSettings(undefined, 'dotplot')).toEqual(expectedSettings);
  });

  it('should return user input when valid', () => {
    const user = {
      current: {
        ...defaultState,
        abundanceCap: 25,
        cellSize: 10,
        edgeColor: 'redBlack',
        fillColor: 'greenBlack',
        imageType: 'heatmap',
        invertColor: true,
        minAbundance: 5.5,
        primaryFilter: 0.05,
        secondaryFilter: 0.1,
      },
    };
    expect(fillSettings(user)).toEqual(user);
  });

  it('should return default when input invalid', () => {
    const user = {
      current: {
        abundanceCap: 'a',
        cellSize: 10.2,
        edgeColor: 'pinkBlack',
        fillColor: 'orangeBlack',
        imageType: 'unknown',
        invertColor: 'true',
        minAbundance: '-1',
        primaryFilter: '0.05',
        secondaryFilter: 'a',
      },
    };
    expect(fillSettings(user)).toEqual({ current: defaultState });
  });
});
