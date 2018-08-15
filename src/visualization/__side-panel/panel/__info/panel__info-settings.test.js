import React from 'react';
import { shallow } from 'enzyme';

import Settings from './panel__info-settings';

jest.mock('../../../../helpers/convert-camel');

describe('Info panel settings', () => {
  it('should render omitted, string and array properties', () => {
    const params = {
      // Omitted params.
      a: '',
      fillColor: 'blueBlack',
      // Score type has special handler.
      scoreType: 'lte',
      // String handlers,
      b: 'string param',
      c: 'string param',
      d: ['e', 'f'],
      g: {},
    };
    const wrapper = shallow(<div>{Settings(params)}</div>);
    expect(wrapper).toMatchSnapshot();
    // Omitted params not rendered.
    expect(wrapper.findWhere(node => node.key() === 'a-name').length).toBe(0);
    expect(wrapper.findWhere(node => node.key() === 'fillColor-name').length).toBe(0);
    // Score type returns expected text.
    expect(wrapper.findWhere(node => node.key() === 'scoreType-value').props().children).toBe('smaller scores better');
    // String params rendered.
    expect(wrapper.findWhere(node => node.key() === 'b-name').length).toBe(1);
    expect(wrapper.findWhere(node => node.key() === 'c-name').length).toBe(1);
    // Array rendered with children.
    expect(wrapper.findWhere(node => node.key() === 'd-name').length).toBe(1);
    expect(wrapper.findWhere(node => node.key() === 'd-value').props().children.length).toBe(2);
    // Other things, e.g. objects, not rendered.
    expect(wrapper.findWhere(node => node.key() === 'g-name').length).toBe(0);
  });
});
