import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ColumnsSelector from '../../../../state/selectors/visualization/columns-selector';
import Columns from './heatmap-svg__columns';
import SettingSelector from '../../../../state/selectors/visualization/settings-selector';

export class ColumnsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: this.props.cellSize * 0.6,
    };
  }
  openContextMenu = (e, column) => {
    e.preventDefault();
    console.log(column);
  }
  sortColumn = (e, column) => {
    if (e.altKey) {
      console.log(`shift ${column}`);
    }
  }
  render() {
    return (
      <Columns
        cellSize={this.props.cellSize}
        fontSize={this.state.fontSize}
        names={this.props.columns.names}
        openContextMenu={this.openContextMenu}
        sortColumn={this.sortColumn}
        reference={this.props.columns.ref}
        toggleTooltip={this.props.toggleTooltip}
      />
    );
  }
}

ColumnsContainer.defaultProps = {
  cellSize: 20,
};

ColumnsContainer.propTypes = {
  cellSize: PropTypes.number,
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
    ref: PropTypes.string,
  }).isRequired,
  toggleTooltip: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  cellSize: SettingSelector(state, 'cellSize'),
  columns: ColumnsSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(ColumnsContainer);

export default ConnectedContainer;
