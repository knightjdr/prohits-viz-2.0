import { shallow } from 'enzyme';

import Settings from './settings';

const params = {
  // Omitted params.
  a: '',
  name: 'names',
  // Score type has special handler.
  scoreType: 'lte',
  // String handlers,
  b: 'string param',
  c: ['d', 'e'],
  f: {},
  // Boolean handlers
  g: true,
  h: [],
};

describe('Info panel settings', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(Settings(params));
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should omit empty key', () => {
    expect(wrapper.findWhere(node => node.key() === 'a').length).toBe(0);
  });

  it('should omit key to ignore', () => {
    expect(wrapper.findWhere(node => node.key() === 'name').length).toBe(0);
  });

  it('should omit object', () => {
    expect(wrapper.findWhere(node => node.key() === 'f').length).toBe(0);
  });

  it('should return node for string value', () => {
    expect(wrapper.findWhere(node => node.key() === 'b').length).toBe(1);
  });

  it('should return node for array', () => {
    const setting = wrapper.findWhere(node => node.key() === 'c');
    expect(setting.length).toBe(1);
    expect(setting.props().value.length).toBe(2);
  });

  it('should omit empty array', () => {
    expect(wrapper.findWhere(node => node.key() === 'h').length).toBe(0);
  });

  it('should return expected text for score', () => {
    expect(wrapper.findWhere(node => node.key() === 'scoreType').props().value).toBe('smaller scores better');
  });
});
