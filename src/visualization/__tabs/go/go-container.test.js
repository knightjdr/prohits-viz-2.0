import React from 'react';
import { shallow } from 'enzyme';

import convertToCsv from '../../../helpers/convert-to-csv';
import download from '../../../helpers/download';
import formatRows from './format-rows';
import { GoContainer } from './go-container';

jest.mock('../../../helpers/convert-to-csv');
jest.mock('../../../helpers/download');
jest.mock('./format-rows');
formatRows.mockReturnValue({});

describe('Go container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <GoContainer
        go={{
          didFail: false,
          isRunning: false,
          results: { terms: [] },
        }}
      />,
    );
  });

  it('should call format rows on mount', () => {
    expect(formatRows).toHaveBeenCalled();
  });

  describe('handling exports', () => {
    beforeAll(() => {
      wrapper.instance().handleExport();
    });

    it('should call convert csv', () => {
      expect(convertToCsv).toHaveBeenCalled();
    });

    it('should call download', () => {
      expect(download).toHaveBeenCalled();
    });
  });
});
