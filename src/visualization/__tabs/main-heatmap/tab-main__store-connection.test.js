import React from 'react';
import { shallow } from 'enzyme';

import { StoreConnection } from './tab-main__store-connection';

const renderSvg = jest.fn();

const props = {
  addMarkerBox: jest.fn(),
  annotations: {},
  columns: {},
  dimensions: {},
  display: {},
  markers: {},
  name: 'name',
  panel: false,
  position: {},
  reset: jest.fn(),
  rowNames: [],
  rows: [],
  scoreType: 'lte',
  search: {},
  setDims: jest.fn(),
  setRef: jest.fn(),
  setSelectedGenes: jest.fn(),
  settings: {},
  sort: jest.fn(),
  sortInfo: {},
  toggleSelection: jest.fn(),
  toggleTips: jest.fn(),
  updateAnnotation: jest.fn(),
  updatePlotXY: jest.fn(),
  updateXY: jest.fn(),
  other: 'test',
};

describe('Store connection', () => {
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
});
