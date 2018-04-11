import PropTypes from 'prop-types';
import React from 'react';

import Clustering from './fields/clustering-dotplot';
import ControlSubtraction from './fields/control-subtraction-container';
import EdgeColorScale from './fields/edge-color-scale';
import FillColorScale from './fields/fill-color-scale';
import MaximumAbundance from './fields/maximum-abundance';
import MinimumAbundance from './fields/minimum-abundance';
import Log from './fields/log';
import Normalization from './fields/normalization';
import Output from './fields/output';
import PreyLengthNormalization from './fields/prey-length-normalization-container';
import PrimaryFilter from './fields/primary-filter-container';
import ScoreType from './fields/score-type-container';
import SecondaryFilter from './fields/secondary-filter';

const DotplotOptions = ({
  change,
  form,
  header,
}) => {
  const {
    analysisType,
    baitClustering,
    clustering,
    control,
    ctrlSub,
    normalization,
    preyClustering,
    preyLength,
    preyLengthNorm,
    score,
    scoreType,
  } = form;
  const dotplotElement = (
    <div className="Dotplot-options">
      <ScoreType
        analysisType={analysisType}
        change={change}
        score={score}
        scoreType={scoreType}
      />
      <PrimaryFilter
        analysisType={analysisType}
        change={change}
        score={score}
      />
      <SecondaryFilter analysisType={analysisType} />
      <MinimumAbundance analysisType={analysisType} />
      <MaximumAbundance analysisType={analysisType} />
      <ControlSubtraction
        analysisType={analysisType}
        change={change}
        ctrlSub={ctrlSub}
        control={control}
        header={header}
      />
      <PreyLengthNormalization
        analysisType={analysisType}
        change={change}
        preyLength={preyLength}
        preyLengthNorm={preyLengthNorm}
        header={header}
      />
      <Normalization
        analysisType={analysisType}
        normalization={normalization}
      />
      <Log analysisType={analysisType} />
      <FillColorScale analysisType={analysisType} />
      <EdgeColorScale analysisType={analysisType} />
      <Clustering
        analysisType={analysisType}
        baitClustering={baitClustering}
        clustering={clustering}
        preyClustering={preyClustering}
      />
      <Output analysisType={analysisType} />
    </div>
  );
  return (
    dotplotElement
  );
};

DotplotOptions.propTypes = {
  change: PropTypes.func.isRequired,
  form: PropTypes.shape({
    analysisType: PropTypes.string,
  }).isRequired,
  header: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

export default DotplotOptions;
