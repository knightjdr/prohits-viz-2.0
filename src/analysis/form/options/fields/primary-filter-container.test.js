import React from 'react';
import { shallow } from 'enzyme';

import defaultScore from './field-funcs/default-primary-filter';
import PrimaryFilterContainer from './primary-filter-container';

jest.mock('./field-funcs/default-primary-filter');
defaultScore.mockReturnValue(0.01);

const change = jest.fn();

describe('PrimaryFilterContainer', () => {
  describe('props change', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <PrimaryFilterContainer
          analysisType="dotplot"
          change={change}
          fileType="saint"
          score="bfdr"
        />,
      );
    });

    it('should update filter in form when fileType changes', () => {
      change.mockClear();
      wrapper.setProps({ fileType: 'crapome' });
      expect(change).toHaveBeenCalledWith('primaryFilter', 0.01);
    });

    it('should update filter in form when score changes', () => {
      change.mockClear();
      wrapper.setProps({ score: 'avgp' });
      expect(change).toHaveBeenCalledWith('primaryFilter', 0.01);
    });
  });

  describe('props do not change', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <PrimaryFilterContainer
          analysisType="dotplot"
          change={change}
          fileType="saint"
          score="bfdr"
        />,
      );
    });

    it('should not update filter in form when fileType and score do not hange', () => {
      change.mockClear();
      wrapper.setProps({ fileType: 'saint', score: 'bfdr' });
      expect(change).toHaveBeenCalledTimes(0);
    });
  });
});
