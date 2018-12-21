import React from 'react';
import { shallow } from 'enzyme';

import Image from './panel__map-image';

const navigatePosition = jest.fn();

describe('Minimap image', () => {
  describe('with minimap', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Image
          annotations={{}}
          imageLimits={{
            maxHeight: 500,
            maxWidth: 600,
          }}
          markers={{}}
          minimap="map"
          navigatePosition={navigatePosition}
          rangeBox={{
            height: '20%',
            left: '20%',
            top: '20%',
            width: '20%',
          }}
          search={{
            match: false,
            term: '',
          }}
          showAnnotations={false}
          showMarkers={false}
          syncImage={null}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display map', () => {
      expect(wrapper.find('img').props().src).toBe('map');
    });

    it('should display range box', () => {
      const rangeBox = wrapper.find('.panel__map-position');
      expect(rangeBox.props().style.height).toBe('20%');
      expect(rangeBox.props().style.left).toBe('20%');
      expect(rangeBox.props().style.top).toBe('20%');
      expect(rangeBox.props().style.width).toBe('20%');
    });

    it('should have img style set for max height and width', () => {
      const img = wrapper.find('img');
      expect(img.props().style.maxHeight).toBe(500);
      expect(img.props().style.maxWidth).toBe(600);
    });

    it('should call prop method navigatePosition on click', () => {
      wrapper.find('button').simulate('click');
      expect(navigatePosition).toHaveBeenCalledTimes(1);
    });
  });

  it('should render with sync image if present', () => {
    const wrapper = shallow(
      <Image
        annotations={{}}
        imageLimits={{
          maxHeight: 500,
          maxWidth: 600,
        }}
        markers={{}}
        minimap="map"
        navigatePosition={navigatePosition}
        rangeBox={{
          height: '20%',
          left: '20%',
          top: '20%',
          width: '20%',
        }}
        search={{
          match: false,
          term: '',
        }}
        showAnnotations={false}
        syncImage="syncImage"
      />,
    );
    expect(wrapper.find('img').props().src).toBe('syncImage');
  });


  it('should render with annotations', () => {
    const wrapper = shallow(
      <Image
        annotations={{}}
        imageLimits={{
          maxHeight: 500,
          maxWidth: 600,
        }}
        markers={{}}
        minimap="map"
        navigatePosition={navigatePosition}
        rangeBox={{
          height: '20%',
          left: '20%',
          top: '20%',
          width: '20%',
        }}
        search={{
          match: false,
          term: '',
        }}
        showAnnotations
        showMarkers={false}
        syncImage="syncImage"
      />,
    );
    expect(wrapper.find('Annotations').length).toBe(1);
  });

  it('should render with markers', () => {
    const wrapper = shallow(
      <Image
        annotations={{}}
        imageLimits={{
          maxHeight: 500,
          maxWidth: 600,
        }}
        markers={{}}
        minimap="map"
        navigatePosition={navigatePosition}
        rangeBox={{
          height: '20%',
          left: '20%',
          top: '20%',
          width: '20%',
        }}
        search={{
          match: false,
          term: '',
        }}
        showAnnotations={false}
        showMarkers
        syncImage="syncImage"
      />,
    );
    expect(wrapper.find('Markers').length).toBe(1);
  });

  it('should render with search', () => {
    const wrapper = shallow(
      <Image
        annotations={{}}
        imageLimits={{
          maxHeight: 500,
          maxWidth: 600,
        }}
        markers={{}}
        minimap="map"
        navigatePosition={navigatePosition}
        rangeBox={{
          height: '20%',
          left: '20%',
          top: '20%',
          width: '20%',
        }}
        search={{
          match: true,
          term: 'test',
        }}
        showAnnotations={false}
        showMarkers={false}
        syncImage="syncImage"
      />,
    );
    expect(wrapper.find('Search').length).toBe(1);
  });
});
