import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import DefaultCheckboxChange from '../../field/default-checkbox-change';
import Info from '../info/info';

import './clustering.css';

const Clustering = ({
  analysisType,
  baitClustering,
  clustering,
  preyClustering,
}) => (
  <div>
    <div className="Clustering-header ant-text">
      Clustering
    </div>
    <div className="Clustering-introduction ant-text">
      See the{' '}
      <NavLink
        className="decorate-link"
        to="/help/tools/dotplot"
      >
        help
      </NavLink>{' '}
      for clustering options available for this tool.
    </div>
    <CustomField
      label="Clustering type"
      name="clustering"
      onChange={DefaultChange}
      options={[
        { text: 'none', value: 'none' },
        { text: 'Hierarchical', value: 'hierarchical' },
        { text: 'Biclustering', value: 'biclustering' },
      ]}
      placeHolder="Clustering type..."
      type="select"
    />
    {
      clustering === 'biclustering' &&
      <div className="Clustering-biclustering-checkbox">
        <div className="Clustering-biclustering-checkbox-label ant-text">
          Approximate biclustering (faster):
        </div>
        <CustomField
          name="biclusteringApprox"
          onChange={DefaultCheckboxChange}
          type="switch"
        />
      </div>
    }
    {
      clustering === 'hierarchical' &&
      <div className="Clustering-hierarchical-container">
        <CustomField
          label="Distance metric"
          name="distanceMetric"
          onChange={DefaultChange}
          options={[
            { text: 'binary', value: 'binary' },
            { text: 'Canberra', value: 'canberra' },
            { text: 'Euclidean', value: 'euclidean' },
            { text: 'Manhattan', value: 'manhattan' },
            { text: 'maximum', value: 'maximum' },
            { text: 'Minkowski', value: 'minkowski' },
          ]}
          placeHolder="Distance metric..."
          type="select"
        />
        <CustomField
          label="Clustering method"
          name="clusteringMethod"
          onChange={DefaultChange}
          options={[
            { text: 'average', value: 'average' },
            { text: 'centroid', value: 'centroid' },
            { text: 'complete', value: 'complete' },
            { text: 'McQuitty', value: 'mcquitty' },
            { text: 'median', value: 'median' },
            { text: 'single', value: 'single' },
            { text: 'wards', value: 'wards' },
          ]}
          placeHolder="Clustering method..."
          type="select"
        />
      </div>
    }
    {
      clustering === 'none' &&
      <div className="Clustering-none-container">
        <CustomField
          helpMessage={Info[analysisType].baitClustering}
          label="Bait options"
          name="baitClustering"
          onChange={DefaultChange}
          options={[
            { text: 'Supply baits', value: 'baits' },
            { text: 'Cluster all baits', value: 'none' },
          ]}
          placeHolder="Bait options..."
          type="select"
        />
        {
          baitClustering === 'baits' &&
          <CustomField
            label="Baits"
            name="baitList"
            onChange={DefaultChange}
            placeHolder="Baits..."
            type="textArea"
          />
        }
        <CustomField
          helpMessage={Info[analysisType].preyClustering}
          label="Prey options"
          name="preyClustering"
          onChange={DefaultChange}
          options={[
            { text: 'Supply preys', value: 'preys' },
            { text: 'Cluster all preys', value: 'none' },
          ]}
          placeHolder="Prey options..."
          type="select"
        />
        {
          preyClustering === 'preys' &&
          <CustomField
            label="Preys"
            name="preyList"
            onChange={DefaultChange}
            placeHolder="Preys..."
            type="textArea"
          />
        }
      </div>
    }
  </div>
);

Clustering.defaultProps = {
  baitClustering: undefined,
  clustering: undefined,
  preyClustering: undefined,
};

Clustering.propTypes = {
  analysisType: PropTypes.string.isRequired,
  baitClustering: PropTypes.string,
  clustering: PropTypes.string,
  preyClustering: PropTypes.string,
};

export default Clustering;
