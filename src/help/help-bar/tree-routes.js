import PropTypes from 'prop-types';
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Tree } from 'antd';

import HelpRoutes from '../help-routes';
import RoutesFromPath from '../../helpers/routes-from-path';

const { TreeNode } = Tree;

export const treeNodes = routes => (
  routes.map(route => (
    <TreeNode
      key={route.route}
      title={
        <NavLink to={route.route}>
          { route.panelText }
        </NavLink>
      }
    >
      { route.children ? treeNodes(route.children) : null }
    </TreeNode>
  ))
);

export const TreeRoutesComponent = ({
  location,
}) => (
  <Tree defaultExpandedKeys={RoutesFromPath(location.pathname)}>
    { treeNodes(HelpRoutes) }
  </Tree>
);

TreeRoutesComponent.propTypes = {
  location: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default withRouter(TreeRoutesComponent);
