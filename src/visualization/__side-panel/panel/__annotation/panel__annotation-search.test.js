import React from 'react';
import { shallow } from 'enzyme';

import Search from './panel__annotation-search';

const clearSearch = jest.fn();
const handleSearch = jest.fn();
const updateSearchTerm = jest.fn();

describe('Search component on annotation panel', () => {
  beforeEach(() => {
    /* Clear call count */
    clearSearch.mockClear();
    handleSearch.mockClear();
    updateSearchTerm.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Search
        clearSearch={clearSearch}
        handleSearch={handleSearch}
        searchTerm=""
        updateSearchTerm={updateSearchTerm}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call updateSearchTerm when input changes', () => {
    const wrapper = shallow(
      <Search
        clearSearch={clearSearch}
        handleSearch={handleSearch}
        searchTerm=""
        updateSearchTerm={updateSearchTerm}
      />,
    );
    wrapper.find('Input').simulate('change', { target: { value: 'term' } });
    expect(updateSearchTerm).toHaveBeenCalledWith('term');
  });

  it('should trigger search when button clicked', () => {
    const wrapper = shallow(
      <Search
        clearSearch={clearSearch}
        handleSearch={handleSearch}
        searchTerm=""
        updateSearchTerm={updateSearchTerm}
      />,
    );
    wrapper.find('button').first().simulate('click');
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('should trigger clearing search when button clicked', () => {
    const wrapper = shallow(
      <Search
        clearSearch={clearSearch}
        handleSearch={handleSearch}
        searchTerm=""
        updateSearchTerm={updateSearchTerm}
      />,
    );
    wrapper.find('button').last().simulate('click');
    expect(clearSearch).toHaveBeenCalledTimes(1);
  });
});
