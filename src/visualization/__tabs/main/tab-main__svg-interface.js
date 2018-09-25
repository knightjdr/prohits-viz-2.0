import PropTypes from 'prop-types';
import React from 'react';

import MainConnected from './tab-main__store-connection';
import renderSvg from './tab-main__svg';

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
      <MainConnected
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
