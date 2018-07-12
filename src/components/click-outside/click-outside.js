import ClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class ClickOutsideWrapper extends Component {
  handleClickOutside = () => {
    this.props.callback();
  };
  render() {
    return this.props.children;
  }
}

ClickOutsideWrapper.propTypes = {
  callback: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({}),
  ]).isRequired,
};

export default ClickOutside(ClickOutsideWrapper);
