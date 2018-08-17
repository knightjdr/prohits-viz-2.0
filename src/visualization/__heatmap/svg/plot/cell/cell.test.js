import React from 'react';
import { shallow } from 'enzyme';

import Cell from './cell';

const rows = [
  {
    edgeColor: '#fff',
    fillColor: '#fff',
    key: 'a',
    radius: '1',
  },
  {
    edgeColor: '#aaa',
    fillColor: '#aaa',
    key: 'b',
    radius: '0.5',
  },
  {
    edgeColor: '#555',
    fillColor: '#555',
    key: 'b',
    radius: '0.2',
  },
];

describe('Plot cell', () => {
  describe('dotplot', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <div>
          { Cell('dotplot')(15, rows, 0, 2, 2) }
        </div>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should map row elements to circles', () => {
      expect(wrapper.find('circle').length).toBe(3);
    });
  });

  describe('heatmap', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <div>
          { Cell('heatmap')(15, rows, 0) }
        </div>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should map row elements to rect', () => {
      expect(wrapper.find('rect').length).toBe(3);
    });
  });
});
