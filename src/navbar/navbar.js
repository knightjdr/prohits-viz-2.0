import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-pro-solid/faBars';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Popover } from 'antd';

import Logo from '../assets/logos/logo_nobg.svg';
import LogoAccent from '../assets/logos/logo_accent_nobg.svg';

import './navbar.css';

const Navbar = ({
  background,
  links,
  smallScreen,
}) => {
  const className = background ? 'Navbar-default' : 'Navbar-transparent';
  let linksElements = links.map(link => (
    <NavLink
      className="Navbar-link"
      key={link.text}
      to={link.route}
    >
      { link.text }
    </NavLink>
  ));
  if (smallScreen) {
    const menu = (
      <div className="Navbar-menu-items">
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
          className="Navbar-menu"
          icon={faBars}
        />
      </Popover>
    );
  }
  const logo = background ? LogoAccent : Logo;
  return (
    <div className={`Navbar ${className}`}>
      <NavLink
        className="Navbar-logo-link"
        to="/"
      >
        <img
          alt="Logo"
          className="Navbar-logo"
          src={logo}
        />
      </NavLink>
      <div className="Navbar-link-container">
        { linksElements }
      </div>
    </div>
  );
};

Navbar.propTypes = {
  background: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
  smallScreen: PropTypes.bool.isRequired,
};

export default Navbar;
