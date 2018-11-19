import PropTypes from 'prop-types';
import React from 'react';

import logo from '../assets/logos/logo_nobg.svg';
import logoAccent from '../assets/logos/logo_accent_nobg.svg';
import logoWhite from '../assets/logos/logo_white_nobg.svg';
import RouterLink from '../components/router-link/router-link';

import './navbar.css';

const icon = {
  dark: logoAccent,
  semi: logoWhite,
  transparent: logo,
};

const Logo = ({
  background,
}) => (
  <RouterLink
    className="navbar__logo-link"
    to="/"
  >
    <img
      alt="ProHits-viz logo"
      className="navbar__logo"
      src={icon[background]}
    />
  </RouterLink>
);

Logo.propTypes = {
  background: PropTypes.string.isRequired,
};

export default Logo;
