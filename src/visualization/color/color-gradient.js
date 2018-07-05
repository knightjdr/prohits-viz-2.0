import HSLtoHex from './hsl-to-hex';
import Round from '../../helpers/round';

/* ColorGradient defines a color gradient to use for fill values. It defines
** the colors to use via HSL and then converts those to HEX. */

const ColorGradient = (colorSpace, numColors, invert) => {
  // Create hex gradient. The color scale is set using the hue and saturation
  // components of HSL. The gradient is then defined by changing the lightness
  // from 1 (light) to 0 (dark). HSL values are on a 0-1 scale.
  // The maximum hue value of 1 equals 360 so all values are relative to that.
  let h;
  let s;
  if (colorSpace === 'greenBlack') {
    // Middle HSL value = (120, 100%, 50%).
    h = 120 / 360;
    s = 1;
  } else if (colorSpace === 'greyscale') {
    // Middle HSL value = (0, 0%, 50%).
    h = 0;
    s = 0;
  } else if (colorSpace === 'redBlack') {
    // Middle HSL value = (0, 100%, 50%).
    h = 0;
    s = 1;
  } else if (colorSpace === 'yellowBlack') {
    // Middle HSL value = (60, 100%, 50%).
    h = 60 / 360;
    s = 1;
  } else { // default blueBlack
    // Middle (HSL value = (225, 100%, 50%).
    h = 0.625;
    s = 1;
  }
  const increment = 1 / (numColors - 1);
  const startL = 1;
  const gradient = [];
  for (let i = 0; i < numColors; i += 1) {
    const lightness = Round(startL - (i * increment), 4);
    gradient[i] = HSLtoHex({ h, s, l: lightness });
  }

  // Invert gradient if requested.
  if (invert) {
    gradient.reverse();
  }
  return gradient;
};
export default ColorGradient;
