import fillAnalysisForm from './fill__viz-analysis-form';
import { defaultState } from '../../state/set/analysis/viz-analysis-form-reducer';

describe('Fill viz analysis form', () => {
  it('should return default when nothing passed to function', () => {
    expect(fillAnalysisForm()).toEqual(defaultState);
  });

  it('should return user input when valid', () => {
    const user = {
      customize: {},
      domain: {},
      go: {},
      network: {},
    };
    expect(fillAnalysisForm(user)).toEqual(user);
  });

  it('should return defaults when expected keys are missing', () => {
    const user = {};
    expect(fillAnalysisForm(user)).toEqual(defaultState);
  });
});
