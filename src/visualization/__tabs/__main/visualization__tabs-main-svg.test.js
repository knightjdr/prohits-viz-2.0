import React from 'react';
import { shallow } from 'enzyme';

import Svg from './visualization__tabs-main-svg';

jest.mock('./visualization__tabs-main-connected');

const openContextMenu = jest.fn();

describe('Main heatmap svg', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Svg
        closeContextMenu={jest.fn()}
        contextTarget=""
        fixLeft={false}
        handleClick={jest.fn()}
        height={{
          arrowsY: true,
        }}
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
        width={{
          arrowsX: false,
          canTranslate: false,
          wrapper: 500,
        }}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show connected component', () => {
    expect(wrapper.find('SvgConnected').length).toBe(1);
  });
});
