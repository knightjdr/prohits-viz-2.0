import React from 'react';

import ColorScales from './images/color-scales.svg';
import Filters from './images/filters.svg';
import ReadoutLengthNormalization from './images/length-normalization.svg';

import './info.css';

const InfoDotplot = {
  conditionClustering: `The user can generate dot plots without clustering if desired.
  In this case, a list of condition and readout genes in the desired display order must be
  supplied in the text boxes. Only conditions and readouts entered in the text box will be
  included in the analysis and in the dot plot. Condition and readout names must be entered
  as they appear in the input file name and are case sensitive. In some cases the
  user may want to control which conditions are shown in the dot plot and their ordering,
  while wanting to show and cluster all readouts, or vice versa. This can be done as well
  by selecting "cluster all" under the condition or readout options menu.`,
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
  control: `The average value of a readout across control samples will be subtracted
    from the detected value for the condition if this is selected. The quantitative value
    for the readout becomes the value above and beyond what is seen across the control
    samples. Specify the column to use for controls in the adjacent "Control column"
    field. If you are applying multiple transformations to your data, control subtraction
    will always occur first (before readout length, normalization, condition normalization
    and log transformation).`,
  log: `If desired, abundance values can be log-transformed by base 2, e or base 10.
    Log transformation will be performed after control subtraction, normalization
    and abundance filtering if these are also specified. If you are applying multiple
    transformations to your data, log transformation will always occur last (after
    control subtraction, readout length normalization and condition normalization).`,
  abundanceCap: `Any readouts with an abundance value (e.g. spectral count) above this cutoff
      will be capped at this maximum in the output images. This is to give greater
      visual dynamic range for lower values when outlier readouts with very high
      abundance are present. This cutoff will be dependent on the instrument and
      interaction method used and should be selected based on the data set.`,
  minAbundance: `In addition to the primary filter requirement, a readout must have an abundance
      value (e.g. spectral count) above this minimum to be included in the analysis.
      As with the primary filter, once a readout passes this threshold for one condition,
      all the values for it are returned across all conditions and used in the analysis.`,
  normalization: `No normalization is applied by default, but when conditions in the same
    dataset have been run on instruments with varying sensitivity or dynamic range,
    normalization should be applied. The options are to normalize by the total abundance
    for all proteins identified in the run or normalize based on a specific readout.
    If you are applying multiple transformations to your data, normalization will
    always occur after control subtraction and readout length normalization but before
    log transformation.`,
  outputFolder: 'The name of the output folder.',
  pdf: 'SVG images will always be generated. Please, specify if you would also like PDFs.',
  png: 'SVG images will always be generated. Please, specify if you would also like PNGs.',
  readoutClustering: `The user can generate dot plots without clustering if desired.
  In this case, a list of condition and readout genes in the desired display order must be
  supplied in the text boxes. Only conditions and readouts entered in the text box will be
  included in the analysis and in the dot plot. Condition and readout names must be entered
  as they appear in the input file name and are case sensitive. In some cases the
  user may want to control which conditions are shown in the dot plot and their ordering,
  while wanting to show and cluster all readouts, or vice versa. This can be done as well
  by selecting "cluster all" under the condition or readout options menu.`,
  readoutLength: (
    <div>
      The spectral count/abundance value of each readout can be normalized
      to its protein length if a column with protein length is available in the input
      file. This option should be selected if you are worried the protein length
      may be unduly affecting spectral counts. The normalized value of a readout is
      calculated by dividing the median length of all readouts in the data set by the
      length of readout i and then multiplying by the abundance of readout i.
      <div className="Info-img-container Info-img-padding">
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
  writeDistance: `Images can also be generated showing the clustered distance
    matrices of either the conditions or the readouts. Please specificy if
    you would like to output these images as well.`,
  writeHeatmap: `Please specify if you would also like a heat map version of
    the output image.`,
};
export default InfoDotplot;
