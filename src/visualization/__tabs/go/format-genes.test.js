import { shallow } from 'enzyme';

import formatGenes from './format-genes';

const genes = ['a', 'b', 'c'];

describe('Format genes components', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(formatGenes(genes));
    expect(wrapper).toMatchSnapshot();
  });
});
