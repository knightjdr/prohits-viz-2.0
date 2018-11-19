import PropTypes from 'prop-types';
import React from 'react';

import Links from './navbar__links';
import Logo from './navbar__logo';
import Tasks from './navbar__tasks';

import './navbar.css';

const Navbar = ({
  background,
  fixed,
  links,
  smallScreen,
  tasks,
}) => {
  const className = ['navbar'];
  switch (background) {
    case 'transparent':
      className.push('navbar_transparent');
      break;
    case 'semi':
      className.push('navbar_semi-transparent');
      break;
    default:
      className.push('navbar_dark');
      break;
  }
  return (
    <nav
      className={className.join(' ')}
      style={{
        position: fixed ? 'fixed' : 'relative',
      }}
    >
      <Logo background={background} />
      <div className="navbar__link-container">
        <Tasks
          smallScreen={smallScreen}
          tasks={tasks}
        />
        <Links
          links={links}
          smallScreen={smallScreen}
        />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  background: PropTypes.string.isRequired,
  fixed: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
  smallScreen: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default Navbar;
