/* eslint react/no-array-index-key: 0 */
import React from 'react';
import { shallow } from 'enzyme';

import cell from './cell/cell';
import Plot from './heatmap-svg__plot';

jest.mock('./cell/cell');
const cellType = jest.fn().mockImplementation(
  (cellSize, rows) => rows.map((row, i) => <rect key={i} />),
);
cell.mockImplementation(() => cellType);

const page = [
  { data: [{ value: 1 }, { value: 2 }, { value: 3 }] },
  { data: [{ value: 4 }, { value: 5 }, { value: 6 }] },
  { data: [{ value: 7 }, { value: 8 }, { value: 9 }] },
  { data: [{ value: 2 }, { value: 3 }, { value: 4 }] },
  { data: [{ value: 5 }, { value: 6 }, { value: 7 }] },
  { data: [{ value: 8 }, { value: 9 }, { value: 9 }] },
  { data: [{ value: 3 }, { value: 4 }, { value: 5 }] },
  { data: [{ value: 6 }, { value: 7 }, { value: 8 }] },
  { data: [{ value: 9 }, { value: 9 }, { value: 9 }] },
  { data: [{ value: 4 }, { value: 5 }, { value: 6 }] },
];

describe('Plot', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Plot
        cellSize={10}
        edgeSize={1}
        imageType="heatmap"
        page={page}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should get correct cell type function', () => {
    expect(cell).toHaveBeenCalledWith('heatmap');
  });

  it('should have thirty rects', () => {
    expect(wrapper.find('rect').length).toBe(30);
  });

  it('should call celltype function with offset', () => {
    expect(cellType).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
      5,
    );
  });
});
