import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import annotationSelector from '../../../state/selectors/visualization/annotation-selector';
import columnSelector from '../../../state/selectors/visualization/columns-selector';
import dimensionSelector from '../../../state/selectors/visualization/dimension-selector';
import markerSelector from '../../../state/selectors/visualization/marker-selector';
import panelSelector from '../../../state/selectors/visualization/panel-selector';
import positionSelector from '../../../state/selectors/visualization/position-selector';
import rowNameSelector from '../../../state/selectors/visualization/row-name-selector';
import rowSelector from '../../../state/selectors/visualization/rows-selector';
import searchSelector from '../../../state/selectors/visualization/search-selector';
import { settingSelector } from '../../../state/selectors/visualization/settings-selector';
import sortSeletor from '../../../state/selectors/visualization/sort-selector';
import { addMarker } from '../../../state/set/visualization/marker-actions';
import { displaySelector } from '../../../state/selectors/visualization/display-selector';
import { parameterSelectorProp } from '../../../state/selectors/visualization/params-selector';
import { setDimensions } from '../../../state/set/visualization/dimension-actions';
import { setReference } from '../../../state/set/visualization/columns-actions';
import { setSelections } from '../../../state/set/visualization/genes-actions';
import { sortDefault, sortRows } from '../../../state/set/visualization/rows-actions';
import {
  toggleSelectionBox,
  toggleTooltips,
  updatePlotPosition,
} from '../../../state/set/visualization/display-actions';
import { updateList } from '../../../state/set/visualization/annotation-actions';
import { updatePosition } from '../../../state/set/visualization/position-actions';

export const MainWithState = ({
  addMarkerBox,
  annotations,
  columns,
  dimensions,
  display,
  markers,
  name,
  panel,
  position,
  renderProp,
  reset,
  rowNames,
  rows,
  scoreType,
  search,
  setDims,
  setRef,
  setSelectedGenes,
  settings,
  sort,
  sortInfo,
  toggleSelection,
  toggleTips,
  updateAnnotation,
  updatePlotXY,
  updateXY,
}) => renderProp({
  addMarkerBox,
  annotations,
  columns,
  dimensions,
  display,
  markers,
  name,
  panel,
  position,
  reset,
  rowNames,
  rows,
  scoreType,
  search,
  setDims,
  setRef,
  setSelectedGenes,
  settings,
  sort,
  sortInfo,
  toggleSelection,
  toggleTips,
  updateAnnotation,
  updatePlotXY,
  updateXY,
});

MainWithState.propTypes = {
  addMarkerBox: PropTypes.func.isRequired,
  annotations: PropTypes.shape({
    fontSize: PropTypes.number,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ),
    show: PropTypes.bool,
  }).isRequired,
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
    ref: PropTypes.string,
  }).isRequired,
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
    selectionBox: PropTypes.bool,
    tooltips: PropTypes.bool,
  }).isRequired,
  markers: PropTypes.shape({
    color: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    show: PropTypes.bool,
  }).isRequired,
  name: PropTypes.string,
  panel: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  renderProp: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  rowNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.number,
        }),
      ),
      name: PropTypes.string,
    }),
  ).isRequired,
  scoreType: PropTypes.string.isRequired,
  search: PropTypes.shape({
    columns: PropTypes.shape({}),
    match: PropTypes.bool,
    term: PropTypes.string,
  }).isRequired,
  setRef: PropTypes.func.isRequired,
  setSelectedGenes: PropTypes.func.isRequired,
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
  sortInfo: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  toggleSelection: PropTypes.func.isRequired,
  toggleTips: PropTypes.func.isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  updatePlotXY: PropTypes.func.isRequired,
  updateXY: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  annotations: annotationSelector(state),
  columns: columnSelector(state),
  dimensions: dimensionSelector(state),
  display: displaySelector(state),
  markers: markerSelector(state),
  name: parameterSelectorProp(state, 'name'),
  panel: panelSelector(state),
  position: positionSelector(state),
  rowNames: rowNameSelector(state),
  rows: rowSelector(state),
  scoreType: parameterSelectorProp(state, 'scoreType'),
  search: searchSelector(state),
  settings: settingSelector(state),
  sortInfo: sortSeletor(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  addMarkerBox: (height, width, x, y) => {
    dispatch(addMarker(height, width, x, y));
  },
  reset: () => {
    dispatch(sortDefault());
  },
  setDims: (rows, columns, pageY, pageX, height, width) => {
    dispatch(setDimensions(rows, columns, pageY, pageX, height, width));
  },
  setRef: (ref) => {
    dispatch(setReference(ref));
  },
  setSelectedGenes: (list, source, target, replace, sortBy) => {
    dispatch(setSelections(list, source, target, replace, sortBy));
  },
  sort: (index, direction, ref) => {
    dispatch(sortRows(index, direction, ref));
  },
  toggleSelection: () => {
    dispatch(toggleSelectionBox());
  },
  toggleTips: () => {
    dispatch(toggleTooltips());
  },
  updateAnnotation: (index, x, y) => {
    dispatch(updateList(index, x, y));
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
)(MainWithState);

export default ConnectedContainer;
