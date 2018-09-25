import PropTypes from 'prop-types';
import React from 'react';

import CustomizeConnected from './tab-customize__store-connection';
import renderSvg from './tab-customize__svg';

import '../../__heatmap/svg/heatmap-svg.css';

const SvgInterface = ({
  plotTranslate,
  setContainerRef,
  show,
  ...otherProps
}) => (
  <div
    className="heatmap-svg__wrapper"
    ref={setContainerRef}
    style={{
      transform: `translate(${plotTranslate}px)`,
    }}
  >
    {
      show &&
      <CustomizeConnected
        renderProp={renderSvg}
        {...otherProps}
      />
    }
  </div>
);

SvgInterface.propTypes = {
  plotTranslate: PropTypes.number.isRequired,
  setContainerRef: PropTypes.shape({}).isRequired,
  show: PropTypes.bool.isRequired,
};

const renderInterface = props => <SvgInterface {...props} />;

export default renderInterface;
