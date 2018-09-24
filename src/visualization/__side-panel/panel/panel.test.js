import { shallow } from 'enzyme';

import Panel from './panel';

jest.mock('./__analysis/panel__analysis');
jest.mock('./__annotation/panel__annotation-container');
jest.mock('./__info/panel__info-container');
jest.mock('./__map/panel__map-container');
jest.mock('./__map/panel__map');
jest.mock('./__save/panel__save-container');
jest.mock('./__settings/panel__settings-container');
jest.mock('../../browser-storage/indexeddb-container');

describe('Panel', () => {
  it('with analysis option should match analysis component', () => {
    const wrapper = shallow(Panel.analysis);
    expect(wrapper.find('.analysis').length).toBe(1);
  });

  it('with annotation option should match annotation component', () => {
    const wrapper = shallow(Panel.annotation);
    expect(wrapper.find('.annotation').length).toBe(1);
  });

  it('with info option should match info component', () => {
    const wrapper = shallow(Panel.info);
    expect(wrapper.find('.info').length).toBe(1);
  });

  it('with map option should match map component', () => {
    const wrapper = shallow(Panel.map);
    expect(wrapper.find('.map-container').length).toBe(1);
  });

  it('with save option should match save component', () => {
    const wrapper = shallow(Panel.save);
    expect(wrapper.find('.indexeddb-container').length).toBe(1);
  });

  it('with settings option should match settings component', () => {
    const wrapper = shallow(Panel.settings);
    expect(wrapper.find('.settings').length).toBe(1);
  });
});
