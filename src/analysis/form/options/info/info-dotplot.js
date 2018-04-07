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
