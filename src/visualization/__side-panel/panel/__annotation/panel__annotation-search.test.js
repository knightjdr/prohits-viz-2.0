import React from 'react';
import { shallow } from 'enzyme';

import Search from './panel__annotation-search';

const clearSearch = jest.fn();
const handleSearch = jest.fn();
const updateSearchTerm = jest.fn();

beforeEach(() => {
  /* Clear call count */
  clearSearch.mockClear();
  handleSearch.mockClear();
  updateSearchTerm.mockClear();
});

describe('Search component on annotation panel', () => {
  describe('should render', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Search
          clearSearch={clearSearch}
          handleSearch={handleSearch}
          search={{
            match: false,
            searched: false,
            term: '',
          }}
          updateSearchTerm={updateSearchTerm}
        />,
      );
    });

    it('and should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call updateSearchTerm when input changes', () => {
      wrapper.find('Input').simulate('change', { target: { value: 'term' } });
      expect(updateSearchTerm).toHaveBeenCalledWith('term');
    });

    it('should trigger search when button clicked', () => {
      wrapper.find('button').first().simulate('click');
      expect(handleSearch).toHaveBeenCalledTimes(1);
    });

    it('should trigger clearing search when button clicked', () => {
      wrapper.find('button').last().simulate('click');
      expect(clearSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe('should render warning', () => {
    it('but not when "searched" is false', () => {
      const wrapper = shallow(
        <Search
          clearSearch={clearSearch}
          handleSearch={handleSearch}
          search={{
            match: false,
            searched: false,
            term: '',
          }}
          updateSearchTerm={updateSearchTerm}
        />,
      );
      const warning = wrapper.find('.panel__annotation-search-warning');
      expect(warning.props().style.height).toBe(0);
    });

    it('not when "matched" is true', () => {
      const wrapper = shallow(
        <Search
          clearSearch={clearSearch}
          handleSearch={handleSearch}
          search={{
            match: true,
            searched: true,
            term: '',
          }}
          updateSearchTerm={updateSearchTerm}
        />,
      );
      const warning = wrapper.find('.panel__annotation-search-warning');
      expect(warning.props().style.height).toBe(0);
    });

    describe('only when searched is true and matched is false', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <Search
            clearSearch={clearSearch}
            handleSearch={handleSearch}
            search={{
              match: false,
              searched: true,
              term: '',
            }}
            updateSearchTerm={updateSearchTerm}
          />,
        );
      });

      it('and should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
      it('and display warning', () => {
        const warning = wrapper.find('.panel__annotation-search-warning');
        expect(warning.props().style.height).toBe(31);
      });
    });
  });
});
