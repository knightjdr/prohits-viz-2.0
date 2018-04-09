import React from 'react';

import ColorScales from './images/color-scales.svg';
import Filters from './images/filters.svg';

import './info.css';

const InfoDotplot = {
  colorScale: (
    <div>
      Various options are available for the fill and edge color, and these can be
      applied independently using the approiate menu.
      <div className="Info-img-container">
        <img
          alt="Color scales"
          src={ColorScales}
        />
      </div>
    </div>
  ),
  control: `The average value of a prey across control samples will be subtracted
    from the detected value for the bait if this is selected. The quantitative value
    for the prey becomes the value above and beyond what is seen across the control
    samples. Specify the column to use for controls in the adjacent "Control column"
    field.`,
  log: `If desired, abundance values can be log-transformed by base 2, e or base 10.
    Log transformation will be performed after control subtraction, normalization
    and abundance filtering if these are also specified`,
  maxAbd: `Any preys with an abundance value (e.g. spectral count) above this cutoff
      will be capped at this maximum in the output images. This is to give greater
      visual dynamic range for lower values when outlier preys with very high
      abundance are present. This cutoff will be dependent on the instrument and
      interaction method used and should be selected based on the data set.`,
  minAbd: `In addition to the primary filter requirement, a prey must have an abundance
      value (e.g. spectral count) above this minimum to be included in the analysis.
      As with the primary filter, once a prey passes this threshold for one bait,
      all the values for it are returned across all baits and used in the analysis.`,
  primaryFilter: (
    <div>
      All preys that satisfy this score filter for at least one
      bait will be displayed on the dot plot. If a prey satisfies this filter
      for at least one bait, all the quantitative values for this prey – even
      those that did not satisfy the cutoff in particular bait-prey pairs -
      will also be included. By default, prey confidence will be indicated with
      a circle edge as shown below:
      <div className="Info-img-container">
        <img
          alt="Default filter edges"
          src={Filters}
        />
      </div>
    </div>
  ),
  scoreDir: `The score direction defines how the scoring system in the
    input file works, i.e. are smaller scores better that large scores, or
    vice versa?`,
  secondaryFilter: `Interactions that do no pass the primary score filter but
    pass this secondary filter will be marked with an intermediate intensity
    edge in the dot plot. Interactions that do not pass either filter will be
    marked with a low intensity edge. The secondary filter can be adjusted
    depending on the dataset to allow a greater or lesser number of interactions
    into this 'medium' confidence range.`,
};
export default InfoDotplot;
