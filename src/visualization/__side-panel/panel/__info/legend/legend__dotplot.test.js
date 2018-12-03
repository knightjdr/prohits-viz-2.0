import { shallow } from 'enzyme';

import colorGradient from '../../../../color/color-gradient';
import DotplotLegend from './legend__dotplot';

jest.mock('../../../../color/color-gradient');
colorGradient.mockReturnValue(['#ffffff', '#0000ff', '#000000']);

const params = {
  abundanceCap: 50,
  abundanceColumn: 'Abundance',
  edgeColor: 'blueBlack',
  fillColor: 'redBlack',
  invertColor: false,
  minAbundance: 0,
  primaryFilter: 0.01,
  scoreColumn: 'Score',
  scoreType: 'lte',
  secondaryFilter: 0.05,
};

describe('Dotplot legend', () => {
  describe('smaller scores are better', () => {
    let wrapper;

    beforeAll(() => {
      colorGradient.mockClear();
      wrapper = shallow(
        DotplotLegend({ ...params }),
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set color gradient for edge', () => {
      expect(colorGradient).toHaveBeenCalledWith('blueBlack', 101, false);
    });

    it('should set color gradient for fill', () => {
      expect(colorGradient).toHaveBeenCalledWith('redBlack', 101, false);
    });
  });

  describe('larger scores are better', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        DotplotLegend({ ...params, scoreType: 'gte' }),
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
