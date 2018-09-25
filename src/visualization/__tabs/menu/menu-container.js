import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from './menu';
import { removeTab, setTab } from '../../../state/set/visualization/tab-actions';
import { TabSelector } from '../../../state/selectors/visualization/tab-selector';

export class MenuContainer extends Component {
  handleClick = (selected) => {
    this.props.closeMenu();
    this.props.setTab(selected);
  }
  removeTab = (tab) => {
    this.props.closeMenu();
    this.props.removeTab(tab);
  }
  render() {
    return (
      <Menu
        activeTab={this.props.tabs.selected}
        closeMenu={this.props.closeMenu}
        handleClick={this.handleClick}
        removeTab={this.removeTab}
        show={this.props.show}
        tabs={this.props.tabs.available}
      />
    );
  }
}

MenuContainer.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  removeTab: PropTypes.func.isRequired,
  setTab: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  tabs: PropTypes.shape({
    available: PropTypes.arrayOf(PropTypes.string),
    selected: PropTypes.string,
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  tabs: TabSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  removeTab: (tab) => {
    dispatch(removeTab(tab));
  },
  setTab: (tab) => {
    dispatch(setTab(tab));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuContainer);

export default ConnectedContainer;
