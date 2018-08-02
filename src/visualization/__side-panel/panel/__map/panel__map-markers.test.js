import React from 'react';
import { shallow } from 'enzyme';

import Markers from './panel__map-markers';

jest.mock('shortid');

const markers = {
  color: '#000000',
  list: [
    {
      height: 0.1,
      width: 0.1,
      x: 0.1,
      y: 0.1,
    },
    {
      height: 0.2,
      width: 0.3,
      x: 0.5,
      y: 0.5,
    },
  ],
};

describe('Map panel markers', () => {
  describe('should render', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Markers markers={markers} />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and markers should have dimensions matching inputs as percentages', () => {
      const div = wrapper.find('.panel__map-marker').at(1);
      expect(div.props().style.height).toBe('20%');
      expect(div.props().style.left).toBe('50%');
      expect(div.props().style.top).toBe('50%');
      expect(div.props().style.width).toBe('30%');
    });
  });
});
