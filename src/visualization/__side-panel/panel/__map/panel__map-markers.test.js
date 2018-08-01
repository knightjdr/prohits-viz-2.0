import React from 'react';
import ShortID from 'shortid';
import { shallow } from 'enzyme';

import Markers from './panel__map-markers';

jest.mock('shortid');
ShortID.mockReturnValueOnce('a')
  .mockReturnValueOnce('b')
  .mockReturnValueOnce('c')
  .mockReturnValueOnce('d');

const markers = {
  color: '#000000',
  list: [
    {
      height: 0.1,
      width: 0.1,
      x: 0.1,
      y: 0.1,
    },
    {
      height: 0.2,
      width: 0.3,
      x: 0.5,
      y: 0.5,
    },
  ],
};

describe('Map panel markers', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Markers markers={markers} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
