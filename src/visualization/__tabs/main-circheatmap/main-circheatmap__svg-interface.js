import PropTypes from 'prop-types';
import React from 'react';

import MainConnected from './main-circheatmap__store-connection';
import renderSvg from './main-circheatmap__svg';

import '../../__circheatmap/svg/circheatmap-svg.css';

const SvgInterface = ({
  plotTranslate,
  setContainerRef,
  show,
  ...otherProps
}) => (
  <div
    className="circheatmap-svg__wrapper"
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
