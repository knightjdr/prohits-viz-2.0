import fillAnalysis from './fill__viz-analysis';
import { defaultState } from '../../state/set/analysis/viz-analysis-reducer';

describe('Fill viz analysis', () => {
  it('should return default when nothing passed to function', () => {
    expect(fillAnalysis()).toEqual(defaultState);
  });

  it('should return user input when valid', () => {
    const user = {
      domain: {
        didFail: false,
        isRunning: false,
        results: [],
      },
      go: {
        didFail: false,
        isRunning: false,
        results: [],
      },
      network: {
        didFail: false,
        isRunning: false,
        results: [],
      },
    };
    expect(fillAnalysis(user)).toEqual(user);
  });

  it('should return defaults when invalid', () => {
    const user = {
      domain: {
        didFail: 'false',
        isRunning: 'false',
        results: {},
      },
      go: {
        didFail: 'false',
        isRunning: 'false',
        results: {},
      },
      network: {
        didFail: 'false',
        isRunning: 'false',
        results: {},
      },
    };
    expect(fillAnalysis(user)).toEqual(defaultState);
  });

  it('should return default when keys are missing', () => {
    const user = {
      domain: {},
      go: {},
      network: {},
    };
    expect(fillAnalysis(user)).toEqual(defaultState);
  });
});
