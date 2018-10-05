import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Image from './image';
import fillJson from '../../fill/fill';
import getFile from '../../../helpers/get-file';
import { parameterSelectorProp } from '../../../state/selectors/visualization/params-selector';
import { parseFile } from '../../../state/set/interactive-file-actions';

export class ImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      status: {},
    };
  }
  componentDidMount = () => {
    const { match } = this.props;
    this.getImage(match);
  }
  onLoad = (json) => {
    const name = json.parameters.name || json.parameters.imageType;
    const file = fillJson(name, json);
    this.props.parseFile(file);
  }
  getError = () => {}
  getImage = (match) => {
    const { id, image } = match.params;
    const route = image ? `task/${id}/${image}` : `task/${id}`;
    const options = {
      err: this.getError,
      responseType: 'json',
    };
    getFile(route, options, this.onLoad);
  }
  render() {
    return (
      <Image
        loading={this.state.loading}
        status={this.state.status}
        vizType={this.props.imageType}
      />
    );
  }
}

ImageContainer.defaultProps = {
  imageType: null,
};

ImageContainer.propTypes = {
  imageType: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.string,
    }),
  }).isRequired,
  parseFile: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  imageType: parameterSelectorProp(state, 'imageType'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  parseFile: (file) => {
    dispatch(parseFile(file));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageContainer);

export default ConnectedContainer;
