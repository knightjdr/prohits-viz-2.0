const HelpRoutes = [
  {
    name: 'Help',
    route: '/help',
    panelText: 'Introduction',
  },
  {
    name: 'Tools',
    route: '/help/tools',
    panelText: 'Tools',
    children: [
      {
        name: 'Dot plot',
        route: '/help/tools/dotplot',
        panelText: 'Dot plot',
      },
    ],
  },
  {
    name: 'Visualization',
    route: '/help/visualization',
    panelText: 'Visualization',
    children: [
      {
        name: 'Heat map',
        route: '/help/visualization/heatmap',
        panelText: 'Heat map',
      },
    ],
  },
];
export default HelpRoutes;
