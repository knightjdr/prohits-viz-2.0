import React from 'react';
import { shallow } from 'enzyme';

import Organism, { filterSpecies } from './options-go__organism';

const handleSelect = jest.fn();

describe('Filter species for search select', () => {
  it('should match a species name regardless of case', () => {
    let option = {
      props: {
        children: 'aaa',
      },
    };
    expect(filterSpecies('AAA', option)).toBeTruthy();
    option = {
      props: {
        children: 'AaA',
      },
    };
    expect(filterSpecies('aaa', option)).toBeTruthy();
    option = {
      props: {
        children: 'aaa',
      },
    };
    expect(filterSpecies('aaa', option)).toBeTruthy();
  });
});

describe('Analysis GO options advanced sub panel', () => {
  let wrapper;

  beforeEach(() => {
    handleSelect.mockClear();
  });

  beforeAll(() => {
    wrapper = shallow(
      <Organism
        handleSelect={handleSelect}
        organism="hsapiens"
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have oragnism value matching prop', () => {
    expect(wrapper.find('Select').props().value).toBe('hsapiens');
  });

  it('should call handleSelect on change', () => {
    wrapper.find('Select').simulate('change', 'mmusculus');
    expect(handleSelect).toHaveBeenCalledWith('organism', 'mmusculus');
  });
});
