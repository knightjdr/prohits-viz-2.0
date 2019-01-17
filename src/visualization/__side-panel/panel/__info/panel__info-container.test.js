import React from 'react';
import { shallow } from 'enzyme';

import download from '../../../../helpers/download';
import { InfoContainer } from './panel__info-container';

jest.mock('../../../../helpers/download');

const clearCurrentFile = jest.fn();
const history = {
  replace: jest.fn(),
};

describe('Info panel container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <InfoContainer
        clearCurrentFile={clearCurrentFile}
        history={history}
        params={{}}
        plot={{ segments: [] }}
        circHeatmapSettings={[]}
        settings={{}}
      />,
    );
  });

  it('should trigger download function via downloadLegend method ', () => {
    download.mockClear();
    // Mock document method.
    const { getElementById } = document;
    Object.defineProperty(document, 'getElementById', {
      value: () => ({ outerHTML: <svg /> }),
      writable: true,
    });

    // Test click.
    wrapper.props().downloadLegend();
    expect(download).toHaveBeenCalledWith(<svg />, 'legend.svg', 'image/svg+xml');

    // Restore document method;
    Object.defineProperty(document, 'getElementById', {
      value: getElementById,
    });
  });

  describe('load new file', () => {
    beforeAll(() => {
      clearCurrentFile.mockClear();
      history.replace.mockClear();
      wrapper.props().loadNewFile();
    });

    it('should call history replace', () => {
      expect(history.replace).toHaveBeenCalled();
    });

    it('should clear current file', () => {
      expect(clearCurrentFile).toHaveBeenCalled();
    });
  });
});
