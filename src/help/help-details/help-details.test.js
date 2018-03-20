import React from 'react';
import { shallow } from 'enzyme';

import RoutesFromPath from '../../helpers/routes-from-path';
import { HelpDetails } from './help-details';

// mock HelpRoutes
jest.mock('../help-routes/help-routes');

// mock RoutesFromPath
jest.mock('../../helpers/routes-from-path');
RoutesFromPath.mockReturnValue(['help']);

describe('HelpDetails', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <HelpDetails
        location={{
          path: '/help',
        }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
