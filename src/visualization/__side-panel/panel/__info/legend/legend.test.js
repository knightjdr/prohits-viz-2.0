import Dotplot from './legend__dotplot';
import Heatmap from './legend__heatmap';
import Legend from './legend';
import SegCircle from './legend__segcircle';

jest.mock('./legend__dotplot');
jest.mock('./legend__heatmap');
jest.mock('./legend__segcircle');

describe('Legend', () => {
  it('should call dotplot legend', () => {
    Dotplot.mockClear();
    Legend({ imageType: 'dotplot' });
    expect(Dotplot).toHaveBeenCalled();
  });

  it('should call heatmap legend', () => {
    Heatmap.mockClear();
    Legend({ imageType: 'heatmap' });
    expect(Heatmap).toHaveBeenCalled();
  });

  it('should call segcircle legend', () => {
    SegCircle.mockClear();
    Legend({ imageType: 'segcircle' });
    expect(SegCircle).toHaveBeenCalled();
  });

  it('should call nothing and return null', () => {
    const val = Legend({ imageType: 'other' });
    expect(val).toBeNull();
  });
});
