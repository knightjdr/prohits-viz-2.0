import PropTypes from 'prop-types';
import React from 'react';

import ControlSubtraction from './fields/control-subtraction-container';
import FillColor from './fields/fill-color';
import KnownCriterion from './fields/known-criterion';
import Log from './fields/log';
import MaximumAbundance from './fields/maximum-abundance';
import MinimumAbundance from './fields/minimum-abundance';
import Normalization from './fields/normalization';
import OtherAbundanceColumns from './fields/other-abundance-columns-container';
import Output from './fields/output-circ-heatmap';
import ReadoutLengthNormalization from './fields/readout-length-normalization-container';
import PrimaryFilter from './fields/primary-filter-container';
import ScoreType from './fields/score-type-container';

const CircHeatmapOptions = ({
  change,
  form,
  header,
}) => {
  const {
    abundance,
    analysisType,
    control,
    ctrlSub,
    fileType,
    normalization,
    otherAbundance,
    readoutLength,
    readoutLengthNorm,
    score,
    scoreType,
  } = form;
  const dotplotElement = (
    <div>
      <ScoreType
        analysisType={analysisType}
        change={change}
        score={score}
        scoreType={scoreType}
      />
      <PrimaryFilter
        analysisType={analysisType}
        change={change}
        fileType={fileType}
        score={score}
      />
      <MinimumAbundance analysisType={analysisType} />
      <MaximumAbundance analysisType={analysisType} />
      <ControlSubtraction
        analysisType={analysisType}
        change={change}
        ctrlSub={ctrlSub}
        control={control}
        header={header}
      />
      <ReadoutLengthNormalization
        analysisType={analysisType}
        change={change}
        readoutLength={readoutLength}
        readoutLengthNorm={readoutLengthNorm}
        header={header}
      />
      <Normalization
        analysisType={analysisType}
        normalization={normalization}
      />
      <Log analysisType={analysisType} />
      <FillColor analysisType={analysisType} />
      <KnownCriterion />
      <OtherAbundanceColumns
        abundance={abundance}
        change={change}
        header={header}
        otherAbundance={otherAbundance}
      />
      <Output />
    </div>
  );
  return (
    dotplotElement
  );
};

CircHeatmapOptions.propTypes = {
  change: PropTypes.func.isRequired,
  form: PropTypes.shape({
    analysisType: PropTypes.string,
  }).isRequired,
  header: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

export default CircHeatmapOptions;
