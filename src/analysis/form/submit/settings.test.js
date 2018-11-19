import FalsyButNotZero from '../../../helpers/falsy-but-not-zero';
import Settings from './settings';

jest.mock('../../../helpers/falsy-but-not-zero');

describe('Settings', () => {
  it('should return null for unknown analysis type ', () => {
    expect(Settings({ analysisType: 'test' })).toBeNull();
  });

  describe('default dotplot analysis', () => {
    let settings;

    beforeAll(() => {
      FalsyButNotZero.mockReturnValue(false);
      const form = {
        analysisType: 'dotplot',
        primaryFilter: 0.01,
        secondaryFilter: 0.05,
        minAbundance: 0,
        clustering: 'hierarchical',
      };
      settings = Settings(form);
    });

    it('should return primary filter value', () => {
      const primaryFilterIndex = settings.findIndex(setting => (setting.key === 'primaryFilter'));
      expect(settings[primaryFilterIndex].props.children).toBe('Primary filter: 0.01');
    });

    it('should return secondary filter value', () => {
      const secondaryFilterIndex = settings.findIndex(setting => (setting.key === 'secondaryFilter'));
      expect(settings[secondaryFilterIndex].props.children).toBe('Secondary filter: 0.05');
    });

    it('should return minimum abundance value', () => {
      const minAbundanceIndex = settings.findIndex(setting => (setting.key === 'minAbundance'));
      expect(settings[minAbundanceIndex].props.children).toBe('Minimum abundance: 0');
    });

    it('should return clustering value', () => {
      const clusteringIndex = settings.findIndex(setting => (setting.key === 'clustering'));
      expect(settings[clusteringIndex].props.children).toBe('Clustering type: hierarchical');
    });
  });

  describe('unsetting dotplot analysis type', () => {
    let settings;

    beforeAll(() => {
      FalsyButNotZero.mockReturnValue(true);
      const form = {
        analysisType: 'dotplot',
      };
      settings = Settings(form);
    });

    it('should unset primary filter value', () => {
      const primaryFilterIndex = settings.findIndex(setting => (setting.key === 'primaryFilter'));
      expect(settings[primaryFilterIndex].props.children).toBe('Primary filter: not set');
    });

    it('should unset secondary filter value', () => {
      const secondaryFilterIndex = settings.findIndex(setting => (setting.key === 'secondaryFilter'));
      expect(settings[secondaryFilterIndex].props.children).toBe('Secondary filter: not set');
    });

    it('should unset minimum abundance value', () => {
      const minAbundanceIndex = settings.findIndex(setting => (setting.key === 'minAbundance'));
      expect(settings[minAbundanceIndex].props.children).toBe('Minimum abundance: not set');
    });

    it('should unset clustering value', () => {
      const clusteringIndex = settings.findIndex(setting => (setting.key === 'clustering'));
      expect(settings[clusteringIndex].props.children).toBe('Clustering type: not set');
    });
  });

  describe('optional tags', () => {
    let settings;

    beforeAll(() => {
      FalsyButNotZero.mockReturnValue(true);
      const form = {
        analysisType: 'dotplot',
        ctrlSub: true,
        readoutLengthNorm: true,
      };
      settings = Settings(form);
    });

    it('should return ctrl subtraction value', () => {
      const ctrlSubIndex = settings.findIndex(setting => (setting.key === 'ctrlSub'));
      expect(settings[ctrlSubIndex].props.children).toBe('Control subtraction is selected');
    });

    it('should return readout normalization value', () => {
      const readoutLengthNormIndex = settings.findIndex(setting => (setting.key === 'readoutLengthNorm'));
      expect(settings[readoutLengthNormIndex].props.children).toBe('Readout length normalization is selected');
    });
  });

  describe('normalization tags', () => {
    describe('total normalization', () => {
      let settings;

      beforeAll(() => {
        FalsyButNotZero.mockReturnValue(true);
        settings = Settings({
          analysisType: 'dotplot',
          normalization: 'total',
        });
      });

      it('should return total tag', () => {
        const normalizationIndex = settings.findIndex(setting => (setting.key === 'normalization'));
        expect(settings[normalizationIndex].props.children).toBe('Condition normalization: total abundance');
      });
    });

    describe('readout normalization', () => {
      let settings;

      beforeAll(() => {
        FalsyButNotZero.mockReturnValue(true);
        settings = Settings({
          analysisType: 'dotplot',
          normalization: 'readout',
        });
      });

      it('should return readout tag', () => {
        const normalizationIndex = settings.findIndex(setting => (setting.key === 'normalization'));
        expect(settings[normalizationIndex].props.children).toBe('Condition normalization: specific readout');
      });
    });
  });

  describe('log tags', () => {
    describe('base 2', () => {
      let settings;

      beforeAll(() => {
        FalsyButNotZero.mockReturnValue(true);
        settings = Settings({
          analysisType: 'dotplot',
          logBase: 2,
        });
      });

      it('should return log tag', () => {
        const logTransformIndex = settings.findIndex(setting => (setting.key === 'logBase'));
        expect(settings[logTransformIndex].props.children).toBe('Log transformation: base 2');
      });
    });
  });
});
