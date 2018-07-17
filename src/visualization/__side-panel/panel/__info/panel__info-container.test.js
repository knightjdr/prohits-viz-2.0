import React from 'react';
import { shallow } from 'enzyme';

import ColorGradient from '../../../color/color-gradient';
import Download from '../../download/download';
import { InfoContainer } from './panel__info-container';

jest.mock('../../../color/color-gradient');
jest.mock('../../download/download');

const params = {
  abundanceCap: 50,
  edgeColor: 'redBlack',
  fillColor: 'blueBlack',
  imageType: 'dotplot',
  invertColor: false,
  minAbundance: 0,
  params: {
    abundanceColumn: 'Abundance',
    scoreColumn: 'Score',
    scoreType: 'lte',
  },
  primaryFilter: 0.01,
  secondaryFilter: 0.05,
};

describe('Info panel container', () => {
  it('should transfer props to state object called legend', () => {
    const wrapper = shallow(
      <InfoContainer {...params} />,
    );

    // Calls color gradient with edge and fill props.
    expect(ColorGradient).toHaveBeenCalledTimes(2);
    expect(ColorGradient).toHaveBeenCalledWith('redBlack', 101, false);
    expect(ColorGradient).toHaveBeenCalledWith('blueBlack', 101, false);

    // Legend state object
    expect(wrapper.state('legend')).toEqual({
      abundanceName: 'Abundance',
      gradientEdge: undefined,
      gradientFill: undefined,
      abundanceCap: 50,
      minAbundance: 0,
      primaryFilter: 0.01,
      scoreName: 'Score',
      scoreType: 'lte',
      secondaryFilter: 0.05,
      imageType: 'dotplot',
    });
  });

  it('downloadLegend method should trigger download function', () => {
    const wrapper = shallow(
      <InfoContainer {...params} />,
    );

    // Mock document method.
    const { getElementById } = document;
    Object.defineProperty(document, 'getElementById', {
      value: () => ({ outerHTML: <svg /> }),
      writable: true,
    });

    // Test click.
    wrapper.instance().downloadLegend();
    expect(Download).toHaveBeenCalledWith(<svg />, 'legend.svg', 'image/svg+xml');

    // Restore document method;
    Object.defineProperty(document, 'getElementById', {
      value: getElementById,
    });
  });
});
