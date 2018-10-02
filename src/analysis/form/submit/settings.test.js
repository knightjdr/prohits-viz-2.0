import FalsyButNotZero from '../../../helpers/falsy-but-not-zero';
import Settings from './settings';

jest.mock('../../../helpers/falsy-but-not-zero');

describe('Settings', () => {
  test('Unknown analysis type returns null', () => {
    expect(Settings({ analysisType: 'test' })).toBeNull();
  });

  test('Default dotplot analysis type returns expected tags', () => {
    FalsyButNotZero.mockReturnValue(false);
    const form = {
      analysisType: 'dotplot',
      primaryFilter: 0.01,
      secondaryFilter: 0.05,
      minAbundance: 0,
      clustering: 'hierarchical',
    };
    const settings = Settings(form);
    const primaryFilterIndex = settings.findIndex(setting => (setting.key === 'primaryFilter'));
    expect(primaryFilterIndex).toBeGreaterThanOrEqual(0);
    expect(settings[primaryFilterIndex].props.children).toBe('Primary filter: 0.01');
    const secondaryFilterIndex = settings.findIndex(setting => (setting.key === 'secondaryFilter'));
    expect(secondaryFilterIndex).toBeGreaterThanOrEqual(0);
    expect(settings[secondaryFilterIndex].props.children).toBe('Secondary filter: 0.05');
    const minAbundanceIndex = settings.findIndex(setting => (setting.key === 'minAbundance'));
    expect(minAbundanceIndex).toBeGreaterThanOrEqual(0);
    expect(settings[minAbundanceIndex].props.children).toBe('Minimum abundance: 0');
    const clusteringIndex = settings.findIndex(setting => (setting.key === 'clustering'));
    expect(clusteringIndex).toBeGreaterThanOrEqual(0);
    expect(settings[clusteringIndex].props.children).toBe('Clustering type: hierarchical');
    FalsyButNotZero.mockRestore();
  });

  test('Unset dotplot analysis type returns not set tags', () => {
    FalsyButNotZero.mockReturnValue(true);
    const form = {
      analysisType: 'dotplot',
    };
    const settings = Settings(form);
    const primaryFilterIndex = settings.findIndex(setting => (setting.key === 'primaryFilter'));
    expect(primaryFilterIndex).toBeGreaterThanOrEqual(0);
    expect(settings[primaryFilterIndex].props.children).toBe('Primary filter: not set');
    const secondaryFilterIndex = settings.findIndex(setting => (setting.key === 'secondaryFilter'));
    expect(secondaryFilterIndex).toBeGreaterThanOrEqual(0);
    expect(settings[secondaryFilterIndex].props.children).toBe('Secondary filter: not set');
    const minAbundanceIndex = settings.findIndex(setting => (setting.key === 'minAbundance'));
    expect(minAbundanceIndex).toBeGreaterThanOrEqual(0);
    expect(settings[minAbundanceIndex].props.children).toBe('Minimum abundance: not set');
    const clusteringIndex = settings.findIndex(setting => (setting.key === 'clustering'));
    expect(clusteringIndex).toBeGreaterThanOrEqual(0);
    expect(settings[clusteringIndex].props.children).toBe('Clustering type: not set');
    FalsyButNotZero.mockRestore();
  });

  test('Optional dotplot values return tags', () => {
    FalsyButNotZero.mockReturnValue(true);
    const form = {
      analysisType: 'dotplot',
      ctrlSub: true,
      preyLengthNorm: true,
    };
    const settings = Settings(form);
    const ctrlSubIndex = settings.findIndex(setting => (setting.key === 'ctrlSub'));
    expect(ctrlSubIndex).toBeGreaterThanOrEqual(0);
    expect(settings[ctrlSubIndex].props.children).toBe('Control subtraction is selected');
    const preyLengthNormIndex = settings.findIndex(setting => (setting.key === 'preyLengthNorm'));
    expect(preyLengthNormIndex).toBeGreaterThanOrEqual(0);
    expect(settings[preyLengthNormIndex].props.children).toBe('Prey length normalization is selected');
    FalsyButNotZero.mockRestore();
  });

  test('Dotplot normalization returns correct tags', () => {
    FalsyButNotZero.mockReturnValue(true);
    let settings = Settings({
      analysisType: 'dotplot',
      normalization: 'total',
    });
    let normalizationIndex = settings.findIndex(setting => (setting.key === 'normalization'));
    expect(normalizationIndex).toBeGreaterThanOrEqual(0);
    expect(settings[normalizationIndex].props.children).toBe('Bait normalization: total abundance');
    settings = Settings({
      analysisType: 'dotplot',
      normalization: 'prey',
    });
    normalizationIndex = settings.findIndex(setting => (setting.key === 'normalization'));
    expect(normalizationIndex).toBeGreaterThanOrEqual(0);
    expect(settings[normalizationIndex].props.children).toBe('Bait normalization: specific prey');
    settings = Settings({
      analysisType: 'dotplot',
      normalization: 'test',
    });
    normalizationIndex = settings.findIndex(setting => (setting.key === 'normalization'));
    expect(normalizationIndex).toBe(-1);
    FalsyButNotZero.mockRestore();
  });

  test('Dotplot log transformation returns correct tags', () => {
    FalsyButNotZero.mockReturnValue(true);
    let settings = Settings({
      analysisType: 'dotplot',
      logTransform: 2,
    });
    let logTransformIndex = settings.findIndex(setting => (setting.key === 'logTransform'));
    expect(logTransformIndex).toBeGreaterThanOrEqual(0);
    expect(settings[logTransformIndex].props.children).toBe('Log transformation: base 2');
    settings = Settings({
      analysisType: 'dotplot',
      logTransform: 'test',
    });
    logTransformIndex = settings.findIndex(setting => (setting.key === 'normalization'));
    expect(logTransformIndex).toBe(-1);
    FalsyButNotZero.mockRestore();
  });
});
