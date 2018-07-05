import ColorGradient from './color-gradient';

const gradients = {
  blueBlack: ['#ffffff', '#ccd9ff', '#99b3ff', '#668cff', '#3366ff', '#0040ff', '#0033cc', '#002699', '#001966', '#000d33', '#000000'],
  greenBlack: ['#ffffff', '#ccffcc', '#99ff99', '#66ff66', '#33ff33', '#00ff00', '#00cc00', '#009900', '#006600', '#003300', '#000000'],
  greyscale: ['#ffffff', '#e6e6e6', '#cccccc', '#b3b3b3', '#999999', '#808080', '#666666', '#4d4d4d', '#333333', '#1a1a1a', '#000000'],
  redBlack: ['#ffffff', '#ffcccc', '#ff9999', '#ff6666', '#ff3333', '#ff0000', '#cc0000', '#990000', '#660000', '#330000', '#000000'],
  yellowBlack: ['#ffffff', '#ffffcc', '#ffff99', '#ffff66', '#ffff33', '#ffff00', '#cccc00', '#999900', '#666600', '#333300', '#000000'],
};

describe('ColorGradient', () => {
  test('generates color gradients', () => {
    expect(ColorGradient('blueBlack', 11, false)).toEqual(gradients.blueBlack);
    expect(ColorGradient('greenBlack', 11, false)).toEqual(gradients.greenBlack);
    expect(ColorGradient('greyscale', 11, false)).toEqual(gradients.greyscale);
    expect(ColorGradient('redBlack', 11, false)).toEqual(gradients.redBlack);
    expect(ColorGradient('yellowBlack', 11, false)).toEqual(gradients.yellowBlack);
  });

  test('generates default blueBlack gradient', () => {
    expect(ColorGradient('default', 11, false)).toEqual(gradients.blueBlack);
  });

  test('generates inverted gradient', () => {
    expect(ColorGradient('blueBlack', 11, true)).toEqual(gradients.blueBlack.reverse());
  });
});
