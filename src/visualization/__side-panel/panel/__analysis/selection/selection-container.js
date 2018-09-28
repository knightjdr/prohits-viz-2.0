import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import columnSelector from '../../../../../state/selectors/visualization/columns-selector';
import CopyToClipboard from '../../../../../helpers/copy-to-clipboard';
import FindClosest from '../../../../../helpers/find-closest';
import GeneSelector from '../../../../../state/selectors/visualization/genes-selector';
import PositionSelector from '../../../../../state/selectors/visualization/position-selector';
import rowNameSelector from '../../../../../state/selectors/visualization/row-name-selector';
import Selection from './selection';
import SortSelector from '../../../../../state/selectors/visualization/sort-selector';
import { setSelections, updateGeneList } from '../../../../../state/set/visualization/genes-actions';

export class SelectionContainer extends Component {
  constructor(props) {
    super(props);
    this.columnRef = React.createRef();
    this.elementRef = React.createRef();
    this.rowRef = React.createRef();
    this.state = {
      canPasteContext: true,
      columnsHighlighted: [],
      columnsSelectedHighlighted: [],
      contextEvent: null,
      contextTarget: null,
      pasteText: '',
      pasteType: null,
      rowsHighlighted: [],
      rowsSelectedHighlighted: [],
      showContext: false,
      showModal: false,
    };
  }
  componentDidMount = () => {
    const {
      columns,
      genes,
      position,
      rows,
    } = this.props;
    // Run this on a delay to wait for panel to open.
    setTimeout(() => { this.scrollToPosition(columns.names, rows, genes, position); }, 500);
  }
  componentWillReceiveProps = (nextProps) => {
    this.updatePosition(nextProps, this.props.position, this.props.sortInfo);
  }
  setHighlighted = (arr, index) => arr[index]
  arrangeSelected = (target, by) => {
    // Reverse order of highlighted items if we are moving things down the list.
    const selected = by > 0 ?
      [...this.state[`${target}Highlighted`]].reverse()
      :
      [...this.state[`${target}Highlighted`]];

    // Update position of highlighted items in source list.
    const source = [...this.props.genes[target]];
    selected.forEach((value) => {
      const currIndex = source.indexOf(value);
      source.splice(currIndex + by < 0 ? 0 : currIndex + by, 0, source.splice(currIndex, 1)[0]);
    });
    const selections = {};
    selections[target] = source;
    this.props.updateGeneList(selections);
  }
  closeContextMenu = () => {
    this.setState({
      contextEvent: null,
      showContext: false,
    });
  }
  copyAll = () => {
    const copyList = this.props.genes[this.state.contextTarget].join('\r\n');
    if (copyList.length > 0) {
      CopyToClipboard(copyList);
    }
    this.closeContextMenu();
  }
  copySelected = () => {
    const copyList = this.state[`${this.state.contextTarget}Highlighted`].join('\r\n');
    if (copyList.length > 0) {
      CopyToClipboard(copyList);
    }
    this.closeContextMenu();
  }
  listSelect = (e, target) => {
    const highlighted = [...e.target.options]
      .filter(option => (option.selected))
      .map(option => option.value);
    const newState = {};
    newState[`${target}Highlighted`] = highlighted;
    this.setState(newState);
  }
  listSwap = (source, target, sortBy) => {
    this.props.setSelections(this.state[`${source}Highlighted`], source, target, false, sortBy);
    // Clear highlighted genes.
    const newState = {};
    newState[`${source}Highlighted`] = [];
    this.setState(newState);
  }
  openContextMenu = (e, canPaste, target) => {
    e.preventDefault();
    const rect = this.elementRef.current.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    this.setState({
      canPasteContext: canPaste,
      contextEvent: {
        clientX: left,
        clientY: top,
      },
      contextTarget: target,
      showContext: true,
    });
  }
  paste = () => {
    if (this.state.pasteText) {
      if (this.state.pasteType === 'pasteAppend') {
        this.pasteAppend();
      } else {
        this.pasteReplace();
      }
    } else {
      this.setState({
        pasteType: null,
        showModal: false,
      });
    }
  }
  pasteAppend = () => {
    // Source list name.
    const source = this.state.contextTarget.replace('Selected', '');

    // Convert paste text to array.
    const list = [...new Set(this.state.pasteText.split(/[\s+,+]+/))];

    this.props.setSelections(list, source, `${source}Selected`, false);
    this.setState({
      pasteText: '',
      pasteType: null,
      showModal: false,
    });
  }
  pasteReplace = () => {
    // Source list name.
    const source = this.state.contextTarget.replace('Selected', '');

    // Get name of map.
    const mapName = `${this.state.contextTarget.replace('sSelected', '')}Map`;

    // Convert paste text to array.
    const list = [...new Set(this.state.pasteText.split(/[\s,]+/))];

    this.props.setSelections(list, source, `${source}Selected`, true, mapName);
    this.setState({
      pasteText: '',
      pasteType: null,
      showModal: false,
    });
  }
  scrollToPosition = (columns, rows, genes, position) => {
    // Find closest item to current viewport position.
    const columnIndex = FindClosest(columns, position.x, columns.length, genes.columns);
    const rowIndex = FindClosest(rows, position.y, rows.length, genes.rows);

    // Get option from closest index and add one to account for placeholder.
    if (this.columnRef.current) {
      // Need to ensure component hasn't unmounted before trying to assign new value.
      const colSelectTop = this.columnRef.current.offsetTop;
      const colOptionTop = [...this.columnRef.current.options][columnIndex + 1].offsetTop;
      this.columnRef.current.scrollTop = colOptionTop - colSelectTop;
    }
    if (this.rowRef.current) {
      const rowSelectTop = this.rowRef.current.offsetTop;
      const rowOptionTop = [...this.rowRef.current.options][rowIndex + 1].offsetTop;
      this.rowRef.current.scrollTop = rowOptionTop - rowSelectTop;
    }
  }
  toggleModal = (pasteType) => {
    this.setState(({ showModal }) => ({
      pasteText: '',
      pasteType,
      showContext: false,
      showModal: !showModal,
    }));
  }
  updatePasteList = (e) => {
    this.setState({
      pasteText: e.target.value,
    });
  }
  updatePosition = ({
    columns,
    genes,
    position,
    rows,
    sortInfo,
  }, prevPosition, prevSortInfo) => {
    if (
      position.x !== prevPosition.x ||
      position.y !== prevPosition.y ||
      sortInfo.id !== prevSortInfo.id
    ) {
      this.scrollToPosition(columns.names, rows, genes, position);
    }
  }
  render() {
    return (
      <div ref={this.elementRef}>
        <Selection
          arrangeSelected={this.arrangeSelected}
          canPasteContext={this.state.canPasteContext}
          closeContextMenu={this.closeContextMenu}
          columnRef={this.columnRef}
          columns={this.props.genes.columns}
          columnsSelected={this.props.genes.columnsSelected}
          contextEvent={this.state.contextEvent}
          copyAll={this.copyAll}
          copyList={this.state.copyList}
          copySelected={this.copySelected}
          listSelect={this.listSelect}
          listSwap={this.listSwap}
          openContextMenu={this.openContextMenu}
          paste={this.paste}
          pasteText={this.state.pasteText}
          rowRef={this.rowRef}
          rows={this.props.genes.rows}
          rowsSelected={this.props.genes.rowsSelected}
          showContext={this.state.showContext}
          showModal={this.state.showModal}
          toggleModal={this.toggleModal}
          updatePasteList={this.updatePasteList}
        />
      </div>
    );
  }
}

SelectionContainer.propTypes = {
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  genes: PropTypes.shape({
    columnMap: PropTypes.shape({}),
    columns: PropTypes.arrayOf(PropTypes.string),
    columnsSelected: PropTypes.arrayOf(PropTypes.string),
    rowMap: PropTypes.shape({}),
    rows: PropTypes.arrayOf(PropTypes.string),
    rowsSelected: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelections: PropTypes.func.isRequired,
  sortInfo: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  updateGeneList: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  columns: columnSelector(state),
  genes: GeneSelector(state),
  position: PositionSelector(state),
  rows: rowNameSelector(state),
  sortInfo: SortSelector(state),
});


/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  setSelections: (list, source, target, replace, sort, sortBy) => {
    dispatch(setSelections(list, source, target, replace, sort, sortBy));
  },
  updateGeneList: (selections) => {
    dispatch(updateGeneList(selections));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectionContainer);

export default ConnectedContainer;
