import fillTabs from './fill__tabs';
import { defaultState } from '../../state/set/visualization/tab-reducer';

describe('Fill tabs', () => {
  it('should return default when nothing passed to function', () => {
    expect(fillTabs()).toEqual(defaultState);
  });

  it('should return user input when valid', () => {
    const user = {
      available: ['main', 'go'],
      selected: 'main',
      show: true,
    };
    expect(fillTabs(user)).toEqual(user);
  });

  it('should return default if available is not an array', () => {
    const user = {
      available: {},
      selected: 'main',
      show: true,
    };
    const expected = {
      ...user,
      available: defaultState.available,
    };
    expect(fillTabs(user)).toEqual(expected);
  });

  it('should return default if available does not contain "main"', () => {
    const user = {
      available: ['go'],
      selected: 'main',
      show: true,
    };
    const expected = {
      ...user,
      available: defaultState.available,
    };
    expect(fillTabs(user)).toEqual(expected);
  });

  it('should return default if selected is not acceptable', () => {
    const user = {
      available: ['main', 'go'],
      selected: 'unknown',
      show: true,
    };
    const expected = {
      ...user,
      selected: defaultState.selected,
    };
    expect(fillTabs(user)).toEqual(expected);
  });

  it('should return default if selected is not available', () => {
    const user = {
      available: ['main', 'go'],
      selected: 'domain',
      show: true,
    };
    const expected = {
      ...user,
      selected: defaultState.selected,
    };
    expect(fillTabs(user)).toEqual(expected);
  });

  it('should return default if show not valid', () => {
    const user = {
      available: ['main', 'go'],
      selected: 'main',
      show: 'true',
    };
    const expected = {
      ...user,
      show: false,
    };
    expect(fillTabs(user)).toEqual(expected);
  });
});
