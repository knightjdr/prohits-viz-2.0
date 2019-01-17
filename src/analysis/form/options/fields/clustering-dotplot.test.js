import React from 'react';
import { shallow } from 'enzyme';

import ClusteringDotplot from './clustering-dotplot';

describe('ClusteringDotplot', () => {
  describe('biclustering', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ClusteringDotplot
          analysisType="dotplot"
          conditionClustering={undefined}
          clustering="biclustering"
          readoutClustering={undefined}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display biclustering checkbox', () => {
      expect(wrapper.find('.form__option-clustering-biclustering-checkbox').length).toBe(1);
    });

    it('should not display hierarchical', () => {
      expect(wrapper.find('.form__option-clustering-hierarchical').length).toBe(0);
    });

    it('should not display no-clustreing', () => {
      expect(wrapper.find('.form__option-clustering-none').length).toBe(0);
    });
  });

  describe('hierarchical', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ClusteringDotplot
          analysisType="dotplot"
          conditionClustering={undefined}
          clustering="hierarchical"
          readoutClustering={undefined}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not display biclustering checkbox', () => {
      expect(wrapper.find('.form__option-clustering-biclustering-checkbox').length).toBe(0);
    });

    it('should display hierarchical', () => {
      expect(wrapper.find('.form__option-clustering-hierarchical').length).toBe(1);
    });

    it('should not display no-clustreing', () => {
      expect(wrapper.find('.form__option-clustering-none').length).toBe(0);
    });
  });

  describe('no clustreing', () => {
    describe('require conditions and readouts', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <ClusteringDotplot
            analysisType="dotplot"
            conditionClustering="none"
            clustering="none"
            readoutClustering="none"
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should not display biclustering checkbox', () => {
        expect(wrapper.find('.form__option-clustering-biclustering-checkbox').length).toBe(0);
      });

      it('should display hierarchical', () => {
        expect(wrapper.find('.form__option-clustering-hierarchical').length).toBe(0);
      });

      it('should not display no-clustreing', () => {
        expect(wrapper.find('.form__option-clustering-none').length).toBe(1);
      });

      it('should show conditions element', () => {
        expect(wrapper.find({ label: 'Conditions' }).length).toEqual(1);
      });

      it('should show readouts element', () => {
        expect(wrapper.find({ label: 'Readouts' }).length).toEqual(1);
      });
    });

    describe('require only conditions', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <ClusteringDotplot
            analysisType="dotplot"
            conditionClustering="none"
            clustering="none"
            readoutClustering="readouts"
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should show conditions element', () => {
        expect(wrapper.find({ label: 'Conditions' }).length).toEqual(1);
      });

      it('should show readouts element', () => {
        expect(wrapper.find({ label: 'Readouts' }).length).toEqual(0);
      });
    });

    describe('require only readouts', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <ClusteringDotplot
            analysisType="dotplot"
            conditionClustering="conditions"
            clustering="none"
            readoutClustering="none"
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should show conditions element', () => {
        expect(wrapper.find({ label: 'Conditions' }).length).toEqual(0);
      });

      it('should show readouts element', () => {
        expect(wrapper.find({ label: 'Readouts' }).length).toEqual(1);
      });
    });
  });
});
