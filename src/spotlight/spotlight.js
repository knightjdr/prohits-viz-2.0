import { Carousel } from 'antd';
import React from 'react';

import './spotlight.css';

const articles = [
  {
    authorLastName: 'Youn',
    description: `define stress granules, P-bodies and other RNA assocaited
      structures`,
    image: 'http://www.cell.com/cms/attachment/2118963855/2087347222/fx1.jpg',
    pubmed: 29395067,
    tool: 'prey-prey correlation',
    url: 'http://www.cell.com/molecular-cell/abstract/S1097-2765(17)30977-2',
  },
  {
    authorLastName: 'St-Denis',
    description: `visualize quantitative differences between phosphatase
      interactors in their study defining the interactome of 140 human
      phosphatases`,
    image: 'http://www.cell.com/cms/attachment/2107705238/2082116716/fx1.jpg',
    pubmed: 27880917,
    tool: 'dot plot',
    url: 'http://www.cell.com/cell-reports/abstract/S2211-1247(16)31513-3',
  },
];

const Spotlight = () => {
  const carouselElement = articles.map((article, index) => {
    const key = `article-${index}`;
    return (
      <div
        className="Spotlight-carousel-container"
        key={key}
      >
        <div className="Spotlight-carousel-image-container boxshadow">
          <img
            alt={`${article.authorLastName} highlight`}
            className="Spotlight-carousel-image"
            src={article.image}
          />
        </div>
        <div>
          <div className="Spotlight-carousel-description">
            { `${article.authorLastName} and colleagues used the ${article.tool}
              tool at ProHits-viz to ${article.description}.`
            }
          </div>
          <div className="Spotlight-link-container">
            <a
              className="Spotlight-link"
              href={`https://www.ncbi.nlm.nih.gov/pubmed/${article.pubmed}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Pubmed
            </a>
            <a
              className="Spotlight-link"
              href={article.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Publisher
            </a>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="Spotlight-container">
      <div className="Spotlight-header">
        SPOTLIGHT
      </div>
      <Carousel
        autoplay
        autoplaySpeed="8000"
        className="Spotlight-carousel"
      >
        { carouselElement }
      </Carousel>
      <div className="Spotlight-howto">
        If you would like to have your work featured on ProHits-viz, check out our
        help to find out how
      </div>
    </div>
  );
};

export default Spotlight;
