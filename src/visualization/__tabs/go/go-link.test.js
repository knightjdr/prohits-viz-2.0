import { shallow } from 'enzyme';

import goLink, { links } from './go-link';

describe('Links for ontology terms', () => {
  describe('', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(goLink('aaaaaaaaaa', 'go'));
    });

    it('should add appropiate link to href attribute', () => {
      expect(wrapper.props().href).toBe(`${links.go}aaaaaaaaaa`);
    });

    it('should add id as txt', () => {
      expect(wrapper.text()).toBe('aaaaaaaaaa');
    });
  });

  it('should set link for corum ID', () => {
    const wrapper = shallow(goLink('aaaaaaaaaa', 'cor'));
    expect(wrapper.props().href).toBe(`${links.cor}aaaa`);
  });

  it('should set link for hp ID', () => {
    const wrapper = shallow(goLink('aaaaaaaaaa', 'hp'));
    expect(wrapper.props().href).toBe(`${links.hp}aaaaaaaaaa`);
  });

  it('should set link for keg ID', () => {
    const wrapper = shallow(goLink('aaaaaaaaaa', 'keg'));
    expect(wrapper.props().href).toBe(`${links.keg}aaaaa`);
  });

  it('should set link for mi ID', () => {
    const wrapper = shallow(goLink('aaaaaaaaaa', 'mi'));
    expect(wrapper.props().href).toBe(`${links.mi}aaaaaaa`);
  });

  it('should set link for rea ID', () => {
    const wrapper = shallow(goLink('aaaaaaaaaa', 'rea'));
    expect(wrapper.props().href).toBe(`${links.rea}aaaaa`);
  });
});
