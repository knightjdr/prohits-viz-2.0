import ClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class ClickOutsideWrapper extends Component {
  handleClickOutside = () => {
    const { callback } = this.props;
    if (callback) {
      callback();
    }
  };
  render() {
    return this.props.children;
  }
}

ClickOutsideWrapper.defaultProps = {
  callback: null,
};

ClickOutsideWrapper.propTypes = {
  callback: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default ClickOutside(ClickOutsideWrapper);
