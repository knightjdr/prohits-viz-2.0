import React from 'react';
import { shallow } from 'enzyme';

import Svg from './heatmap-svg';

const openContextMenu = jest.fn();

describe('Heatmap svg', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Svg
        closeContextMenu={jest.fn()}
        contextTarget=""
        fixLeft={false}
        handleClick={jest.fn()}
        height={{}}
        openContextMenu={openContextMenu}
        plotTranslate={0}
        setContainerRef={{}}
        setSelections={jest.fn()}
        setReference={jest.fn()}
        show
        showContext=""
        sortRows={jest.fn()}
        tooltip={{}}
        toggleTooltip={jest.fn()}
        translateLeft={jest.fn()}
        width={{}}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call open context menu with column arg', () => {
    openContextMenu.mockClear();
    wrapper.find('Connect(ColumnsContainer)').props().openContextMenu({}, 'test');
    expect(openContextMenu).toHaveBeenCalledWith({}, 'test', 'column');
  });

  it('should call open context menu with row arg', () => {
    openContextMenu.mockClear();
    wrapper.find('Connect(RowsContainer)').props().openContextMenu({}, 'test');
    expect(openContextMenu).toHaveBeenCalledWith({}, 'test', 'row');
  });
});
