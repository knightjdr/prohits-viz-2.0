import React from 'react';
import { shallow } from 'enzyme';

import KnownCriterion from './known-criterion';

jest.mock('../../field/default-change');

describe('Known criterion', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <KnownCriterion
        dataSource={[]}
        disableSpecies={false}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
