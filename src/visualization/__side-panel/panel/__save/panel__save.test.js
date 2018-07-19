import React from 'react';
import { shallow } from 'enzyme';

import Save from './panel__save';

describe('Save component', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Save
        archive={jest.fn()}
        changePage={jest.fn()}
        deleteSession={jest.fn()}
        handleImageType={jest.fn()}
        imageType="svg"
        openSession={jest.fn()}
        saveImage={jest.fn()}
        saveSessionBrowser={jest.fn()}
        saveSessionFile={jest.fn()}
        saveSessionName={jest.fn()}
        sessionItemsTotal={5}
        sessionName=""
        sessions={[]}
        sessionsPage={1}
        storageSupport
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
