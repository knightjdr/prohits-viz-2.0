import React from 'react';
import { shallow } from 'enzyme';

import renderDims from '../../__heatmap/svg/heatmap-svg-container';
import renderSvg from './tab-customize__svg-interface';
import TabCustomize from './tab-customize';

jest.mock('./tab-customize__svg-interface');
jest.mock('../../__heatmap/svg/heatmap-svg-container');
jest.mock('./tab-customize__store-connection');

describe('Customize tab', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <TabCustomize
        renderDims={renderDims}
        renderSvg={renderSvg}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
