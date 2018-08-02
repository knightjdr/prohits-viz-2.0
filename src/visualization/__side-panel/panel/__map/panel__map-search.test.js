import React from 'react';
import { shallow } from 'enzyme';

import Search from './panel__map-search';

describe('Search dots on map panel', () => {
  describe('should render', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Search
          search={{
            columns: { a: 0.2, b: 0.5 },
            rows: { c: 0.1, d: 0.9 },
          }}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and column positions should be mapped to left as % - 5 pixels', () => {
      const div = wrapper.find('.panel__map-search-match').first();
      expect(div.props().style.left).toBe('calc(20% - 5px)');
    });

    it('and rows positions should be mapped to top as % - 5 pixels', () => {
      const div = wrapper.find('.panel__map-search-match').at(2);
      expect(div.props().style.top).toBe('calc(10% - 5px)');
    });
  });
});
