import React from 'react';
import { shallow } from 'enzyme';

import ConvertIsoDate from '../helpers/convert-iso-date';
import FetchHome from '../state/get/home-actions';
import { HomeContainer } from './home-container';

// mock ConvertIsoDate
jest.mock('../helpers/convert-iso-date');
ConvertIsoDate.mockReturnValue('date');

// mock fetch
jest.mock('../state/get/home-actions');
FetchHome.mockReturnValue();

describe('HomeContainer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Fetch home is called on mount', () => {
    shallow(
      <HomeContainer
        fetchHome={FetchHome}
        isLoaded={false}
      />,
    );
    expect(FetchHome).toHaveBeenCalledTimes(1);
  });

  test('Fetch home not called on mount when content has already been fetched', () => {
    shallow(
      <HomeContainer
        fetchHome={FetchHome}
        isLoaded
      />,
    );
    expect(FetchHome).toHaveBeenCalledTimes(0);
  });
});
