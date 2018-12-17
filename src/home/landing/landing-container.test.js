import React from 'react';
import { shallow } from 'enzyme';

import convertIsoDate from '../../helpers/convert-iso-date';
import FetchHome from '../../state/get/home-actions';
import { LandingContainer } from './landing-container';

// mock convertIsoDate
jest.mock('../../helpers/convert-iso-date');
convertIsoDate.mockReturnValue('date');

// mock fetch
jest.mock('../../state/get/home-actions');
FetchHome.mockReturnValue();

describe('HomeContainer', () => {
  beforeAll(() => {
    shallow(
      <LandingContainer
        fetchHome={FetchHome}
        isLoaded={false}
      />,
    );
  });

  it('should call fetchhome prop on mount', () => {
    expect(FetchHome).toHaveBeenCalledTimes(1);
  });
});
