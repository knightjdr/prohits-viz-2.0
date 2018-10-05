import PropTypes from 'prop-types';
import React from 'react';

import logo from '../assets/logos/logo_nobg.svg';
import logoAccent from '../assets/logos/logo_accent_nobg.svg';
import RouterLink from '../components/router-link/router-link';

import './navbar.css';

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
      src={background ? logoAccent : logo}
    />
  </RouterLink>
);

Logo.propTypes = {
  background: PropTypes.bool.isRequired,
};

export default Logo;
