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
    expect(formatRows).toHaveBeenCalledWith({ terms: [] });
  });

  describe('prop change', () => {
    let spy;

    afterAll(() => {
      spy.mockRestore();
    });

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'updateResults');
      wrapper.update();
      wrapper.setProps({});
    });

    it('should call updateResults', () => {
      expect(spy).toHaveBeenCalled();
    });
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

  describe('update results', () => {
    it('should not call format rows when task still running', () => {
      formatRows.mockClear();
      const nextGo = {
        isRunning: true,
        results: {},
      };
      const prevGo = {
        isRunning: true,
        results: {},
      };
      wrapper.instance().updateResults(nextGo, prevGo);
      expect(formatRows).not.toHaveBeenCalled();
    });

    it('should not call format rows when task is not running but neither was prev state running', () => {
      formatRows.mockClear();
      const nextGo = {
        isRunning: false,
        results: {},
      };
      const prevGo = {
        isRunning: false,
        results: {},
      };
      wrapper.instance().updateResults(nextGo, prevGo);
      expect(formatRows).not.toHaveBeenCalled();
    });

    it('should call format rows when task is not running but prev state was', () => {
      formatRows.mockClear();
      const nextGo = {
        isRunning: false,
        results: {},
      };
      const prevGo = {
        isRunning: true,
        results: {},
      };
      wrapper.instance().updateResults(nextGo, prevGo);
      expect(formatRows).toHaveBeenCalled();
    });
  });
});
