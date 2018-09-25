import React from 'react';
import { shallow } from 'enzyme';

import Go from './go';

const handleExport = jest.fn();
const results = {
  noResults: false,
  terms: [
    {
      depth: 1,
      genes: ['x', 'y', 'z'],
      q: 5,
      qt: 2,
      pValue: 0.01,
      source: 'BP',
      t: 10,
      term: 'term1',
    },
    {
      depth: 2,
      genes: ['xx', 'yy', 'zz'],
      q: 10,
      qt: 4,
      pValue: 0.05,
      source: 'CC',
      t: 25,
      term: 'term2',
    },
  ],
  warnings: ['warning'],
};

describe('GO component', () => {
  describe('on failure', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Go
          didFail
          handleExport={handleExport}
          isRunning={false}
          results={{}}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should return warning', () => {
      expect(wrapper.find('Warning').length).toBe(1);
    });
  });

  describe('when running', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Go
          didFail={false}
          handleExport={handleExport}
          isRunning
          results={{}}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should return running component', () => {
      expect(wrapper.find('Running').length).toBe(1);
    });
  });

  describe('when complete with no results', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Go
          didFail={false}
          handleExport={handleExport}
          isRunning={false}
          results={{
            noResults: true,
            list: [],
          }}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should return warning', () => {
      expect(wrapper.find('Warning').length).toBe(1);
    });
  });

  describe('when complete with results', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Go
          didFail={false}
          handleExport={handleExport}
          isRunning={false}
          results={results}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should return no warning', () => {
      expect(wrapper.find('Warning').length).toBe(0);
    });

    it('should handle export', () => {
      handleExport.mockClear();
      wrapper.find('Button').simulate('click');
      expect(handleExport).toHaveBeenCalled();
    });
  });
});
