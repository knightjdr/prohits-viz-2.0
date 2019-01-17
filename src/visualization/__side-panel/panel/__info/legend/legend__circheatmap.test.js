import { shallow } from 'enzyme';

import colorGradient from '../../../../color/color-gradient';
import CircHeatmapLegend from './legend__circheatmap';

jest.mock('../../../../color/color-gradient');
colorGradient.mockReturnValue(['#ffffff', '#0000ff', '#000000']);

const segments = [
  { name: 'attribute 1' },
  { name: 'attribute 1' },
  { name: 'attribute 1' },
];
const settings = [
  {
    abundanceCap: 50,
    color: 'blueBlack',
    minAbundance: 0,
  },
  {
    abundanceCap: 50,
    color: 'redBlack',
    minAbundance: 0,
  },
  {
    abundanceCap: 50,
    color: 'yellowBlack',
    minAbundance: 0,
  },
];

describe('CircHeatmap legend', () => {
  describe('with known line segment', () => {
    let wrapper;

    beforeAll(() => {
      colorGradient.mockClear();
      wrapper = shallow(
        CircHeatmapLegend({
          known: true,
          circHeatmapSettings: settings,
          segments,
        }),
      );
    });

    it('should to match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render 4 g elements, 3 for gradients and one for known segment', () => {
      expect(wrapper.find('svg > g').length).toBe(4);
    });

    it('should set color gradient for outer circle', () => {
      expect(colorGradient).toHaveBeenCalledWith('blueBlack', 101, false);
    });

    it('should set color gradient for middle circle', () => {
      expect(colorGradient).toHaveBeenCalledWith('redBlack', 101, false);
    });

    it('should set color gradient for inner circle', () => {
      expect(colorGradient).toHaveBeenCalledWith('yellowBlack', 101, false);
    });
  });

  describe('without known line segment', () => {
    let wrapper;

    beforeAll(() => {
      colorGradient.mockClear();
      wrapper = shallow(
        CircHeatmapLegend({
          known: false,
          circHeatmapSettings: settings,
          segments,
        }),
      );
    });

    it('should to match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render 3 g elements for gradients', () => {
      expect(wrapper.find('svg > g').length).toBe(3);
    });
  });
});
