import deepEqual from 'deep-equal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeepCopy from '../../helpers/deep-copy';
import FetchHome from '../../state/get/home-actions';
import Newsfeed from './newsfeed';
import NewsfeedSelector from '../../state/selectors/newsfeed-selector';

export class NewsfeedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }
  componentDidMount = () => {
    this.props.fetchHome();
  }
  componentWillReceiveProps = (nextProps) => {
    const { news } = nextProps;
    this.updateNews(news, this.props.news);
  }
  updateNews = (currNews, oldNews) => {
    if (!deepEqual(currNews, oldNews)) {
      this.setState({
        news: DeepCopy(currNews),
      });
    }
  }
  render() {
    return (
      <Newsfeed
        news={this.state.news}
      />
    );
  }
}

NewsfeedContainer.defaultProps = {
  news: [],
};

NewsfeedContainer.propTypes = {
  fetchHome: PropTypes.func.isRequired,
  news: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      date: PropTypes.string,
      headline: PropTypes.string,
    }),
  ),
};

const mapDispatchToProps = dispatch => ({
  fetchHome: () => {
    dispatch(FetchHome());
  },
});

const mapStateToProps = state => ({
  news: NewsfeedSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsfeedContainer);

export default ConnectedContainer;
