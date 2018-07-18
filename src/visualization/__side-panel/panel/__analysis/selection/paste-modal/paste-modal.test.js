import React from 'react';
import { shallow } from 'enzyme';

import PasteModal from './paste-modal';

const cancel = jest.fn();
const paste = jest.fn();
const updatePasteList = jest.fn();

describe('Paste modal', () => {
  beforeEach(() => {
    /* Clear call count */
    cancel.mockClear();
    paste.mockClear();
    updatePasteList.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <PasteModal
        cancel={cancel}
        paste={paste}
        pasteText=""
        updatePasteList={updatePasteList}
        visible
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call cancel prop on modal cancel', () => {
    const wrapper = shallow(
      <PasteModal
        cancel={cancel}
        paste={paste}
        pasteText=""
        updatePasteList={updatePasteList}
        visible
      />,
    );
    wrapper.find('Modal').prop('onCancel')();
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it('should call paste prop on modal ok', () => {
    const wrapper = shallow(
      <PasteModal
        cancel={cancel}
        paste={paste}
        pasteText=""
        updatePasteList={updatePasteList}
        visible
      />,
    );
    wrapper.find('Modal').prop('onOk')();
    expect(paste).toHaveBeenCalledTimes(1);
  });

  it('should call update prop on textarea change', () => {
    const wrapper = shallow(
      <PasteModal
        cancel={cancel}
        paste={paste}
        pasteText=""
        updatePasteList={updatePasteList}
        visible
      />,
    );
    wrapper.find('TextArea').simulate('change');
    expect(updatePasteList).toHaveBeenCalledTimes(1);
  });
});
