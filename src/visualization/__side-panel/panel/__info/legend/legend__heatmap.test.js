import { shallow } from 'enzyme';

import HeatmapLegend from './legend__heatmap';

const params = {
  abundanceCap: 50,
  abundanceName: 'Abundance',
  gradientFill: ['#ffffff', '#ff0000', '#000000'],
  minAbundance: 0,
};

describe('Heatmap legend', () => {
  it('should render', () => {
    const wrapper = shallow(
      HeatmapLegend({ ...params }),
    );
    expect(wrapper).toMatchSnapshot();
  });
});
