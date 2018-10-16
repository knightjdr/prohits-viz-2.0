import React from 'react';
import { shallow } from 'enzyme';

import colorGradient from '../../../color/color-gradient';
import download from '../../../../helpers/download';
import { InfoContainer } from './panel__info-container';

jest.mock('../../../color/color-gradient');
jest.mock('../../../../helpers/download');

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

const clearFile = jest.fn();
const history = {
  replace: jest.fn(),
};

describe('Info panel container', () => {
  it('should transfer props to state object called legend', () => {
    const wrapper = shallow(
      <InfoContainer
        {...params}
        clearFile={clearFile}
        history={history}
      />,
    );

    // Calls color gradient with edge and fill props.
    expect(colorGradient).toHaveBeenCalledTimes(2);
    expect(colorGradient).toHaveBeenCalledWith('redBlack', 101, false);
    expect(colorGradient).toHaveBeenCalledWith('blueBlack', 101, false);

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

  it('should trigger download function via downloadLegend method ', () => {
    const wrapper = shallow(
      <InfoContainer
        {...params}
        clearFile={clearFile}
        history={history}
      />,
    );

    // Mock document method.
    const { getElementById } = document;
    Object.defineProperty(document, 'getElementById', {
      value: () => ({ outerHTML: <svg /> }),
      writable: true,
    });

    // Test click.
    wrapper.instance().downloadLegend();
    expect(download).toHaveBeenCalledWith(<svg />, 'legend.svg', 'image/svg+xml');

    // Restore document method;
    Object.defineProperty(document, 'getElementById', {
      value: getElementById,
    });
  });

  it('should trigger load file prop on load new file method call', () => {
    const wrapper = shallow(
      <InfoContainer
        {...params}
        clearFile={clearFile}
        history={history}
      />,
    );
    clearFile.mockClear();

    // Test click.
    wrapper.instance().loadNewFile();
    expect(clearFile).toHaveBeenCalled();
  });
});
