import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFileAlt from '@fortawesome/fontawesome-pro-solid/faFileAlt';
import faNewspaper from '@fortawesome/fontawesome-pro-solid/faNewspaper';
import faQuestion from '@fortawesome/fontawesome-pro-solid/faQuestion';
import React from 'react';

import ToolBox from './tool-box';
import Dotplot from '../assets/icons/dotplot.svg';
import './tools.css';

const details = {
  analysis: {
    image: <FontAwesomeIcon icon={faFileAlt} size="xs" />,
    route: '/analysis',
    text: `With a SAINT, CRAPome or tabular input file in hand, click here to
      begin your analysis`,
    title: 'Analysis',
  },
  help: {
    image: <FontAwesomeIcon icon={faQuestion} size="xs" />,
    route: '/help',
    text: `New to ProHits-viz or have a question about one of our
      tools? Try our online help section by clicking here`,
    title: 'Help',
  },
  news: {
    image: <FontAwesomeIcon icon={faNewspaper} size="xs" />,
    route: '/news',
    text: 'Read more about the latest news and features available at ProHits-viz',
    title: 'News',
  },
  visualization: {
    image: Dotplot,
    route: '/visualization',
    text: `Access our interactive visualization tools here if you have already
      generated an interactive file with ProHits-viz`,
    title: 'Visualization',
  },
};

const Tools = () => (
  <div className="Tools-container">
    <div className="Tools-description">
      GETTING STARTED
    </div>
    <div className="Tools-toolbox-wrapper">
      <ToolBox
        image={details.analysis.image}
        route={details.analysis.route}
        text={details.analysis.text}
        title={details.analysis.title}
      />
      <ToolBox
        image={details.visualization.image}
        route={details.visualization.route}
        text={details.visualization.text}
        title={details.visualization.title}
      />
      <ToolBox
        image={details.news.image}
        route={details.news.route}
        text={details.news.text}
        title={details.news.title}
      />
      <ToolBox
        image={details.help.image}
        route={details.help.route}
        text={details.help.text}
        title={details.help.title}
      />
    </div>
  </div>
);

export default Tools;
