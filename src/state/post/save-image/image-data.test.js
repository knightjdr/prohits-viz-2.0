import heatmapData from './heatmap-data';
import imageData from './image-data';

jest.mock('./heatmap-data');
heatmapData.mockReturnValue({ type: 'heatmap' });

describe('Type of image data to save', () => {
  it('should return heatmap data for dotplot', () => {
    expect(imageData('dotplot', {})).toEqual({ type: 'heatmap' });
  });

  it('should return heatmap data for heatmap', () => {
    expect(imageData('heatmap', {})).toEqual({ type: 'heatmap' });
  });

  it('should return input object for unrecognized image type', () => {
    expect(imageData('other', {})).toEqual({});
  });
});
