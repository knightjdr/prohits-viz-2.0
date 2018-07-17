import React from 'react';
import { shallow } from 'enzyme';

import Round from '../../../../helpers/round';
import { MapContainer } from './panel__map-container';

jest.mock('../../../../helpers/round');
Round.mockReturnValue(0.5);

const updatePosition = jest.fn();

describe('Map panel container', () => {
  it('navigatePosition should call update position prop method', () => {
    const wrapper = shallow(
      <MapContainer
        annotations={{}}
        markers={{}}
        minimap={{
          image: '',
          showAnnotations: false,
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
          height: 100,
          left: 100,
          top: 100,
          width: 100,
        }),
      },
    });
    expect(updatePosition).toHaveBeenCalledWith(0.5, 0.5);
  });
});
