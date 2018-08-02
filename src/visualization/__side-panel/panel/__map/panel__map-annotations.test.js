import React from 'react';
import { shallow } from 'enzyme';

import Annotations from './panel__map-annotations';

const annotations = {
  color: '#0000ff',
  list: [
    { text: 'a', x: 0.1, y: 0.2 },
    { text: 'b', x: 0.2, y: 0.4 },
  ],
};

describe('Map panel annotations', () => {
  describe('should render', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Annotations annotations={annotations} />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and annotations should have position matching inputs as % - 5px', () => {
      const div = wrapper.find('.panel__map-annotation').first();
      expect(div.props().style.left).toBe('calc(10% - 5px)');
      expect(div.props().style.top).toBe('calc(20% - 5px)');
    });
  });
});
