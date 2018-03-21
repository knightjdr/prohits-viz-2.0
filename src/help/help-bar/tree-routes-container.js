import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import RoutesFromPath from '../../helpers/routes-from-path';
import TreeRoutes from './tree-routes';

export class TreeRoutesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedRoutes: RoutesFromPath(this.props.location.pathname),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const { location } = nextProps;
    this.changeExpandedRoutes(location.pathname, this.props.location.pathname);
  }
  changeExpandedRoutes = (newPath, oldPath) => {
    if (newPath !== oldPath) {
      this.setState({
        expandedRoutes: RoutesFromPath(newPath),
      });
    }
  }
  expandNode = (expanded, node) => {
    const isExpanded = node.node.props.expanded;
    const key = node.node.props.eventKey;
    this.setState(({ expandedRoutes }) => {
      if (
        isExpanded &&
        expandedRoutes.includes(key)
      ) {
        return {
          expandedRoutes: expandedRoutes.filter(route => (
            route !== key
          )),
        };
      } else if (
        !isExpanded &&
        !expandedRoutes.includes(key)
      ) {
        return {
          expandedRoutes: expandedRoutes.concat([key]),
        };
      }
      return {};
    });
  }
  render() {
    return (
      <TreeRoutes
        expandNode={this.expandNode}
        expandedRoutes={this.state.expandedRoutes}
      />
    );
  }
}

TreeRoutesContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(TreeRoutesContainer);
