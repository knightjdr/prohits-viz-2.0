import RoutesFromPath from './routes-from-path';

const path = '/home/test/subroute';
const expected = ['/home', '/home/test', '/home/test/subroute'];

describe('RoutesFromPath', () => {
  test('Splits a route to subroutes', () => {
    expect(RoutesFromPath(path)).toEqual(expected);
    expect(RoutesFromPath('/')).toEqual(['/']);
    expect(RoutesFromPath()).toEqual([]);
  });
});
