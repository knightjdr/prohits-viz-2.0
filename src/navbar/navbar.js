import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Popover } from 'antd';
import { faBars } from '@fortawesome/pro-solid-svg-icons';

import Logo from '../assets/logos/logo_nobg.svg';
import LogoAccent from '../assets/logos/logo_accent_nobg.svg';
import ScrollTop from '../helpers/scroll-top';

import './navbar.css';

const Navbar = ({
  background,
  fixed,
  links,
  smallScreen,
}) => {
  const className = background ? 'Navbar-default' : 'Navbar-transparent';
  let linksElements = links.map(link => (
    <NavLink
      className="Navbar-link"
      key={link.text}
      onClick={ScrollTop}
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
    <div
      className={`Navbar ${className}`}
      style={{
        position: fixed ? 'fixed' : 'relative',
      }}
    >
      <NavLink
        className="Navbar-logo-link"
        onClick={ScrollTop}
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
  fixed: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
  smallScreen: PropTypes.bool.isRequired,
};

export default Navbar;
