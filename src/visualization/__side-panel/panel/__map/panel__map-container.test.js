import React from 'react';
import { shallow } from 'enzyme';
import { MapContainer } from './panel__map-container';

const updatePosition = jest.fn();

describe('Map panel container', () => {
  beforeEach(() => {
    updatePosition.mockClear();
  });

  it('navigatePosition should call update position prop method', () => {
    const wrapper = shallow(
      <MapContainer
        annotations={{}}
        dimensions={{
          height: 0.12,
          width: 0.2,
        }}
        markers={{}}
        minimap={{
          image: '',
          showAnnotations: false,
        }}
        position={{
          x: 0,
          y: 0,
        }}
        toggleAnnotations={jest.fn()}
        updatePosition={updatePosition}
      />,
    );

    // Test navigatePosition method with mock event.
    wrapper.instance().navigatePosition({
      clientX: 500,
      clientY: 500,
      target: {
        getBoundingClientRect: () => ({
          height: 1000,
          left: 0,
          top: 0,
          width: 1000,
        }),
      },
    });
    expect(updatePosition).toHaveBeenCalledWith(0.4, 0.44);
  });

  it('navigatePosition should ensure x and y are within boundaries', () => {
    const wrapper = shallow(
      <MapContainer
        annotations={{}}
        dimensions={{
          height: 0.12,
          width: 0.2,
        }}
        markers={{}}
        minimap={{
          image: '',
          showAnnotations: false,
        }}
        position={{
          x: 0,
          y: 0,
        }}
        toggleAnnotations={jest.fn()}
        updatePosition={updatePosition}
      />,
    );

    // Test navigatePosition method with mock event.
    wrapper.instance().navigatePosition({
      clientX: 900,
      clientY: 950,
      target: {
        getBoundingClientRect: () => ({
          height: 1000,
          left: 0,
          top: 0,
          width: 1000,
        }),
      },
    });
    expect(updatePosition).toHaveBeenCalledWith(0.8, 0.88);
  });
});
