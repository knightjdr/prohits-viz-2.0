import React from 'react';

import ColorScales from './images/color-scales.svg';
import Filters from './images/filters.svg';
import ReadoutLengthNormalization from './images/length-normalization.svg';

import './info.css';

const InfoDotplot = {
  colorScale: (
    <div>
      Various options are available for the heatmap fill
      <div className="form__info-img">
        <img
          alt="Color scales"
          src={ColorScales}
        />
      </div>
    </div>
  ),
  control: `The average value of a readout across control samples will be subtracted
    from the detected value for the condition if this is selected. The quantitative value
    for the readout becomes the value above and beyond what is seen across the control
    samples. Specify the column to use for controls in the adjacent "Control column"
    field. If you are applying multiple transformations to your data, control subtraction
    will always occur first (before readout length normalization, condition normalization
    and log transformation).`,
  knownCriterion: `Circular heat maps can have an indicator displaying which of the readouts was
    previously known, for example which where previously known interactions for the
    condition they were found in. Select what known criterion you would like to evaluate
    against here. Currently it only supports interactions but additional options will be
    added in the future. You can unselect an option if you do not wish to include this feature.`,
  log: `If desired, abundance values can be log-transformed by base 2, e or base 10.
    If you are applying multiple transformations to your data, log transformation will
    always occur last (after control subtraction, readout length normalization and condition
    normalization).`,
  abundanceCap: `Any heatmap cells with an abundance value above this cutoff
      will be capped at this value in the output image. This is to give greater
      visual dynamic range for lower values when outlier readouts with very high
      abundance are present. This cutoff will be dependent on the data set and should
      be selected accordingly. It can be adjusted on a per circle basis on the interactive
      viewer.`,
  minAbundance: `In addition to the primary filter requirement, a readout must have an abundance
      value above this minimum to be included in the analysis.
      As with the primary filter, once a readout passes this threshold for one condition,
      all the values for it are returned across all conditions and used in the analysis.`,
  normalization: `No normalization is applied by default but data can be normalized by the total
    abundance between conditions or by a specific readout. If you are applying multiple
    transformations to your data, normalization will always occur after control subtraction
    and readout length normalization but before log transformation.`,
  otherAbundance: `Select any additional abundance columns you would like to visualize on
    the image. Readouts to display will be selected based on the filtering criteria applied
    to the main abundance column selected above, not these additional columns.`,
  png: 'SVG images will always be generated. Please, specify if you would also like PNGs.',
  readoutLength: (
    <div>
      The abundance value of each readout can be adjusted to it length (gene/protein length)
      if a column with length is available in the input file. This option should be selected
      if you are worried the length may be unduly affecting the observed abundance. The adjusted
      value of a readout is calculated by dividing the median length of all readouts in the data
      set by the length of readout i and then multiplying by the abundance of readout i.
      <div className="form__info-img form__info-img_padding">
        <img
          alt="Readout length normalization"
          src={ReadoutLengthNormalization}
        />
      </div>
      If you are applying multiple transformations to your data, readout length
      normalization will always occur after control subtraction but before condition
      normalization and log transformation.
    </div>
  ),
  primaryFilter: (
    <div>
      All readouts that satisfy this score filter for at least one
      condition will be displayed on the dot plot. If a readout satisfies this filter
      for at least one condition, all the quantitative values for this readout – even
      those that did not satisfy the cutoff in particular condition-readout pairs -
      will also be included. By default, readout confidence will be indicated with
      a circle edge as shown below:
      <div className="form__info-img">
        <img
          alt="Default filter edges"
          src={Filters}
        />
      </div>
    </div>
  ),
  scoreType: `The score type defines how the scoring system in the
    input file works, i.e. are smaller scores better that large scores, or
    vice versa?`,
  species: `The species to use for evaluating whether a readout is "known"
    according to the criterion used.`,
};
export default InfoDotplot;
