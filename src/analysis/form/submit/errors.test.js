import { shallow } from 'enzyme';

import Errors from './errors';

describe('Errors', () => {
  it('should return null with no errors', () => {
    expect(Errors({})).toBeNull();
  });

  describe('error present', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(Errors({ test: 'error' }));
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should return error wrapper', () => {
      const container = wrapper.find('.form__errors');
      expect(container.length).toBe(1);
    });
  });
});
