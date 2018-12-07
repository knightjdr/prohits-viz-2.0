import React from 'react';
import { shallow } from 'enzyme';

import { StoreConnection } from './tab-customize__store-connection';

const renderSvg = jest.fn();

const props = {
  addMarkerBox: jest.fn(),
  annotations: {},
  customize: [{
    columns: {
      names: ['a', 'b', 'c'],
    },
    id: 1,
    rows: {
      list: [{ data: [{ value: 1 }, { value: 3 }, { value: 2 }], name: 'x' }],
      order: ['x'],
    },
  }],
  customizeOptions: {
    deleteRC: false,
    reorder: false,
  },
  deleteItem: jest.fn(),
  dimensions: {},
  display: {},
  markers: {},
  name: 'name',
  panel: false,
  position: {},
  reorder: jest.fn(),
  reset: jest.fn(),
  scoreType: 'lte',
  search: {},
  setDims: jest.fn(),
  setGeneSelections: jest.fn(),
  setRef: jest.fn(),
  setSelectedGenes: jest.fn(),
  settings: {},
  sort: jest.fn(),
  sortInfo: {},
  toggleSelection: jest.fn(),
  toggleTips: jest.fn(),
  updateAnnotation: jest.fn(),
  updateGeneOrder: jest.fn(),
  updatePlotXY: jest.fn(),
  updateXY: jest.fn(),
  other: 'test',
};

describe('Store connection', () => {
  describe('when there is customized state', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <StoreConnection
          {...props}
          renderProp={connectedProps => <div {...connectedProps} />}
          renderSvg={renderSvg}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set render prop on component to renderSvg', () => {
      expect(wrapper.props().renderProp).toEqual(renderSvg);
    });

    it('should add other props', () => {
      expect(wrapper.props().other).toBe('test');
    });

    it('should have columns matching column object', () => {
      expect(wrapper.props().columns).toEqual(props.customize[0].columns);
    });

    it('should have customize ID', () => {
      expect(wrapper.props().customizeID).toBe(1);
    });

    it('should have row names matching order', () => {
      expect(wrapper.props().rowNames).toEqual(props.customize[0].rows.order);
    });

    it('should have row matching row object', () => {
      expect(wrapper.props().rows).toEqual(props.customize[0].rows);
    });
  });

  describe('when there is no customized state', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <StoreConnection
          {...props}
          customize={[]}
          renderProp={connectedProps => <div {...connectedProps} />}
          renderSvg={renderSvg}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set render prop on component to renderSvg', () => {
      expect(wrapper.props().renderProp).toEqual(renderSvg);
    });

    it('should add other props', () => {
      expect(wrapper.props().other).toBe('test');
    });

    it('should have empty columns object', () => {
      expect(wrapper.props().columns).toEqual({});
    });

    it('should have customize ID', () => {
      expect(wrapper.props().customizeID).toBeNull();
    });

    it('should have row names matching order', () => {
      expect(wrapper.props().rowNames).toEqual([]);
    });

    it('should have row matching row object', () => {
      expect(wrapper.props().rows).toEqual({});
    });
  });
});
