import React from 'react';
import { shallow } from 'enzyme';

import Annotation from './heatmap-svg__annotation';

jest.mock('nanoid');

const handleMouseDown = jest.fn();
const handleMouseMove = jest.fn();
const handleMouseUp = jest.fn();

describe('Annotation', () => {
  describe('without annotations or markers', () => {
    describe('and not dragging', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <Annotation
            annotations={[]}
            cursor="default"
            dragging={false}
            fontSize={12}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
            height={100}
            markerColor="#000"
            markers={[]}
            setRef={{ ref: 'test' }}
            showAnnotations={false}
            showMarkers={false}
            width={200}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should set height of clipath', () => {
        expect(wrapper.find('clipPath').find('rect').props().height).toBe(102);
      });

      it('should set width of clipath', () => {
        expect(wrapper.find('clipPath').find('rect').props().width).toBe(202);
      });

      it('should set cursor on g element', () => {
        expect(wrapper.find('g').props().style.cursor).toBe('default');
      });

      describe('main rect element', () => {
        let rect;

        beforeAll(() => {
          rect = wrapper.find('g').find('rect');
        });

        it('should set cursor', () => {
          expect(rect.props().cursor).toBe('default');
        });

        it('should set height', () => {
          expect(rect.props().height).toBe(100);
        });

        it('should set width', () => {
          expect(rect.props().width).toBe(200);
        });

        it('should set pointer events', () => {
          expect(rect.props().pointerEvents).toBe('none');
        });

        it('should handle mouse move', () => {
          handleMouseMove.mockClear();
          rect.simulate('mousemove');
          expect(handleMouseMove).toHaveBeenCalled();
        });

        it('should handle mouse up', () => {
          handleMouseUp.mockClear();
          rect.simulate('mouseup');
          expect(handleMouseUp).toHaveBeenCalled();
        });
      });
    });

    describe('and dragging', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <Annotation
            annotations={[]}
            cursor="default"
            dragging
            fontSize={12}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
            height={100}
            markerColor="#000"
            markers={[]}
            setRef={{ ref: 'test' }}
            showAnnotations={false}
            showMarkers={false}
            width={200}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      describe('main rect element', () => {
        let rect;

        beforeAll(() => {
          rect = wrapper.find('g').find('rect');
        });

        it('should set pointer events', () => {
          expect(rect.props().pointerEvents).toBe('auto');
        });
      });
    });
  });

  describe('with annotations or markers', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Annotation
          annotations={[{ text: 'a', x: 0, y: 0.2 }]}
          cursor="default"
          dragging={false}
          fontSize={12}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          height={100}
          markerColor="#000"
          markers={[
            {
              height: 5,
              width: 6,
              x: 0,
              y: 5,
            },
          ]}
          setRef={{ ref: 'test' }}
          showAnnotations
          showMarkers
          width={200}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should add marker element', () => {
      expect(wrapper.find('rect').length).toBe(3);
    });

    it('should add annotation element', () => {
      expect(wrapper.find('text').length).toBe(1);
    });

    describe('markers', () => {
      let rect;

      beforeAll(() => {
        rect = wrapper.find('g').find('rect').at(1);
      });

      it('should set height', () => {
        expect(rect.props().height).toBe(5);
      });

      it('should set stroke', () => {
        expect(rect.props().stroke).toBe('#000');
      });

      it('should set x', () => {
        expect(rect.props().x).toBe(0);
      });

      it('should set y', () => {
        expect(rect.props().y).toBe(5);
      });

      it('should set width', () => {
        expect(rect.props().width).toBe(6);
      });
    });

    describe('annotations', () => {
      let text;

      beforeAll(() => {
        text = wrapper.find('text');
      });

      it('should set font size', () => {
        expect(text.props().fontSize).toBe(12);
      });

      it('should set text', () => {
        expect(text.text()).toBe('a');
      });

      it('should set x', () => {
        expect(text.props().x).toBe(0);
      });

      it('should set y', () => {
        expect(text.props().y).toBe(0.2);
      });

      it('should handle mouse down', () => {
        handleMouseDown.mockClear();
        text.simulate('mousedown');
        expect(handleMouseDown).toHaveBeenCalled();
      });

      it('should handle mouse move', () => {
        handleMouseMove.mockClear();
        text.simulate('mousemove');
        expect(handleMouseMove).toHaveBeenCalled();
      });

      it('should handle mouse up', () => {
        handleMouseUp.mockClear();
        text.simulate('mouseup');
        expect(handleMouseUp).toHaveBeenCalled();
      });
    });
  });
});
