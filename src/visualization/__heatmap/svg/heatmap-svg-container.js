import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ColumnsSelector from '../../../state/selectors/visualization/columns-selector';
import RowsSelector from '../../../state/selectors/visualization/rows-selector';
import SettingSelector from '../../../state/selectors/visualization/settings-selector';
import Svg from './heatmap-svg';

const COL_MARGIN = 100;
const ROW_MARGIN = 100;

export class SvgContainer extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      height: {
        arrowsY: false, // Should the vertical navigation arrows be shown?
        heatmap: 0, // Height of heat map in the svg.
        pageY: 0, // The number of heat map cells along the y axis.
        wrapper: 0, // The height of the entire svg.
      },
      showSvg: false,
      tooltip: {
        display: false,
        left: 0,
        text: '',
        top: 0,
      },
      width: {
        arrowsX: false, // Should the horizontal navigation arrows be shown?
        heatmap: 0, // Width of heat map in the svg.
        pageX: 0, // The number of heat map cells along the x axis.
        wrapper: 0, // The width of the entire svg.
      },
    };
  }
  componentDidMount = () => {
    this.setDimensions();
  }
  setDimensions = () => {
    this.setState({
      height: this.calculateHeight(),
      showSvg: true,
      width: this.calculateWidth(),
    });
  }
  calculateHeight = () => {
    // Maximum sizes.
    const wrapper = this.wrapperRef.current.getBoundingClientRect().height;
    const heatmap = wrapper - COL_MARGIN;
    const pageY = Math.floor(heatmap / this.props.cellSize);

    /* If there are not enough rows to fill available height,
    ** shrink the dimensions to what is needed */
    const rows = this.props.rows.list.length;
    const height = {};
    if (pageY > rows) {
      height.arrowsY = false;
      height.heatmap = rows * this.props.cellSize;
      height.pageY = rows;
      height.wrapper = height.heatmap + COL_MARGIN;
    } else {
      height.arrowsY = true;
      height.heatmap = heatmap;
      height.pageY = pageY;
      height.wrapper = wrapper;
    }
    return height;
  }
  calculateWidth = () => {
    // Maximum sizes.
    const wrapper = this.wrapperRef.current.getBoundingClientRect().width;
    const heatmap = wrapper - ROW_MARGIN;
    const pageX = Math.floor(heatmap / this.props.cellSize);

    /* If there are not enough columns to fill available width,
    ** shrink the dimensions to what is needed */
    const columns = this.props.columns.names.length;
    const width = {};
    if (pageX > columns) {
      width.arrowsX = false;
      width.heatmap = columns * this.props.cellSize;
      width.pageX = columns;
      width.wrapper = width.heatmap + ROW_MARGIN;
    } else {
      width.arrowsX = true;
      width.heatmap = heatmap;
      width.pageX = pageX;
      width.wrapper = wrapper;
    }
    return width;
  }
  toggleTooltip = (needsTooltip, display, text, left = 0, top = 0) => {
    if (needsTooltip) {
      this.setState({
        tooltip: {
          display,
          left,
          text,
          top,
        },
      });
    }
  }
  render() {
    return (
      <div
        className="heatmap-svg__wrapper"
        ref={this.wrapperRef}
      >
        <Svg
          height={this.state.height}
          show={this.state.showSvg}
          tooltip={this.state.tooltip}
          toggleTooltip={this.toggleTooltip}
          width={this.state.width}
        />
      </div>
    );
  }
}

SvgContainer.defaultProps = {
  cellSize: 20,
};

SvgContainer.propTypes = {
  cellSize: PropTypes.number,
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
    ref: PropTypes.string,
  }).isRequired,
  rows: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    order: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  cellSize: SettingSelector(state, 'cellSize'),
  columns: ColumnsSelector(state),
  rows: RowsSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(SvgContainer);

export default ConnectedContainer;
