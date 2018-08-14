import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from './visualization__tabs';
import { TabSelector } from '../../state/selectors/visualization/tab-selector';

export class TabsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }
  handleClick = () => {
    this.setState(({ showMenu }) => ({
      showMenu: !showMenu,
    }));
  }
  render() {
    return (
      <Tabs
        activeTab={this.props.tabs.selected}
        handleClick={this.handleClick}
        showButton={this.props.tabs.show}
        showMenu={this.state.showMenu} 
      />
    );
  }
}

TabsContainer.propTypes = {
  tabs: PropTypes.shape({
    selected: PropTypes.string,
    show: PropTypes.bool,
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  tabs: TabSelector(state),
});


const ConnectedContainer = connect(
  mapStateToProps,
)(TabsContainer);

export default ConnectedContainer;
