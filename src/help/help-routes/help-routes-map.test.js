import HelpRoutesMap, { RoutesToMap } from './help-routes-map';

// mock HelpRoutes
jest.mock('./help-routes');

const expected = {
  arr: ['/help', '/help/tools', '/help/tools/dotplot', '/help/visualization'],
  routeToText: {
    '/help': 'Help',
    '/help/tools': 'Tools',
    '/help/tools/dotplot': 'Dot plot',
    '/help/visualization': 'Visualization',
  },
};

describe('HelpRoutesMap', () => {
  test('Constructor should be init', () => {
    expect(HelpRoutesMap).toEqual(expected);
  });

  test('Maps route array to hash map', () => {
    const mapped = RoutesToMap();
    expect(mapped.arr).toEqual(expected.arr);
    expect(mapped.routes).toEqual(expected.routeToText);
  });
});
