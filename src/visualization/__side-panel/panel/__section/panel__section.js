import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import './panel__section.css';

const Info = ({
  children,
  title,
}) => (
  <Fragment>
    <div className="panel__section-border" />
    <div className="panel__section-title">
      {title}
    </div>
    {children}
  </Fragment>
);

Info.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Info;
