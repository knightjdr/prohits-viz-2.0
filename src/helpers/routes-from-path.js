// splits a url path beginning with '/' to all subroutes

const RoutesFromPath = (path) => {
  // if path not found, return empty array
  if (!path) {
    return [];
  }
  const splitPath = path.split('/');
  splitPath.shift();
  let last;
  const routes = splitPath.map((value, index) => {
    const route = index > 0 ? `${last}/${value}` : `/${value}`;
    last = route;
    return route;
  });
  return routes;
};
export default RoutesFromPath;
