import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Download from '../../../download/download';
import OnResize from '../../../../helpers/on-resize';
import Status from './heatmap-svg__status';
import { DisplaySelector } from '../../../../state/selectors/visualization/display-selector';
import { ParametersSelectorProp } from '../../../../state/selectors/visualization/params-selector';
import { sortDefault } from '../../../../state/set/visualization/rows-actions';
import { toggleSelectionBox, toggleTooltips } from '../../../../state/set/visualization/display-actions';

export class StatusContainer extends Component {
  constructor(props) {
    super(props);
    const { width } = this.props;
    this.state = {
      elPosition: this.setPosition(width),
      show: true,
    };
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.onResize);
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateElPosition(nextProps, this.props.width);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    this.setState({ show: false });
    OnResize(this, this.resizeEnd, 800);
  }
  setPosition = width => ({
    right: ((window.innerWidth - width) / 2) - 20,
    top: 105,
  })
  download = () => {
    const fileName = `${this.props.name}currentView.svg`;
    const svg = document.getElementById('svg-main').outerHTML;
    Download(svg, fileName, 'image/svg+xml');
  }
  resizeEnd = () => {
    const { width } = this.props;
    this.setState({
      elPosition: this.setPosition(width),
      show: true,
    });
  }
  updateElPosition = ({ width }, prevWidth) => {
    if (width !== prevWidth) {
      this.setState({
        elPosition: this.setPosition(width),
      });
    }
  }
  render() {
    return (
      <Status
        canTranslate={this.props.canTranslate}
        download={this.download}
        elPosition={this.state.elPosition}
        fixLeft={this.props.fixLeft}
        reset={this.props.reset}
        selectionBoxActive={this.props.display.selectionBox}
        show={this.state.show}
        toggleSelectionBox={this.props.toggleSelectionBox}
        toggleTooltips={this.props.toggleTooltips}
        tooltipsActive={this.props.display.tooltips}
        translate={this.props.translate}
      />
    );
  }
}

StatusContainer.defaultProps = {
  name: null,
};

StatusContainer.propTypes = {
  canTranslate: PropTypes.bool.isRequired,
  display: PropTypes.shape({
    selectionBox: PropTypes.bool,
    tooltips: PropTypes.bool,
  }).isRequired,
  name: PropTypes.string,
  fixLeft: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  toggleSelectionBox: PropTypes.func.isRequired,
  toggleTooltips: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  display: DisplaySelector(state),
  name: ParametersSelectorProp(state, 'name'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  reset: () => {
    dispatch(sortDefault());
  },
  toggleSelectionBox: () => {
    dispatch(toggleSelectionBox());
  },
  toggleTooltips: () => {
    dispatch(toggleTooltips());
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatusContainer);

export default ConnectedContainer;
