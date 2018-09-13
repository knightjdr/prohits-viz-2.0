import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Download from '../../../../helpers/download';
import OnResize from '../../../../helpers/on-resize';
import Status from './heatmap-svg__status';

export class StatusContainer extends Component {
  constructor(props) {
    super(props);
    const { width } = this.props;
    this.state = {
      elPosition: this.setPosition(width),
      expand: false,
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
    right: ((window.innerWidth - width) / 2) - 19,
    top: 115,
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
  toggleMenu = () => {
    this.setState(({ expand }) => ({
      expand: !expand,
    }));
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
        expand={this.state.expand}
        fixLeft={this.props.fixLeft}
        reset={this.props.reset}
        selectionBoxActive={this.props.display.selectionBox}
        show={this.state.show}
        showToggles={this.props.showToggles}
        toggleMenu={this.toggleMenu}
        toggleSelectionBox={this.props.toggleSelection}
        toggleTooltips={this.props.toggleTips}
        tooltipsActive={this.props.display.tooltips}
        translate={this.props.translate}
      />
    );
  }
}

StatusContainer.defaultProps = {
  name: null,
  showToggles: true,
  toggleSelection: null,
  toggleTips: null,
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
  showToggles: PropTypes.bool,
  toggleSelection: PropTypes.func,
  toggleTips: PropTypes.func,
  translate: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

export default StatusContainer;
