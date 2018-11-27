import { shallow } from 'enzyme';

import renderInterface from './tab-main__svg-interface';

jest.mock('./tab-main__store-connection');
jest.mock('./tab-main__svg');

describe('SVG interface', () => {
  describe('when visible', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        renderInterface({
          other: 'otherProp',
          plotTranslate: 100,
          setContainerRef: { ref: 'test' },
          show: true,
        }),
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set transform', () => {
      expect(wrapper.find('.heatmap-svg__wrapper').props().style.transform).toBe('translate(100px)');
    });

    it('should render store connection', () => {
      expect(wrapper.find('StoreConnection').length).toBe(1);
    });

    it('should pass other props to store connection', () => {
      const storeConnection = wrapper.find('StoreConnection');
      expect(Object.prototype.hasOwnProperty.call(storeConnection.props(), 'other')).toBeTruthy();
    });
  });

  describe('when hidden', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        renderInterface({
          other: 'otherProp',
          plotTranslate: 100,
          setContainerRef: { ref: 'test' },
          show: false,
        }),
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should show svg element', () => {
      expect(wrapper.find('StoreConnection').length).toBe(0);
    });
  });
});
