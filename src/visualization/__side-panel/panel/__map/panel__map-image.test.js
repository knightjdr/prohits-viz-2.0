import React from 'react';
import { shallow } from 'enzyme';

import Image from './panel__map-image';

const navigatePosition = jest.fn();

describe('Minimap image', () => {
  describe('should render with minimap', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Image
          annotations={{}}
          markers={{}}
          minimap="map"
          navigatePosition={navigatePosition}
          rangeBox={{
            height: '20%',
            left: '20%',
            top: '20%',
            width: '20%',
          }}
          showAnnotations={false}
          syncImage={null}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and display map', () => {
      expect(wrapper.find('img').props().src).toBe('map');
    });

    it('and display range box', () => {
      expect(wrapper.find('.panel__map-position').props().style.height).toBe('20%');
      expect(wrapper.find('.panel__map-position').props().style.left).toBe('20%');
      expect(wrapper.find('.panel__map-position').props().style.top).toBe('20%');
      expect(wrapper.find('.panel__map-position').props().style.width).toBe('20%');
    });

    it('and call prop method navigatePosition on click', () => {
      wrapper.find('button').simulate('click');
      expect(navigatePosition).toHaveBeenCalledTimes(1);
    });
  });

  it('should render with sync image if present', () => {
    const wrapper = shallow(
      <Image
        annotations={{}}
        markers={{}}
        minimap="map"
        navigatePosition={navigatePosition}
        rangeBox={{
          height: '20%',
          left: '20%',
          top: '20%',
          width: '20%',
        }}
        showAnnotations={false}
        syncImage="syncImage"
      />,
    );
    expect(wrapper.find('img').props().src).toBe('syncImage');
  });

  it('should render without annotations', () => {
    const wrapper = shallow(
      <Image
        annotations={{}}
        markers={{}}
        minimap="map"
        navigatePosition={navigatePosition}
        rangeBox={{
          height: '20%',
          left: '20%',
          top: '20%',
          width: '20%',
        }}
        showAnnotations={false}
        syncImage="syncImage"
      />,
    );
    expect(wrapper.find('Annotations').length).toBe(0);
  });

  it('should render with annotations', () => {
    const wrapper = shallow(
      <Image
        annotations={{}}
        markers={{}}
        minimap="map"
        navigatePosition={navigatePosition}
        rangeBox={{
          height: '20%',
          left: '20%',
          top: '20%',
          width: '20%',
        }}
        showAnnotations
        syncImage="syncImage"
      />,
    );
    expect(wrapper.find('Annotations').length).toBe(1);
  });
});