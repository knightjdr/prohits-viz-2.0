import React from 'react';
import { shallow } from 'enzyme';

import Options from './heatmap-svg__status-options';

const download = jest.fn();
const reset = jest.fn();
const toggleSelectionBox = jest.fn();
const toggleTooltips = jest.fn();
const translate = jest.fn();

afterEach(() => {
  download.mockClear();
  reset.mockClear();
  toggleSelectionBox.mockClear();
  toggleTooltips.mockClear();
  translate.mockClear();
});

describe('Status bar options', () => {
  describe('without optional props', () => {
    describe('and inactive tooltips', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <Options
            canTranslate={false}
            download={download}
            expand={false}
            fixLeft={false}
            reset={reset}
            selectionBoxActive={false}
            showSelectionToggle={false}
            toggleSelectionBox={toggleSelectionBox}
            toggleTooltips={toggleTooltips}
            tooltipsActive={false}
            translate={translate}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should have opacity of 0', () => {
        expect(wrapper.props().style.opacity).toBe(0);
      });

      it('should have scaleY of 0', () => {
        expect(wrapper.props().style.transform).toBe('scaleY(0)');
      });

      it('should have three buttons', () => {
        expect(wrapper.find('OptionButton').length).toBe(3);
      });

      it('should call reset method on click', () => {
        wrapper.find('OptionButton').at(0).simulate('click');
        expect(reset).toHaveBeenCalled();
      });

      it('should call download method on click', () => {
        wrapper.find('OptionButton').at(1).simulate('click');
        expect(download).toHaveBeenCalled();
      });

      it('should call toggle tooltips method on click', () => {
        wrapper.find('OptionButton').at(2).simulate('click');
        expect(toggleTooltips).toHaveBeenCalled();
      });
    });

    describe('and active tooltips', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <Options
            canTranslate={false}
            download={download}
            expand={false}
            fixLeft={false}
            reset={reset}
            selectionBoxActive={false}
            showSelectionToggle={false}
            toggleSelectionBox={toggleSelectionBox}
            toggleTooltips={toggleTooltips}
            tooltipsActive
            translate={translate}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('with optional props', () => {
    describe('and centered', () => {
      describe('with selection box inactive', () => {
        let wrapper;

        beforeAll(() => {
          wrapper = shallow(
            <Options
              canTranslate
              download={download}
              expand
              fixLeft={false}
              reset={reset}
              selectionBoxActive={false}
              showSelectionToggle
              toggleSelectionBox={toggleSelectionBox}
              toggleTooltips={toggleTooltips}
              tooltipsActive
              translate={translate}
            />,
          );
        });

        it('should match snapshot', () => {
          expect(wrapper).toMatchSnapshot();
        });

        it('should have opacity of 1', () => {
          expect(wrapper.props().style.opacity).toBe(1);
        });

        it('should have scaleY of 1', () => {
          expect(wrapper.props().style.transform).toBe('scaleY(1)');
        });

        it('should have five buttons', () => {
          expect(wrapper.find('OptionButton').length).toBe(5);
        });

        it('should have correct tooltip on second button', () => {
          expect(wrapper.find('OptionButton').at(0).props().tooltip).toBe('Fix plot to left');
        });

        it('should call translate method on click', () => {
          wrapper.find('OptionButton').at(0).simulate('click');
          expect(translate).toHaveBeenCalled();
        });

        it('should call toggle selection method on click', () => {
          wrapper.find('OptionButton').at(3).simulate('click');
          expect(toggleSelectionBox).toHaveBeenCalled();
        });
      });

      describe('with selection box =active', () => {
        let wrapper;

        beforeAll(() => {
          wrapper = shallow(
            <Options
              canTranslate
              download={download}
              expand
              fixLeft={false}
              reset={reset}
              selectionBoxActive
              showSelectionToggle
              toggleSelectionBox={toggleSelectionBox}
              toggleTooltips={toggleTooltips}
              tooltipsActive
              translate={translate}
            />,
          );
        });

        it('should match snapshot', () => {
          expect(wrapper).toMatchSnapshot();
        });
      });
    });

    describe('and fixed left', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <Options
            canTranslate
            download={download}
            expand
            fixLeft
            reset={reset}
            selectionBoxActive
            showSelectionToggle
            toggleSelectionBox={toggleSelectionBox}
            toggleTooltips={toggleTooltips}
            tooltipsActive
            translate={translate}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should have correct tooltip on second button', () => {
        expect(wrapper.find('OptionButton').at(0).props().tooltip).toBe('Center plot');
      });
    });
  });
});
