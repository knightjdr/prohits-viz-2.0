import React from 'react';
import { shallow } from 'enzyme';
import { TreeRoutesComponent } from './tree-routes';

import RoutesFromPath from '../../helpers/routes-from-path';

// mock RoutesFromPath
jest.mock('../../helpers/routes-from-path');
RoutesFromPath.mockReturnValue(['help']);

describe('TreeRoutes', () => {
  test('It renders', () => {
    const wrapper = shallow(
      <TreeRoutesComponent
        location={{
          path: '/help',
        }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
