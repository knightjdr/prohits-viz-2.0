import Fill from './fill';
import heatmap from './fill__heatmap';

jest.mock('./fill__heatmap');
heatmap.mockReturnValue({ type: 'heatmap' });

describe('Fill', () => {
  describe('dotplot', () => {
    const file = {
      parameters: { imageType: 'dotplot' },
    };
    let returned;

    beforeAll(() => {
      heatmap.mockClear();
      returned = Fill('name', file);
    });

    it('should call heatmap for image type dotplot', () => {
      expect(heatmap).toHaveBeenCalledWith('name', file);
    });

    it('should return object', () => {
      expect(returned).toEqual({ type: 'heatmap' });
    });
  });

  describe('heatmap', () => {
    const file = {
      parameters: { imageType: 'heatmap' },
    };
    let returned;

    beforeAll(() => {
      heatmap.mockClear();
      returned = Fill('name', file);
    });

    it('should call heatmap for image type heatmap', () => {
      expect(heatmap).toHaveBeenCalledWith('name', file);
    });

    it('should return object', () => {
      expect(returned).toEqual({ type: 'heatmap' });
    });
  });

  describe('default', () => {
    const file = {
      parameters: { imageType: 'unknown' },
    };
    let returned;

    beforeAll(() => {
      heatmap.mockClear();
      returned = Fill('name', file);
    });

    it('should not call heatmap for unknown image type', () => {
      expect(heatmap).not.toHaveBeenCalled();
    });

    it('should return file object', () => {
      expect(returned).toEqual(file);
    });
  });
});
