import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'antd';

import ArticleSelector from '../../state/selectors/article-selector';

import './spotlight.css';

export const SpotlightComponent = ({
  articles,
}) => {
  const carouselElement = articles.map((article, index) => {
    const key = `article-${index}`;
    return (
      <div
        className="spotlight__carousel-inner-flex"
        key={key}
      >
        <div className="spotlight__carousel-inner">
          <div className="spotlight__carousel-images">
            <LazyLoad
              height={250}
              offset={500}
            >
              <img
                alt={`${article.authorLastName} highlight`}
                className="spotlight__carousel-image"
                src={`./images/${article.image}`}
              />
            </LazyLoad>
          </div>
          <div>
            <p className="spotlight__carousel-description">
              { `${article.authorLastName} and colleagues used the ${article.tool}
                tool at ProHits-viz to ${article.description}.`
              }
            </p>
            <div className="spotlight__links">
              <a
                className="spotlight__link"
                href={`https://www.ncbi.nlm.nih.gov/pubmed/${article.pubmed}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Pubmed
              </a>
              <a
                className="spotlight__link"
                href={article.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                Publisher
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  });
  const spotlightElement = (
    <section className="spotlight">
      <h3>
        SPOTLIGHT
      </h3>
      <Carousel
        autoplay
        autoplaySpeed="8000"
        className="spotlight__carousel"
      >
        { carouselElement }
      </Carousel>
      <p>
        If you would like to have your work featured on ProHits-viz, check out our
        help to find out how
      </p>
    </section>
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
