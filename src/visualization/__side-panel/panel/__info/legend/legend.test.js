import Dotplot from './legend__dotplot';
import Heatmap from './legend__heatmap';
import Legend from './legend';

jest.mock('./legend__dotplot');
jest.mock('./legend__heatmap');

describe('Legend', () => {
  beforeEach(() => {
    /* Clear call count */
    Dotplot.mockClear();
    Heatmap.mockClear();
  });

  it('should call dotplot legend', () => {
    Legend({ imageType: 'dotplot' });
    expect(Dotplot).toHaveBeenCalled();
    expect(Heatmap).not.toHaveBeenCalled();
  });

  it('should call heatmap legend', () => {
    Legend({ imageType: 'heatmap' });
    expect(Dotplot).not.toHaveBeenCalled();
    expect(Heatmap).toHaveBeenCalled();
  });

  it('should call nothing and return null', () => {
    const val = Legend({ imageType: 'other' });
    expect(Dotplot).not.toHaveBeenCalled();
    expect(Heatmap).not.toHaveBeenCalled();
    expect(val).toBeNull();
  });
});
