import round from '../../../../helpers/round';

const SVG_SCALE_SIZE = 10;

const iconPosition = (cellSize) => {
  const effectiveCellSize = cellSize * 0.8;
  const scale = round(effectiveCellSize / SVG_SCALE_SIZE, 2);
  const offset = round((cellSize - effectiveCellSize) / 2, 2);
  const translate = { x: 0, y: 0 };
  return {
    offset,
    scale,
    translate,
  };
};

export default iconPosition;
