import PropTypes from 'prop-types';
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Tree } from 'antd';

import HelpPages from '../help-pages/help-pages';

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
  expandNode,
  expandedRoutes,
}) => (
  <Tree
    expandedKeys={expandedRoutes}
    onExpand={expandNode}
  >
    { treeNodes(HelpPages) }
  </Tree>
);

TreeRoutesComponent.propTypes = {
  expandNode: PropTypes.func.isRequired,
  expandedRoutes: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default withRouter(TreeRoutesComponent);
