import Dotplot from '../help-pages/tools/dotplot';
import FileFormat from '../help-pages/file-format/file-format';
import Heatmap from '../help-pages/visualization/heatmap';
import Introduction from '../help-pages/introduction/introduction';
import Recommendations from '../help-pages/recommendations/recommendations';
import Tools from '../help-pages/tools/tools';
import Visualization from '../help-pages/visualization/visualization';
import VizFileFormat from '../help-pages/visualization/file-format';

const HelpRoutes = [
  {
    component: Introduction,
    linkText: 'Help',
    route: '/help',
    panelText: 'Introduction',
  },
  {
    component: FileFormat,
    linkText: 'Input formats',
    route: '/help/format',
    panelText: 'Input formats',
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
        component: VizFileFormat,
        linkText: 'File format',
        route: '/help/visualization/format',
        panelText: 'File format',
      },
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
