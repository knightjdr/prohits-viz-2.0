import HelpRoutes from './help-routes';

export const RoutesToMap = (routeArr = HelpRoutes) => {
  const mapped = {
    arr: [],
    routes: {},
  };
  routeArr.forEach((route) => {
    mapped.arr.push(route.route);
    mapped.routes[route.route] = route.linkText;
    if (
      route.children &&
      route.children.length > 0
    ) {
      const child = RoutesToMap(route.children);
      mapped.arr = mapped.arr.concat(child.arr);
      mapped.routes = Object.assign(
        {},
        mapped.routes,
        child.routes,
      );
    }
  });
  return mapped;
};

class HelpRoutesMap {
  constructor() {
    const mapped = RoutesToMap();
    this.arr = mapped.arr;
    this.routeToText = mapped.routes;
  }
}
export default new HelpRoutesMap();
