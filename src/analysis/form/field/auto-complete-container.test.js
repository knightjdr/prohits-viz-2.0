import React from 'react';
import { shallow } from 'enzyme';

import AutoCompleteContainer from './auto-complete-container';

const dataSource = ['a', 'b', 'c', 'aa'];

describe('AutoCompleteContainer', () => {
  describe('input with value', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <AutoCompleteContainer
          dataSource={dataSource}
          input={{
            onChange: jest.fn(),
            value: 'test',
          }}
          meta={{}}
          onChange={jest.fn()}
        />,
      );
    });

    it('should set state datasource to match props', () => {
      expect(wrapper.state('dataSource')).toEqual(dataSource);
    });

    it('should set state value to match prop when defined', () => {
      expect(wrapper.state('value')).toBe('test');
    });

    it('should update state value via onChange', () => {
      wrapper.instance().onChange('new value');
      expect(wrapper.state('value')).toBe('new value');
    });

    describe('handle search', () => {
      it('should set state datasource to prop when value is falsy', () => {
        wrapper.instance().handleSearch(null);
        expect(wrapper.state('dataSource')).toEqual(dataSource);
      });

      it('should set state datasource to filtered array', () => {
        wrapper.instance().handleSearch('a');
        expect(wrapper.state('dataSource')).toEqual(['a', 'aa']);
      });
    });
  });

  describe('input with no value', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <AutoCompleteContainer
          dataSource={[]}
          input={{
            onChange: jest.fn(),
            value: undefined,
          }}
          meta={{}}
          onChange={jest.fn()}
        />,
      );
    });

    it('should set state to undefined', () => {
      expect(wrapper.state('value')).toBeUndefined();
    });
  });
});
