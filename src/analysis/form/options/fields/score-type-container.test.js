import React from 'react';
import { shallow } from 'enzyme';

import ScoreTypeContainer, { expectedScoreDir } from './score-type-container';

const change = jest.fn();

describe('ScoreTypeContainer', () => {
  describe('expectedScoreDir function', () => {
    it('should return assigned value when score type is known', () => {
      expect(expectedScoreDir('avgp')).toBe('gte');
    });

    it('should ignore score case', () => {
      expect(expectedScoreDir('AVGP')).toBe('gte');
    });

    it('should returns "lte" when score type is unknown', () => {
      expect(expectedScoreDir('test')).toBe('lte');
    });
  });

  describe('container', () => {
    let wrapper;

    beforeAll(() => {
      change.mockClear();
      wrapper = shallow(
        <ScoreTypeContainer
          analysisType="dotplot"
          change={change}
          score="bfdr"
          scoreType={undefined}
        />,
      );
    });

    it('should update store on mount', () => {
      expect(change).toHaveBeenCalledWith('scoreType', 'lte');
    });

    describe('setReduxFormState method', () => {
      it('should not update store when type is set', () => {
        change.mockClear();
        wrapper.instance().setReduxFormState(change, 'bfdr', 'lte');
        expect(change).not.toHaveBeenCalled();
      });

      it('should not update store when score column is not set', () => {
        change.mockClear();
        wrapper.instance().setReduxFormState(change, undefined, undefined);
        expect(change).not.toHaveBeenCalled();
      });

      it('should update store when type is not set', () => {
        change.mockClear();
        wrapper.instance().setReduxFormState(change, 'bfdr', undefined);
        expect(change).toHaveBeenCalledWith('scoreType', 'lte');
      });
    });

    describe('prop change', () => {
      it('should update store when score column changes via props', () => {
        wrapper.setProps({ score: 'bfdr' });
        change.mockClear();
        wrapper.setProps({ score: 'avgp' });
        expect(change).toHaveBeenCalledWith('scoreType', 'gte');
      });

      it('should not update store when score column does not change via props', () => {
        wrapper.setProps({ score: 'bfdr' });
        change.mockClear();
        wrapper.setProps({ score: 'bfdr' });
        expect(change).not.toHaveBeenCalled();
      });
    });
  });
});
