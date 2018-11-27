import React from 'react';
import { shallow } from 'enzyme';

import renderDims from '../../__heatmap/svg/heatmap-svg-container';
import renderSvg from './tab-main__svg-interface';
import TabMain from './tab-main';

jest.mock('./tab-main__svg-interface');
jest.mock('../../__heatmap/svg/heatmap-svg-container');
jest.mock('./tab-main__store-connection');

describe('Main tab', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <TabMain
        renderDims={renderDims}
        renderSvg={renderSvg}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
