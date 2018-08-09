import React from 'react';
import { shallow } from 'enzyme';

import Selection from './selection';

describe('Analysis selection panel component', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Selection
        arrangeSelected={jest.fn()}
        canPasteContext={false}
        closeContextMenu={jest.fn()}
        columnRef={{}}
        columns={[]}
        columnsSelected={[]}
        contextPos={{ left: 0, top: 0 }}
        copyAll={jest.fn()}
        copySelected={jest.fn()}
        listSelect={jest.fn()}
        listSwap={jest.fn()}
        openContextMenu={jest.fn()}
        paste={jest.fn()}
        pasteText=""
        rowRef={{}}
        rows={[]}
        rowsSelected={[]}
        showContext={false}
        showModal={false}
        toggleModal={jest.fn()}
        updatePasteList={jest.fn()}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
