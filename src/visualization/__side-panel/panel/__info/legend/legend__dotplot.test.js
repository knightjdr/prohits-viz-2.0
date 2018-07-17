import { shallow } from 'enzyme';

import DotplotLegend from './legend__dotplot';

const params = {
  abundanceCap: 50,
  abundanceName: 'Abundance',
  gradientEdge: ['#ffffff', '#ff0000', '#000000'],
  gradientFill: ['#ffffff', '#ff0000', '#000000'],
  minAbundance: 0,
  primaryFilter: 0.01,
  scoreName: 'Score',
  scoreType: 'lte',
  secondaryFilter: 0.05,
};

describe('Dotplot legend', () => {
  it('should render with score type where smaller scores are better', () => {
    const wrapper = shallow(
      DotplotLegend({ ...params }),
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with score type where larger scores are better', () => {
    const wrapper = shallow(
      DotplotLegend({ ...params, scoreType: 'gte' }),
    );
    expect(wrapper).toMatchSnapshot();
  });
});
