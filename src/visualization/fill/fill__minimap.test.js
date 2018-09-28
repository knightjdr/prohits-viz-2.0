import fillMap from './fill__minimap';
import validateUri from '../../helpers/validate-uri';

jest.mock('../../helpers/validate-uri');

const defaultState = { image: null, syncImage: null, synced: true };

describe('Fill map', () => {
  it('should return default when nothing passed to function', () => {
    expect(fillMap()).toEqual(defaultState);
  });

  it('should return user input when valid', () => {
    validateUri.mockReturnValue(true);
    const user = {
      image: 'image',
      synced: true,
      syncImage: 'image',
    };
    expect(fillMap(user)).toEqual(user);
  });

  it('should return default when inputs invalid', () => {
    validateUri.mockReturnValue(false);
    const user = {
      image: 'image',
      synced: 'true',
      syncImage: 'image',
    };
    expect(fillMap(user)).toEqual(defaultState);
  });
});
