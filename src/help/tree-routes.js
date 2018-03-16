import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tree } from 'antd';

import HelpRoutes from './help-routes';

const { TreeNode } = Tree;

export const toTreeNode = routes => (
  routes.map(route => (
    <TreeNode
      key={route.route}
      title={
        <NavLink to={route.route}>
          { route.panelText }
        </NavLink>
      }
    >
      { route.children ? toTreeNode(route.children) : null }
    </TreeNode>
  ))
);

const TreeRoutes = () => (
  <Tree>
    { toTreeNode(HelpRoutes) }
  </Tree>
);
export default TreeRoutes;
