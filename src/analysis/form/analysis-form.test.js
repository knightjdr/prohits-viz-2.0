import React from 'react';
import { shallow } from 'enzyme';

import { AnalysisFormComponent } from './analysis-form';

jest.mock('./header-selection/header-selection-container');
jest.mock('./next-step/next-step');
jest.mock('./options/options');
jest.mock('./submit/submit');
jest.mock('./tool-selection/tool-selection');

const change = jest.fn();
const handleOptions = jest.fn();
const handleReset = jest.fn();
const handleSubmit = jest.fn();
const nextStep = jest.fn();

describe('AnalysisFormComponent', () => {
  test('Initially renders only file input', () => {
    const wrapper = shallow(
      <AnalysisFormComponent
        change={change}
        errors={{}}
        handleOptions={handleOptions}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        nextStep={nextStep}
        showOptions={false}
        step={0}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('HeaderSelection').length).toBe(0);
    expect(wrapper.find('Options').length).toBe(0);
    expect(wrapper.find('Submit').length).toBe(0);
    expect(wrapper.find('ToolSelection').length).toBe(0);
  });

  test('First step increment shows ToolSelection', () => {
    const wrapper = shallow(
      <AnalysisFormComponent
        change={change}
        errors={{}}
        handleOptions={handleOptions}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        nextStep={nextStep}
        showOptions={false}
        step={1}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('HeaderSelection').length).toBe(0);
    expect(wrapper.find('Options').length).toBe(0);
    expect(wrapper.find('Submit').length).toBe(0);
    expect(wrapper.find('ToolSelection').length).toBe(1);
  });

  test('Second step increment shows Header, submit and options', () => {
    const wrapper = shallow(
      <AnalysisFormComponent
        change={change}
        errors={{}}
        handleOptions={handleOptions}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        nextStep={nextStep}
        showOptions={false}
        step={2}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('HeaderSelection').length).toBe(1);
    expect(wrapper.find('Options').length).toBe(1);
    expect(wrapper.find('Submit').length).toBe(1);
    expect(wrapper.find('ToolSelection').length).toBe(1);
  });

  test('Clicking NextStep component on step 0 triggers nextStep function', () => {
    const wrapper = shallow(
      <AnalysisFormComponent
        change={change}
        errors={{}}
        handleOptions={handleOptions}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        nextStep={nextStep}
        showOptions={false}
        step={0}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.find('NextStep').simulate('click');
    expect(nextStep).toHaveBeenCalledWith(0);
  });

  test('Clicking NextStep component on step 1 triggers nextStep function', () => {
    const wrapper = shallow(
      <AnalysisFormComponent
        change={change}
        errors={{}}
        handleOptions={handleOptions}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        nextStep={nextStep}
        showOptions={false}
        step={1}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.find('NextStep').at(1).simulate('click');
    expect(nextStep).toHaveBeenCalledWith(1);
  });
});
