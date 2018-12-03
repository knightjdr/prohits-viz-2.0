import React from 'react';
import { shallow } from 'enzyme';

import InfoPanel from './panel__info';

const downloadLegend = jest.fn();

describe('Info panel', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <InfoPanel
        downloadLegend={downloadLegend}
        loadNewFile={jest.fn()}
        params={{ name: 'test' }}
        segments={[]}
        settings={{}}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call download legend function when button clicked', () => {
    downloadLegend.mockClear();
    wrapper.find('RoundButton').simulate('click');
    expect(downloadLegend).toHaveBeenCalledTimes(1);
  });
});
