import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFileAlt from '@fortawesome/fontawesome-pro-solid/faFileAlt';
import faQuestion from '@fortawesome/fontawesome-pro-solid/faQuestion';
import React from 'react';

import ToolBox from './tool-box';
import Dotplot from '../assets/icons/dotplot.svg';
import './tools.css';

const details = {
  analysis: {
    image: <FontAwesomeIcon icon={faFileAlt} />,
    text: `With a SAINT, CRAPome or tabular input file in hand, click here to
      begin your analysis`,
    title: 'Analysis',
  },
  help: {
    image: <FontAwesomeIcon icon={faQuestion} />,
    text: `New to ProHits-viz or have a question about one of our
      tools? Try our online help section by clicking here`,
    title: 'Help',
  },
  visualization: {
    image: Dotplot,
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
        text={details.analysis.text}
        title={details.analysis.title}
      />
      <ToolBox
        image={details.visualization.image}
        text={details.visualization.text}
        title={details.visualization.title}
      />
      <ToolBox
        image={details.help.image}
        text={details.help.text}
        title={details.help.title}
      />
    </div>
  </div>
);

export default Tools;
