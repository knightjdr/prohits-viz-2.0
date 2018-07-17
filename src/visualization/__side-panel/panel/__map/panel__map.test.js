import React from 'react';
import { shallow } from 'enzyme';

import MapPanel from './panel__map';

const annotations = {
  color: '#0000ff',
  list: [
    { text: 'a', x: 0.1, y: 0.2 },
  ],
};
const markers = {
  color: '#000000',
  list: [
    {
      height: 0.1,
      width: 0.1,
      x: 0.1,
      y: 0.1,
    },
  ],
};
const minimap = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
const navigatePosition = jest.fn();
const toggleAnnotations = jest.fn();

describe('Map panel', () => {
  beforeEach(() => {
    /* Clear call count */
    navigatePosition.mockClear();
    toggleAnnotations.mockClear();
  });

  it('should render without annotations', () => {
    const wrapper = shallow(
      <MapPanel
        annotations={{}}
        markers={{}}
        minimap={minimap}
        navigatePosition={navigatePosition}
        showAnnotations={false}
        toggleAnnotations={toggleAnnotations}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with annotations', () => {
    const wrapper = shallow(
      <MapPanel
        annotations={annotations}
        markers={markers}
        minimap={minimap}
        navigatePosition={navigatePosition}
        showAnnotations
        toggleAnnotations={toggleAnnotations}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('on clicking image should trigger position navigation function', () => {
    const wrapper = shallow(
      <MapPanel
        annotations={{}}
        markers={{}}
        minimap={minimap}
        navigatePosition={navigatePosition}
        showAnnotations={false}
        toggleAnnotations={toggleAnnotations}
      />,
    );
    wrapper.find('.panel__map-select').simulate('click');
    expect(navigatePosition).toHaveBeenCalledTimes(1);
  });

  it('on clicking switch should trigger toggle annotations function', () => {
    const wrapper = shallow(
      <MapPanel
        annotations={{}}
        markers={{}}
        minimap={minimap}
        navigatePosition={navigatePosition}
        showAnnotations={false}
        toggleAnnotations={toggleAnnotations}
      />,
    );
    wrapper.find('Switch').simulate('change');
    expect(toggleAnnotations).toHaveBeenCalledTimes(1);
  });
});
