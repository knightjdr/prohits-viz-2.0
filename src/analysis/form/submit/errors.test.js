import { shallow } from 'enzyme';

import Errors from './errors';

describe('Errors', () => {
  test('No errors returns null', () => {
    expect(Errors({})).toBeNull();
  });

  test('Errors returns an element', () => {
    const wrapper = shallow(Errors({ test: 'error' }));
    expect(wrapper).toMatchSnapshot();
    const container = wrapper.find('.Errors-container');
    expect(container.length).toBe(1);
  });
});
