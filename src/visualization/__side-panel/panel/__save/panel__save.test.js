import React from 'react';
import { shallow } from 'enzyme';

import Save from './panel__save';

jest.mock('../../../browser-session/browser-session');

describe('Save component', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Save
        archive={jest.fn()}
        handleImageType={jest.fn()}
        imageType="svg"
        isSaving={false}
        saveError={false}
        saveImage={jest.fn()}
        saveSessionBrowser={jest.fn()}
        saveSessionFile={jest.fn()}
        saveSessionName={jest.fn()}
        sessionName=""
        storageSupport
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
