import React from 'react';
import { shallow } from 'enzyme';
import { MapContainer } from './panel__map-container';

const dimensions = {
  columns: 50,
  pageX: 25,
  pageY: 25,
  rows: 50,
};
const position = {
  x: 0,
  y: 0,
};
const updatePosition = jest.fn();

describe('Map panel container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <MapContainer
        annotations={{ show: false }}
        dimensions={dimensions}
        markers={{
          color: '#000',
          list: [],
        }}
        minimap={{
          attached: true,
          image: 'image',
          isSyncing: false,
          synced: true,
          syncError: false,
          syncImage: null,
        }}
        position={position}
        render={props => <div {...props} />}
        search={{}}
        syncMap={jest.fn()}
        toggleMapAttach={jest.fn()}
        updatePosition={updatePosition}
      />,
    );
  });

  beforeEach(() => {
    updatePosition.mockClear();
  });

  describe('navigatePosition should call update position prop method', () => {
    it('with mouse position when region will be in bounds', () => {
      // Test navigatePosition method with mock event.
      const event = {
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
      };
      wrapper.instance().navigatePosition(event);
      expect(updatePosition).toHaveBeenCalledWith(13, 13);
    });

    it('with limits when region will be beyond bounds', () => {
      const event = {
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
      };
      wrapper.instance().navigatePosition(event);
      expect(updatePosition).toHaveBeenCalledWith(25, 25);
    });

    it('with limits when region will be below bounds', () => {
      const event = {
        clientX: 0,
        clientY: 0,
        target: {
          getBoundingClientRect: () => ({
            height: 1000,
            left: 0,
            top: 0,
            width: 1000,
          }),
        },
      };
      wrapper.instance().navigatePosition(event);
      expect(updatePosition).toHaveBeenCalledWith(0, 0);
    });
  });

  it('setRange defines range box for current view', () => {
    const newPosition = {
      x: 12,
      y: 2,
    };
    const expectedRangeBox = {
      height: '50%',
      left: '24%',
      top: '4%',
      width: '50%',
    };
    expect(wrapper.instance().setRange(dimensions, newPosition)).toEqual(expectedRangeBox);
  });

  describe('convertMarkers maps marker object to image range', () => {
    it('and should return empty list when list is empty', () => {
      const markers = {
        color: '#000',
        list: [],
      };
      expect(wrapper.instance().convertMarkers(dimensions, markers)).toEqual(markers);
    });

    it('and should map list', () => {
      const markers = {
        color: '#000',
        list: [{
          height: 10,
          width: 5,
          x: 15,
          y: 20,
        }],
      };
      const expectedMarkers = {
        color: '#000',
        list: [{
          height: 0.2,
          width: 0.1,
          x: 0.3,
          y: 0.4,
        }],
      };
      expect(wrapper.instance().convertMarkers(dimensions, markers)).toEqual(expectedMarkers);
    });
  });

  describe('updateMarkers should update the markers', () => {
    const markers = {
      color: '#000',
      list: ['a'],
    };
    let spy;

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'convertMarkers');
    });

    beforeEach(() => {
      spy.mockClear();
    });

    afterAll(() => {
      spy.mockRestore();
    });

    it('when nothing changes', () => {
      const nextProps = {
        markers,
      };
      wrapper.instance().updateMarkers(nextProps, markers);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('when the markers change', () => {
      const nextProps = {
        dimensions,
        markers: {
          color: '#000',
          list: ['a', 'b'],
        },
      };
      wrapper.instance().updateMarkers(nextProps, markers);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('when the color changes', () => {
      const nextProps = {
        dimensions,
        markers: {
          color: '#f00',
          list: ['a'],
        },
      };
      wrapper.instance().updateMarkers(nextProps, markers);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateRange should update the rangeBox', () => {
    let spy;

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'setRange');
    });

    beforeEach(() => {
      spy.mockClear();
    });

    afterAll(() => {
      spy.mockRestore();
    });

    it('when nothing changes', () => {
      const nextProps = {
        dimensions,
        position,
      };
      wrapper.instance().updateRange(nextProps, dimensions, position);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('when the page width changes', () => {
      const newDimensions = {
        ...dimensions,
        pageX: 10,
        pageY: 25,
      };
      const nextProps = {
        dimensions: newDimensions,
        position,
      };
      wrapper.instance().updateRange(nextProps, dimensions, position);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('when the page height changes', () => {
      const newDimensions = {
        ...dimensions,
        pageX: 25,
        pageY: 10,
      };
      const nextProps = {
        dimensions: newDimensions,
        position,
      };
      wrapper.instance().updateRange(nextProps, dimensions, position);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('when the x position changes', () => {
      const newPosition = {
        pageX: 10,
        pageY: 0,
      };
      const nextProps = {
        dimensions,
        position: newPosition,
      };
      wrapper.instance().updateRange(nextProps, dimensions, position);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('when the y position changes', () => {
      const newPosition = {
        pageX: 0,
        pageY: 10,
      };
      const nextProps = {
        dimensions,
        position: newPosition,
      };
      wrapper.instance().updateRange(nextProps, dimensions, position);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when props change', () => {
    it('should check markers', () => {
      const spy = jest.spyOn(wrapper.instance(), 'updateMarkers');
      wrapper.setProps({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should check range', () => {
      const spy = jest.spyOn(wrapper.instance(), 'updateRange');
      wrapper.setProps({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  it('render prop should be passed attached state', () => {
    expect(wrapper.find('div').props().isAttached).toBeTruthy();
  });
});

describe('Map panel container when not in panel', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <MapContainer
        annotations={{ show: false }}
        dimensions={dimensions}
        markers={{
          color: '#000',
          list: [],
        }}
        minimap={{
          attached: true,
          image: 'image',
          isSyncing: false,
          synced: true,
          syncError: false,
          syncImage: null,
        }}
        position={position}
        render={props => <div {...props} />}
        reverseAttached
        search={{}}
        syncMap={jest.fn()}
        toggleMapAttach={jest.fn()}
        updatePosition={updatePosition}
      />,
    );
  });

  it('render prop should be passed opposite of attached state', () => {
    expect(wrapper.find('div').props().isAttached).toBeFalsy();
  });
});
