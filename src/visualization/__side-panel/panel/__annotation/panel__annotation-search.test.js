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
  describe('with default props', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Search
          clearSearch={clearSearch}
          handleSearch={handleSearch}
          search={{
            match: false,
            matchCustomize: false,
            searched: false,
            term: '',
          }}
          tab="main"
          updateSearchTerm={updateSearchTerm}
        />,
      );
    });

    it('and should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not show warning when "searched" is false', () => {
      const warning = wrapper.find('.panel__annotation-search-warning');
      expect(warning.props().style.height).toBe(0);
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

  describe('with no match on main tab', () => {
    describe('when viewing main tab', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <Search
            clearSearch={clearSearch}
            handleSearch={handleSearch}
            search={{
              match: false,
              matchCustomize: true,
              searched: true,
              term: '',
            }}
            tab="main"
            updateSearchTerm={updateSearchTerm}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should display warning', () => {
        const warning = wrapper.find('.panel__annotation-search-warning');
        expect(warning.props().style.height).toBeGreaterThan(0);
      });
    });

    describe('when not viewing main tab', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <Search
            clearSearch={clearSearch}
            handleSearch={handleSearch}
            search={{
              match: false,
              matchCustomize: true,
              searched: true,
              term: '',
            }}
            tab="customize"
            updateSearchTerm={updateSearchTerm}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should display warning', () => {
        const warning = wrapper.find('.panel__annotation-search-warning');
        expect(warning.props().style.height).toBe(0);
      });
    });
  });

  describe('with no match on customize tab', () => {
    describe('when viewing main tab', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <Search
            clearSearch={clearSearch}
            handleSearch={handleSearch}
            search={{
              match: true,
              matchCustomize: false,
              searched: true,
              term: '',
            }}
            tab="main"
            updateSearchTerm={updateSearchTerm}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should display warning', () => {
        const warning = wrapper.find('.panel__annotation-search-warning');
        expect(warning.props().style.height).toBe(0);
      });
    });

    describe('when viewing customize tab', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <Search
            clearSearch={clearSearch}
            handleSearch={handleSearch}
            search={{
              match: true,
              matchCustomize: false,
              searched: true,
              term: '',
            }}
            tab="customize"
            updateSearchTerm={updateSearchTerm}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should display warning', () => {
        const warning = wrapper.find('.panel__annotation-search-warning');
        expect(warning.props().style.height).toBeGreaterThan(0);
      });
    });
  });
});
