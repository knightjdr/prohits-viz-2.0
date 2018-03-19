import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'antd';

import ArticleSelector from '../state/selectors/article-selector';

import './spotlight.css';

export const SpotlightComponent = ({
  articles,
}) => {
  const carouselElement = articles.map((article, index) => {
    const key = `article-${index}`;
    return (
      <div
        className="Spotlight-carousel-container"
        key={key}
      >
        <div className="Spotlight-carousel-image-container boxshadow-faint">
          <LazyLoad
            height={200}
            offset={200}
          >
            <img
              alt={`${article.authorLastName} highlight`}
              className="Spotlight-carousel-image"
              src={article.image}
            />
          </LazyLoad>
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
  const spotlightElement = (
    <div className="Spotlight-container fadein">
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
  return (
    articles.length > 0 ? spotlightElement : null
  );
};

SpotlightComponent.defaultProps = {
  articles: [],
};

SpotlightComponent.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      authorLastName: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      pubmed: PropTypes.number,
      tool: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
};

/* istanbul ignore next */

const mapStateToProps = state => ({
  articles: ArticleSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(SpotlightComponent);

export default ConnectedContainer;
