import React from 'react';

const HelpRoutes = [
  {
    component: () => (<div />),
    linkText: 'Help',
    route: '/help',
    panelText: 'Introduction',
  },
  {
    component: () => (<div />),
    linkText: 'Tools',
    route: '/help/tools',
    panelText: 'Tools',
    children: [
      {
        component: () => (<div />),
        linkText: 'Dot plot',
        route: '/help/tools/dotplot',
        panelText: 'Dot plot',
      },
    ],
  },
  {
    component: () => (<div />),
    linkText: 'Visualization',
    route: '/help/visualization',
    panelText: 'Visualization',
  },
];
export default HelpRoutes;
