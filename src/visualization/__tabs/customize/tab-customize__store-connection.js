/* eslint prefer-destructuring: off */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import dimensionSelector from '../../../state/selectors/analysis/customize/dimension-selector';
import panelSelector from '../../../state/selectors/visualization/panel-selector';
import positionSelector from '../../../state/selectors/analysis/customize/position-selector';
import searchSelector from '../../../state/selectors/visualization/search-selector';
import { customizeDataSelector } from '../../../state/selectors/analysis/customize/data-selector';
import { displayCustomizeSelector } from '../../../state/selectors/analysis/customize/display-selector';
import { parameterSelectorProp } from '../../../state/selectors/visualization/params-selector';
import { resetCustomizeState } from '../../../state/set/analysis/customize/data-actions';
import { setDimensions } from '../../../state/set/analysis/customize/dimension-actions';
import { setReference } from '../../../state/set/analysis/customize/columns-actions';
import { settingSelector } from '../../../state/selectors/visualization/settings-selector';
import { sortRows } from '../../../state/set/analysis/customize/rows-actions';
import { toggleTooltips, updatePlotPosition } from '../../../state/set/analysis/customize/display-actions';
import { updatePosition } from '../../../state/set/analysis/customize/position-actions';

export const StoreConnection = ({
  customize,
  dimensions,
  display,
  name,
  panel,
  position,
  renderProp,
  renderSvg,
  reset,
  scoreType,
  search,
  setDims,
  setRef,
  settings,
  sort,
  toggleTips,
  updatePlotXY,
  updateXY,
  ...otherProps
}) => {
  let columns = {};
  let customizeID = null;
  let rowNames = [];
  let rows = {};
  if (customize.length > 0) {
    const index = customize.length - 1;
    columns = customize[index].columns;
    customizeID = customize[index].id;
    rowNames = customize[index].rows.order;
    rows = customize[index].rows;
  }
  return renderProp({
    ...otherProps,
    columns,
    customizeID,
    dimensions,
    display,
    name,
    panel,
    position,
    renderProp: renderSvg,
    reset,
    rowNames,
    rows,
    scoreType,
    search,
    setRef,
    setDims,
    settings,
    sort,
    sortInfo: { id: 0 },
    toggleTips,
    updatePlotXY,
    updateXY,
  });
};

StoreConnection.defaultProps = {
  renderSvg: null,
};

StoreConnection.propTypes = {
  customize: PropTypes.arrayOf(
    PropTypes.shape({
      columns: PropTypes.shape({
        names: PropTypes.arrayOf(PropTypes.string),
        ref: PropTypes.string,
      }),
      id: PropTypes.number,
      rows: PropTypes.shape({
        list: PropTypes.arrayOf(
          PropTypes.shape({
            data: PropTypes.arrayOf(
              PropTypes.shape({
                value: PropTypes.number,
              }),
            ),
            name: PropTypes.string,
          }),
        ),
        order: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
  ).isRequired,
  dimensions: PropTypes.shape({
    columns: PropTypes.number,
    height: PropTypes.number,
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    rows: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  display: PropTypes.shape({
    plotFixed: PropTypes.bool,
    plotTranslate: PropTypes.number,
    tooltips: PropTypes.bool,
  }).isRequired,
  name: PropTypes.string,
  panel: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  renderProp: PropTypes.func.isRequired,
  renderSvg: PropTypes.func,
  reset: PropTypes.func.isRequired,
  scoreType: PropTypes.string.isRequired,
  search: PropTypes.shape({
    columns: PropTypes.shape({}),
    match: PropTypes.bool,
    rows: PropTypes.shape({}),
    term: PropTypes.string,
  }).isRequired,
  setRef: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    abundanceCap: PropTypes.number,
    cellSize: PropTypes.number,
    edgeColor: PropTypes.string,
    fillColor: PropTypes.string,
    imageType: PropTypes.string,
    invertColor: PropTypes.bool,
    minAbundance: PropTypes.number,
    primaryFilter: PropTypes.number,
    secondaryFilter: PropTypes.number,
  }).isRequired,
  sort: PropTypes.func.isRequired,
  toggleTips: PropTypes.func.isRequired,
  updatePlotXY: PropTypes.func.isRequired,
  updateXY: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  customize: customizeDataSelector(state),
  dimensions: dimensionSelector(state),
  display: displayCustomizeSelector(state),
  name: parameterSelectorProp(state, 'name'),
  panel: panelSelector(state),
  position: positionSelector(state),
  scoreType: parameterSelectorProp(state, 'scoreType'),
  search: searchSelector(state),
  settings: settingSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  reset: () => {
    dispatch(resetCustomizeState());
  },
  setDims: (rows, columns, pageY, pageX, height, width) => {
    dispatch(setDimensions(rows, columns, pageY, pageX, height, width));
  },
  setRef: (ref) => {
    dispatch(setReference(ref));
  },
  sort: (index, direction, ref) => {
    dispatch(sortRows(index, direction, ref));
  },
  toggleTips: () => {
    dispatch(toggleTooltips());
  },
  updatePlotXY: (fixed, translate) => {
    dispatch(updatePlotPosition(fixed, translate));
  },
  updateXY: (x, y) => {
    dispatch(updatePosition(x, y));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreConnection);

export default ConnectedContainer;
