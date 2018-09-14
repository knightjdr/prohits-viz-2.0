import React from 'react';
import { shallow, mount } from 'enzyme';

import download from '../../../../helpers/download';
import onResizeHelper from '../../../../helpers/on-resize';
import Status from './heatmap-svg__status-container';

jest.mock('../../../../helpers/download');
jest.mock('../../../../helpers/on-resize');

beforeEach(() => {
  download.mockClear();
});

describe('Status bar container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Status
        canTranslate
        display={{
          selectionBox: false,
          tooltips: false,
        }}
        name="testName"
        fixLeft={false}
        reset={jest.fn()}
        showSelectionToggle
        toggleSelection={jest.fn()}
        toggleTips={jest.fn()}
        translate={jest.fn()}
        width={500}
      />,
    );
  });

  it('should set initial position', () => {
    expect(wrapper.state('elPosition')).toEqual({ right: 243, top: 115 });
  });

  it('should set position via component method', () => {
    const position = wrapper.instance().setPosition(500);
    expect(position).toEqual({ right: 243, top: 115 });
  });

  describe('on calling on resize method', () => {
    beforeAll(() => {
      onResizeHelper.mockClear();
      wrapper.instance().onResize();
    });

    it('should set view state to false', () => {
      expect(wrapper.state('show')).toBeFalsy();
    });

    it('should call resize module', () => {
      expect(onResizeHelper).toHaveBeenCalled();
    });
  });

  it('should call download module via component method', () => {
    Object.defineProperty(document, 'getElementById', {
      value: () => ({ outerHTML: 'svg' }),
    });
    wrapper.instance().download();
    expect(download).toHaveBeenCalledWith('svg', 'testName-currentView.svg', 'image/svg+xml');
  });

  describe('on ending window resize', () => {
    beforeAll(() => {
      wrapper.setProps({ width: 700 });
      wrapper.instance().resizeEnd();
    });

    it('should set element postion on resize end', () => {
      expect(wrapper.state('elPosition')).toEqual({ right: 143, top: 115 });
    });

    it('should be visible', () => {
      expect(wrapper.state('show')).toBeTruthy();
    });
  });

  it('should toggle menu state via component method', () => {
    wrapper.setState({ expand: false });
    wrapper.instance().toggleMenu();
    expect(wrapper.state('expand')).toBeTruthy();
  });

  describe('updating element position', () => {
    beforeAll(() => {
      wrapper.setProps({ width: 700 });
    });

    it('should not update when the width does not change', () => {
      wrapper.instance().updateElPosition({ width: 500 }, 500);
      expect(wrapper.state('elPosition')).toEqual({ right: 143, top: 115 });
    });

    it('should update when the width does change', () => {
      wrapper.instance().updateElPosition({ width: 600 }, 700);
      expect(wrapper.state('elPosition')).toEqual({ right: 193, top: 115 });
    });
  });

  describe('when props update', () => {
    let spy;
    beforeAll(() => {
      wrapper.setProps({ width: 500 });
      spy = jest.spyOn(wrapper.instance(), 'updateElPosition');
      wrapper.update();
    });

    afterAll(() => {
      spy.mockRestore();
    });

    it('should call update element position', () => {
      wrapper.setProps({ width: 700 });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('on mounting', () => {
    let onResizeFn;
    let spyAdd;
    let spyRemove;

    beforeAll(() => {
      wrapper = mount(
        <Status
          canTranslate
          display={{
            selectionBox: false,
            tooltips: false,
          }}
          name="testName"
          fixLeft={false}
          reset={jest.fn()}
          showSelectionToggle
          toggleSelection={jest.fn()}
          toggleTips={jest.fn()}
          translate={jest.fn()}
          width={500}
        />,
      );
      onResizeFn = wrapper.instance().onResize;
      wrapper.instance().onResize = jest.fn();
      spyAdd = jest.spyOn(window, 'addEventListener');
      spyRemove = jest.spyOn(window, 'removeEventListener');
      wrapper.update();
      wrapper.unmount();
      wrapper.mount();
    });

    afterAll(() => {
      spyAdd.mockRestore();
      spyRemove.mockRestore();
      wrapper.instance().onResize = onResizeFn;
    });

    it('should add resize event listener', () => {
      expect(spyAdd).toHaveBeenCalledWith('resize', wrapper.instance().onResize);
    });

    it('should remove resize event listener', () => {
      const { onResize } = wrapper.instance();
      wrapper.unmount();
      expect(spyRemove).toHaveBeenCalledWith('resize', onResize);
    });
  });
});
