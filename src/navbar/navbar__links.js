import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Popover } from 'antd';
import { faBars } from '@fortawesome/pro-solid-svg-icons';

import RouterLink from '../components/router-link/router-link';

const Links = ({
  links,
  smallScreen,
}) => {
  let linksElements = links.map(link => (
    <RouterLink
      className="navbar__link"
      key={link.text}
      to={link.route}
    >
      { link.text }
    </RouterLink>
  ));
  if (smallScreen) {
    const menu = (
      <div className="navbar__menu-items">
        { linksElements }
      </div>
    );
    linksElements = (
      <Popover
        content={menu}
        placement="leftBottom"
        trigger="click"
      >
        <FontAwesomeIcon
          className="navbar__menu"
          icon={faBars}
        />
      </Popover>
    );
  }
  return linksElements;
};

Links.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
  smallScreen: PropTypes.bool.isRequired,
};

export default Links;
