import React from 'react';
import { shallow } from 'enzyme';

import defaultScore from './field-funcs/default-secondary-filter';
import SecondaryFilterContainer from './secondary-filter-container';

jest.mock('./field-funcs/default-secondary-filter');
defaultScore.mockReturnValue(0.05);

const change = jest.fn();

describe('SecondaryFilterContainer', () => {
  describe('props change', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <SecondaryFilterContainer
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
      expect(change).toHaveBeenCalledWith('secondaryFilter', 0.05);
    });

    it('should update filter in form when score changes', () => {
      change.mockClear();
      wrapper.setProps({ score: 'avgp' });
      expect(change).toHaveBeenCalledWith('secondaryFilter', 0.05);
    });
  });

  describe('props do not change', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <SecondaryFilterContainer
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
