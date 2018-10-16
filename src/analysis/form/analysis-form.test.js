import React from 'react';
import { shallow } from 'enzyme';

import { AnalysisFormComponent } from './analysis-form';

jest.mock('./header-selection/header-selection-container');
jest.mock('./next-step/next-step');
jest.mock('./options/options');
jest.mock('./status/status-container');
jest.mock('./submit/submit');
jest.mock('./tool-selection/tool-selection');

const change = jest.fn();
const handleOptions = jest.fn();
const handleReset = jest.fn();
const handleSubmit = jest.fn();
const nextStep = jest.fn();

describe('AnalysisFormComponent', () => {
  describe('initial render', () => {
    let wrapper;

    beforeAll(() => {
      nextStep.mockClear();
      wrapper = shallow(
        <AnalysisFormComponent
          analysisError={false}
          change={change}
          closeError={jest.fn()}
          closeStatus={jest.fn()}
          errors={{}}
          handleOptions={handleOptions}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          nextStep={nextStep}
          showOptions={false}
          step={0}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not render tool selection', () => {
      expect(wrapper.find('ToolSelection').length).toBe(0);
    });

    it('should not render status modal', () => {
      expect(wrapper.find('Status').length).toBe(0);
    });

    it('should trigger nextStep function when clicking NextStep component on step 0', () => {
      wrapper.find('NextStep').simulate('click');
      expect(nextStep).toHaveBeenCalledWith(0);
    });
  });

  describe('first step', () => {
    let wrapper;

    beforeAll(() => {
      nextStep.mockClear();
      wrapper = shallow(
        <AnalysisFormComponent
          analysisError={false}
          change={change}
          closeError={jest.fn()}
          closeStatus={jest.fn()}
          errors={{}}
          handleOptions={handleOptions}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          nextStep={nextStep}
          showOptions={false}
          step={1}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render tool selection', () => {
      expect(wrapper.find('ToolSelection').length).toBe(1);
    });

    it('should not render header selection', () => {
      expect(wrapper.find('HeaderSelection').length).toBe(0);
    });

    it('should trigger nextStep function when clicking NextStep component on step 1', () => {
      wrapper.find('NextStep').at(1).simulate('click');
      expect(nextStep).toHaveBeenCalledWith(1);
    });
  });

  describe('second step', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <AnalysisFormComponent
          analysisError={false}
          change={change}
          closeError={jest.fn()}
          closeStatus={jest.fn()}
          errors={{}}
          handleOptions={handleOptions}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          nextStep={nextStep}
          showOptions={false}
          step={2}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render tool selection', () => {
      expect(wrapper.find('ToolSelection').length).toBe(1);
    });

    it('should render header selection', () => {
      expect(wrapper.find('HeaderSelection').length).toBe(1);
    });

    it('should render options', () => {
      expect(wrapper.find('HeaderSelection').length).toBe(1);
    });

    it('should render submit', () => {
      expect(wrapper.find('Submit').length).toBe(1);
    });
  });

  describe('status modal', () => {
    let wrapper;

    beforeAll(() => {
      nextStep.mockClear();
      wrapper = shallow(
        <AnalysisFormComponent
          analysisError={false}
          change={change}
          closeError={jest.fn()}
          closeStatus={jest.fn()}
          errors={{}}
          handleOptions={handleOptions}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          nextStep={nextStep}
          showOptions={false}
          step={0}
          taskID="task"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render status component', () => {
      expect(wrapper.find('Status').length).toBe(1);
    });
  });
});
