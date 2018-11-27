import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from './visualization__tabs';
import { parameterSelectorProp } from '../../state/selectors/visualization/params-selector';
import { tabSelector } from '../../state/selectors/visualization/tab-selector';

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
        imageType={this.props.imageType}
        showButton={this.props.tabs.show}
        showMenu={this.state.showMenu}
      />
    );
  }
}

TabsContainer.propTypes = {
  imageType: PropTypes.string.isRequired,
  tabs: PropTypes.shape({
    selected: PropTypes.string,
    show: PropTypes.bool,
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  imageType: parameterSelectorProp(state, 'imageType'),
  tabs: tabSelector(state),
});


const ConnectedContainer = connect(
  mapStateToProps,
)(TabsContainer);

export default ConnectedContainer;
