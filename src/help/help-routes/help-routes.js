import Dotplot from '../help-pages/tools/dotplot';
import Heatmap from '../help-pages/visualization/heatmap';
import Introduction from '../help-pages/introduction/introduction';
import Tools from '../help-pages/tools/tools';
import Visualization from '../help-pages/visualization/visualization';

const HelpRoutes = [
  {
    component: Introduction,
    linkText: 'Help',
    route: '/help',
    panelText: 'Introduction',
  },
  {
    component: Tools,
    linkText: 'Tools',
    route: '/help/tools',
    panelText: 'Tools',
    children: [
      {
        component: Dotplot,
        linkText: 'Dot plot',
        route: '/help/tools/dotplot',
        panelText: 'Dot plot',
      },
    ],
  },
  {
    component: Visualization,
    linkText: 'Visualization',
    route: '/help/visualization',
    panelText: 'Visualization',
    children: [
      {
        component: Heatmap,
        linkText: 'Heat map',
        route: '/help/visualization/heatmap',
        panelText: 'Heat map',
      },
    ],
  },
];
export default HelpRoutes;
