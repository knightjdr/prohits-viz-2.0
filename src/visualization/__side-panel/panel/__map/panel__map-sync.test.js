import React from 'react';
import { shallow } from 'enzyme';

import Sync from './panel__map-sync';

const syncMap = jest.fn();

describe('Synchroniztion status component', () => {
  describe('should render when syncing', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Sync
          minimap="image"
          isSyncing
          syncError={false}
          syncMap={syncMap}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and display loading icon', () => {
      expect(wrapper.text()).toMatch(/Syncing/);
    });

    it('and not display button', () => {
      expect(wrapper.find('Button').length).toBe(0);
    });
  });

  describe('should render when not synching', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Sync
          minimap="image"
          isSyncing={false}
          syncError={false}
          syncMap={syncMap}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and display button', () => {
      expect(wrapper.find('Button').length).toBe(1);
    });

    it('and not display loading icon', () => {
      expect(wrapper.text()).not.toMatch(/Syncing/);
    });

    it('an dshould call prop method syncMap on click', () => {
      wrapper.find('Button').simulate('click');
      expect(syncMap).toHaveBeenCalledTimes(1);
    });
  });

  describe('should render with error', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Sync
          minimap="image"
          isSyncing={false}
          syncError
          syncMap={syncMap}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and display error message', () => {
      expect(wrapper.find('.panel__map-sync_error').length).toBe(1);
    });
  });

  describe('should render correct text when minimap exists', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Sync
          minimap="image"
          isSyncing={false}
          syncError
          syncMap={syncMap}
        />,
      );
    });

    it('with button text', () => {
      expect(wrapper.find('Button').props().children).toBe('Sync now');
    });

    it('with error', () => {
      expect(wrapper.text()).toMatch(/There was an error synchronizing/);
    });

    it('with warning', () => {
      expect(wrapper.text()).toMatch(/Map not in sync/);
    });
  });

  describe('should render correct text when minimap does not exist', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Sync
          minimap={null}
          isSyncing={false}
          syncError
          syncMap={syncMap}
        />,
      );
    });

    it('with button text', () => {
      expect(wrapper.find('Button').props().children).toBe('Generate now');
    });

    it('with error', () => {
      expect(wrapper.text()).toMatch(/There was an error generating/);
    });

    it('with warning', () => {
      expect(wrapper.text()).toMatch(/No minimap/);
    });
  });
});
