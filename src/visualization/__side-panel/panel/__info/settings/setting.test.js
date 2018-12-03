import React from 'react';
import { shallow } from 'enzyme';

import convertCamel from '../../../../../helpers/convert-camel';
import Setting from './setting';

jest.mock('../../../../../helpers/convert-camel');
convertCamel.mockReturnValue('field');

describe('Setting', () => {
  let wrapper;

  beforeAll(() => {
    convertCamel.mockClear();
    wrapper = shallow(
      <Setting
        field="field"
        value="value"
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should convert field from camel case', () => {
    expect(convertCamel).toHaveBeenCalledWith('field');
  });
});

