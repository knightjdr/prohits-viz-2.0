import Dotplot from '../help-pages/tools/dotplot';
import FileFormat from '../help-pages/file-format/file-format';
import Heatmap from '../help-pages/visualization/heatmap';
import Introduction from '../help-pages/introduction/introduction';
import Recommendations from '../help-pages/recommendations/recommendations';
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
    component: FileFormat,
    linkText: 'Input format',
    route: '/help/format',
    panelText: 'Input format',
  },
  {
    component: Recommendations,
    linkText: 'Recommendations',
    route: '/help/recommendations',
    panelText: 'Recommendations',
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
