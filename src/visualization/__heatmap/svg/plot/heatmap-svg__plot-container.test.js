import React from 'react';
import { shallow } from 'enzyme';

import colorGradient from '../../../color/color-gradient';
import getPage from './transforms/get-page';
import setEdgeRange from './transforms/set-edge-range';
import setRange from '../../../../helpers/set-range';
import { PlotContainer } from './heatmap-svg__plot-container';

jest.mock('../../../color/color-gradient');
colorGradient.mockReturnValue(['#000', '#888', '#fff']);
/* The mock for set edge range will return 0 for numbers less than 1,
** 1 for numbers 1 < and <= 5 and 2 otherwise. */
jest.mock('./transforms/set-edge-range');
/* The mock for set range will cap values at 50 and 0. */
jest.mock('../../../../helpers/set-range');
/* This mock will always return a function that returns predefined page array. */
jest.mock('./transforms/get-page');

const props = {
  abundanceCap: 50,
  cellSize: 10,
  dimensions: {
    pageX: 10,
    pageY: 10,
  },
  edgeColor: 'blueBlack',
  fillColor: 'blueBlack',
  imageType: 'heatmap',
  invertColor: false,
  minAbundance: 0,
  position: {
    x: 0,
    y: 0,
  },
  primaryFilter: 1,
  rows: [
    { data: [{ value: 1 }, { value: 2 }, { value: 3 }] },
    { data: [{ value: 4 }, { value: 5 }, { value: 6 }] },
    { data: [{ value: 7 }, { value: 8 }, { value: 9 }] },
    { data: [{ value: 2 }, { value: 3 }, { value: 4 }] },
    { data: [{ value: 5 }, { value: 6 }, { value: 7 }] },
    { data: [{ value: 8 }, { value: 9 }, { value: 9 }] },
    { data: [{ value: 3 }, { value: 4 }, { value: 5 }] },
    { data: [{ value: 6 }, { value: 7 }, { value: 8 }] },
    { data: [{ value: 9 }, { value: 9 }, { value: 9 }] },
    { data: [{ value: 4 }, { value: 5 }, { value: 6 }] },
  ],
  scoreType: 'lte',
  secondaryFilter: 5,
};

describe('Plot container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <PlotContainer
        {...props}
      />,
    );
  });

  describe('constructor', () => {
    it('should set gradients', () => {
      expect(colorGradient).toHaveBeenCalledTimes(2);
    });

    it('should set edge Range', () => {
      expect(setEdgeRange).toHaveBeenCalled();
    });

    it('should set fill Range', () => {
      expect(setRange).toHaveBeenCalled();
    });

    it('should set page method', () => {
      expect(getPage).toHaveBeenCalled();
    });
  });

  describe('recieving props', () => {
    let updateEdgeGradientSpy;
    let updateEdgeRangeSpy;
    let updateEdgeSizeSpy;
    let updateFillGradientSpy;
    let updateFillRangeSpy;
    let updateImageTypeSpy;
    let updatePageSpy;

    afterAll(() => {
      updateEdgeGradientSpy.mockRestore();
      updateEdgeRangeSpy.mockRestore();
      updateEdgeSizeSpy.mockRestore();
      updateFillGradientSpy.mockRestore();
      updateFillRangeSpy.mockRestore();
      updateImageTypeSpy.mockRestore();
      updatePageSpy.mockRestore();
      wrapper.update();
    });

    beforeAll(() => {
      updateEdgeGradientSpy = jest.spyOn(wrapper.instance(), 'updateEdgeGradient');
      updateEdgeRangeSpy = jest.spyOn(wrapper.instance(), 'updateEdgeRange');
      updateEdgeSizeSpy = jest.spyOn(wrapper.instance(), 'updateEdgeSize');
      updateFillGradientSpy = jest.spyOn(wrapper.instance(), 'updateFillGradient');
      updateFillRangeSpy = jest.spyOn(wrapper.instance(), 'updateFillRange');
      updateImageTypeSpy = jest.spyOn(wrapper.instance(), 'updateImageType');
      updatePageSpy = jest.spyOn(wrapper.instance(), 'updatePage');
      wrapper.update();
    });

    it('should update edge gradient', () => {
      updateEdgeGradientSpy.mockClear();
      wrapper.setProps(props);
      expect(updateEdgeGradientSpy).toHaveBeenCalled();
    });

    it('should update edge range', () => {
      updateEdgeRangeSpy.mockClear();
      wrapper.setProps(props);
      expect(updateEdgeRangeSpy).toHaveBeenCalled();
    });

    it('should update edge size', () => {
      updateEdgeSizeSpy.mockClear();
      wrapper.setProps(props);
      expect(updateEdgeSizeSpy).toHaveBeenCalled();
    });

    it('should update fill gradient', () => {
      updateFillGradientSpy.mockClear();
      wrapper.setProps(props);
      expect(updateFillGradientSpy).toHaveBeenCalled();
    });

    it('should update fill range', () => {
      updateFillRangeSpy.mockClear();
      wrapper.setProps(props);
      expect(updateFillRangeSpy).toHaveBeenCalled();
    });

    it('should update image type', () => {
      updateImageTypeSpy.mockClear();
      wrapper.setProps(props);
      expect(updateImageTypeSpy).toHaveBeenCalled();
    });

    it('should update page', () => {
      updatePageSpy.mockClear();
      wrapper.setProps(props);
      expect(updatePageSpy).toHaveBeenCalled();
    });
  });

  describe('component update', () => {
    it('should not update if props do not change', () => {
      wrapper.setProps(props);
      const nextProps = props;
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeFalsy();
    });

    it('should update if update ID changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        updateID: 1,
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if abundanceCap changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        abundanceCap: 25,
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if cellSize changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        cellSize: 20,
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if page X size changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        dimensions: {
          x: 20,
          y: 10,
        },
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if page Y size changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        dimensions: {
          x: 10,
          y: 20,
        },
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if edge color changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        edgeColor: 'redBlack',
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if fill color changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        fillColor: 'redBlack',
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if imageType changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        imageType: 'dotplot',
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if invertColor changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        invertColor: true,
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if minAbundance changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        minAbundance: 5,
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if x position changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        position: {
          x: 5,
          y: 0,
        },
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if y position changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        position: {
          x: 0,
          y: 5,
        },
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if primaryFilter changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        primaryFilter: 5,
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if secondaryFilter changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        secondaryFilter: 20,
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should update if sortID changes', () => {
      wrapper.setProps(props);
      const nextProps = {
        ...props,
        sortID: 1,
      };
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });
  });

  describe('Name of the group', () => {
    it('should set edge size to fixed value when cells >= 15px', () => {
      expect(wrapper.instance().setEdgeSize(15)).toBe(1.5);
    });

    it('should calculate edge size when cells < 15px', () => {
      expect(wrapper.instance().setEdgeSize(8)).toBe(0.8);
    });
  });

  describe('update edge size', () => {
    it('should not update edge size when cell size does not change', () => {
      wrapper.instance().updateEdgeSize({ cellSize: 10 }, 10);
      expect(wrapper.state('edgeSize')).toBe(1);
    });

    it('should update edge size when cell size does change', () => {
      wrapper.instance().updateEdgeSize({ cellSize: 15 }, 10);
      expect(wrapper.state('edgeSize')).toBe(1.5);
    });
  });

  describe('update', () => {
    let spy;

    afterAll(() => {
      spy.mockRestore();
      wrapper.update();
    });

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'getPage');
      wrapper.update();
    });

    describe('edge gradient', () => {
      it('should not update when edge color does not change', () => {
        colorGradient.mockClear();
        const nextProps = props;
        wrapper.instance().updateEdgeGradient(nextProps, 'blueBlack');
        expect(colorGradient).not.toHaveBeenCalled();
      });

      describe('when color changes', () => {
        beforeAll(() => {
          colorGradient.mockClear();
          spy.mockClear();
          const nextProps = {
            ...props,
            edgeColor: 'redBlack',
          };
          wrapper.instance().updateEdgeGradient(nextProps, 'blueBlack');
        });

        it('should get color gradient', () => {
          expect(colorGradient).toHaveBeenCalled();
        });

        it('should get new page', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
    });

    describe('edge range', () => {
      it('should not update when primary and secondary filters do not change', () => {
        setEdgeRange.mockClear();
        const nextProps = props;
        wrapper.instance().updateEdgeRange(nextProps, 1, 5);
        expect(setEdgeRange).not.toHaveBeenCalled();
      });

      describe('when primary filter changes', () => {
        beforeAll(() => {
          setEdgeRange.mockClear();
          spy.mockClear();
          const nextProps = {
            ...props,
            primaryFilter: '5',
          };
          wrapper.instance().updateEdgeRange(nextProps, 1, 5);
        });

        it('should set edge range', () => {
          expect(setEdgeRange).toHaveBeenCalled();
        });

        it('should get new page', () => {
          expect(spy).toHaveBeenCalled();
        });
      });

      describe('when secondary filter changes', () => {
        beforeAll(() => {
          setEdgeRange.mockClear();
          spy.mockClear();
          const nextProps = {
            ...props,
            secondaryFilter: '10',
          };
          wrapper.instance().updateEdgeRange(nextProps, 1, 5);
        });

        it('should set edge range', () => {
          expect(setEdgeRange).toHaveBeenCalled();
        });

        it('should get new page', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
    });

    describe('fill gradient', () => {
      it('should not update when fill and invert color do not change', () => {
        colorGradient.mockClear();
        const nextProps = props;
        wrapper.instance().updateFillGradient(nextProps, 'blueBlack', false);
        expect(colorGradient).not.toHaveBeenCalled();
      });

      describe('when color changes', () => {
        beforeAll(() => {
          colorGradient.mockClear();
          spy.mockClear();
          const nextProps = {
            ...props,
            fillColor: 'redBlack',
          };
          wrapper.instance().updateFillGradient(nextProps, 'blueBlack');
        });

        it('should get color gradient', () => {
          expect(colorGradient).toHaveBeenCalled();
        });

        it('should get new page', () => {
          expect(spy).toHaveBeenCalled();
        });
      });

      describe('when invert option changes', () => {
        beforeAll(() => {
          colorGradient.mockClear();
          spy.mockClear();
          const nextProps = {
            ...props,
            invertColor: true,
          };
          wrapper.instance().updateFillGradient(nextProps, 'blueBlack', false);
        });

        it('should get color gradient', () => {
          expect(colorGradient).toHaveBeenCalled();
        });

        it('should get new page', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
    });

    describe('fill range', () => {
      it('should not update when min and abundance caps do not change', () => {
        setRange.mockClear();
        const nextProps = props;
        wrapper.instance().updateFillRange(nextProps, 0, 50);
        expect(setRange).not.toHaveBeenCalled();
      });

      describe('when min abundance changes', () => {
        beforeAll(() => {
          setRange.mockClear();
          spy.mockClear();
          const nextProps = {
            ...props,
            minAbundance: 1,
          };
          wrapper.instance().updateFillRange(nextProps, 0, 50);
        });

        it('should set range', () => {
          expect(setRange).toHaveBeenCalled();
        });

        it('should get new page', () => {
          expect(spy).toHaveBeenCalled();
        });
      });

      describe('when abundance cap changes', () => {
        beforeAll(() => {
          setRange.mockClear();
          spy.mockClear();
          const nextProps = {
            ...props,
            abundanceCap: 25,
          };
          wrapper.instance().updateFillRange(nextProps, 0, 50);
        });

        it('should set range', () => {
          expect(setRange).toHaveBeenCalled();
        });

        it('should get new page', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
    });

    describe('page', () => {
      it('should not update when props do not change', () => {
        spy.mockClear();
        const nextProps = props;
        wrapper.instance().updatePage(
          nextProps,
          props.position,
          props.dimensions,
          undefined,
          undefined,
          10,
        );
        expect(spy).not.toHaveBeenCalled();
      });

      it('should update when update ID changes', () => {
        spy.mockClear();
        const nextProps = {
          ...props,
          updateID: 1,
        };
        wrapper.instance().updatePage(
          nextProps,
          props.position,
          props.dimensions,
          undefined,
          undefined,
          10,
        );
        expect(spy).toHaveBeenCalled();
      });

      it('should update when x position changes', () => {
        spy.mockClear();
        const nextProps = {
          ...props,
          position: {
            x: 1,
            y: 0,
          },
        };
        wrapper.instance().updatePage(
          nextProps,
          props.position,
          props.dimensions,
          undefined,
          undefined,
          10,
        );
        expect(spy).toHaveBeenCalled();
      });

      it('should update when y position changes', () => {
        spy.mockClear();
        const nextProps = {
          ...props,
          position: {
            x: 0,
            y: 1,
          },
        };
        wrapper.instance().updatePage(
          nextProps,
          props.position,
          props.dimensions,
          undefined,
          undefined,
          10,
        );
        expect(spy).toHaveBeenCalled();
      });

      it('should update when page x changes', () => {
        spy.mockClear();
        const nextProps = {
          ...props,
          dimensions: {
            pageX: 5,
            pageY: 10,
          },
        };
        wrapper.instance().updatePage(
          nextProps,
          props.position,
          props.dimensions,
          undefined,
          undefined,
          10,
        );
        expect(spy).toHaveBeenCalled();
      });

      it('should update when page y changes', () => {
        spy.mockClear();
        const nextProps = {
          ...props,
          dimensions: {
            pageX: 10,
            pageY: 5,
          },
        };
        wrapper.instance().updatePage(
          nextProps,
          props.position,
          props.dimensions,
          undefined,
          undefined,
          10,
        );
        expect(spy).toHaveBeenCalled();
      });

      it('should update when cell size changes', () => {
        spy.mockClear();
        const nextProps = {
          ...props,
          cellSize: 20,
        };
        wrapper.instance().updatePage(
          nextProps,
          props.position,
          props.dimensions,
          undefined,
          undefined,
          10,
        );
        expect(spy).toHaveBeenCalled();
      });

      it('should update when sort ID changes', () => {
        spy.mockClear();
        const nextProps = {
          ...props,
          sortID: 1,
        };
        wrapper.instance().updatePage(
          nextProps,
          props.position,
          props.dimensions,
          undefined,
          undefined,
          10,
        );
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('image type', () => {
      it('should not update when type does not change', () => {
        getPage.mockClear();
        const nextProps = props;
        wrapper.instance().updateImageType(nextProps, 'heatmap');
        expect(getPage).not.toHaveBeenCalled();
      });

      describe('when min abundance changes', () => {
        beforeAll(() => {
          getPage.mockClear();
          spy.mockClear();
          const nextProps = {
            ...props,
            imageType: 'dotplot',
          };
          wrapper.instance().updateImageType(nextProps, 'heatmap');
        });

        it('should get page function', () => {
          expect(getPage).toHaveBeenCalled();
        });
      });
    });
  });
});
