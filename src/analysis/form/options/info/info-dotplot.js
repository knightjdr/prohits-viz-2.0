import React from 'react';

import ColorScales from './images/color-scales.svg';
import Filters from './images/filters.svg';
import PreyLengthNormalization from './images/length-normalization.svg';

import './info.css';

const InfoDotplot = {
  baitClustering: `The user can generate dot plots without clustering if desired.
  In this case, a list of bait and prey genes in the desired display order must be
  supplied in the text boxes. Only baits and preys entered in the text box will be
  included in the analysis and in the dot plot. Bait and prey names must be entered
  as they appear in the input file name and are case sensitive. In some cases the
  user may want to control which baits are shown in the dot plot and their ordering,
  while wanting to show and cluster all preys, or vice versa. This can be done as well
  by selecting "cluster all" under the bait or prey options menu.`,
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
    field. If you are applying multiple transformations to your data, control subtraction
    will always occur first (before prey length, normalization, bait normalization
    and log transformation).`,
  log: `If desired, abundance values can be log-transformed by base 2, e or base 10.
    Log transformation will be performed after control subtraction, normalization
    and abundance filtering if these are also specified. If you are applying multiple
    transformations to your data, log transformation will always occur last (after
    control subtraction, prey length normalization and bait normalization).`,
  maximumAbundance: `Any preys with an abundance value (e.g. spectral count) above this cutoff
      will be capped at this maximum in the output images. This is to give greater
      visual dynamic range for lower values when outlier preys with very high
      abundance are present. This cutoff will be dependent on the instrument and
      interaction method used and should be selected based on the data set.`,
  minimumAbundance: `In addition to the primary filter requirement, a prey must have an abundance
      value (e.g. spectral count) above this minimum to be included in the analysis.
      As with the primary filter, once a prey passes this threshold for one bait,
      all the values for it are returned across all baits and used in the analysis.`,
  normalization: `No normalization is applied by default, but when baits in the same
    dataset have been run on instruments with varying sensitivity or dynamic range,
    normalization should be applied. The options are to normalize by the total abundance
    for all proteins identified in the run or normalize based on a specific prey.
    If you are applying multiple transformations to your data, normalization will
    always occur after control subtraction and prey length normalization but before
    log transformation.`,
  outputFolder: 'The name of the output folder',
  preyClustering: `The user can generate dot plots without clustering if desired.
  In this case, a list of bait and prey genes in the desired display order must be
  supplied in the text boxes. Only baits and preys entered in the text box will be
  included in the analysis and in the dot plot. Bait and prey names must be entered
  as they appear in the input file name and are case sensitive. In some cases the
  user may want to control which baits are shown in the dot plot and their ordering,
  while wanting to show and cluster all preys, or vice versa. This can be done as well
  by selecting "cluster all" under the bait or prey options menu.`,
  preyLength: (
    <div>
      The spectral count/abundance value of each prey can be normalized
      to its protein length if a column with protein length is available in the input
      file. This option should be selected if you are worried the protein length
      may be unduly affecting spectral counts. The normalized value of a prey is
      calculated by dividing the median length of all preys in the data set by the
      length of prey i and then multiplying by the abundance of prey i.
      <div className="Info-img-container Info-img-padding">
        <img
          alt="Prey length normalization"
          src={PreyLengthNormalization}
        />
      </div>
      If you are applying multiple transformations to your data, prey length
      normalization will always occur after control subtraction but before bait
      normalization and log transformation.
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
  scoreType: `The score type defines how the scoring system in the
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
