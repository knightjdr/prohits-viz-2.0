/* GetPage takes an array of row/heatmap data, slices it in both
** dimensions to fit the display, and adds in the fill color value
** after mapping the value to the gradient color range. */

const GetPage = (rows, position, dimensions, gradient, range) => {
  const pageStart = {
    x: position.x * rows[0].data.length,
    y: position.y * rows.length,
  };
  const pageEnd = {
    x: pageStart.x + dimensions.pageX,
    y: pageStart.y + dimensions.pageY,
  };
  return rows.slice(pageStart.y, pageEnd.y).map(row => ({
    data: row.data.slice(pageStart.x, pageEnd.x).map(item => ({
      ...item,
      fillColor: gradient[range(item.value)],
    })),
    name: row.name,
  }));
};

export default GetPage;
