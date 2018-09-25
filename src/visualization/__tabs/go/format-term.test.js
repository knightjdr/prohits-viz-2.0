import { shallow } from 'enzyme';

import formatTerm from './format-term';

describe('format GO term', () => {
  it('should match snapshot when depth is 1', () => {
    const wrapper = shallow(formatTerm(1, 'term'));
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when depth is > 1', () => {
    const wrapper = shallow(formatTerm(2, 'term'));
    expect(wrapper).toMatchSnapshot();
  });
});
