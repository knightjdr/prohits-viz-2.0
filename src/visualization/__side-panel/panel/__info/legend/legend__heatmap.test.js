import { shallow } from 'enzyme';

import colorGradient from '../../../../color/color-gradient';
import HeatmapLegend from './legend__heatmap';

jest.mock('../../../../color/color-gradient');
colorGradient.mockReturnValue(['#ffffff', '#0000ff', '#000000']);

const params = {
  abundanceCap: 50,
  abundanceColumn: 'Abundance',
  fillColor: 'blueBlack',
  invertColor: false,
  gradientFill: ['#ffffff', '#ff0000', '#000000'],
  minAbundance: 0,
};

describe('Heatmap legend', () => {
  let wrapper;

  beforeAll(() => {
    colorGradient.mockClear();
    wrapper = shallow(
      HeatmapLegend({ ...params }),
    );
  });

  it('should to match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set color gradient for fill', () => {
    expect(colorGradient).toHaveBeenCalledWith('blueBlack', 101, false);
  });
});
