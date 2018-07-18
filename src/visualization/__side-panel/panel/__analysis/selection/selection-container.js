import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CopyToClipboard from '../../../../../helpers/copy-to-clipboard';
import GeneSelector from '../../../../../state/selectors/visualization/genes-selector';
import Selection from './selection';
import { storeSelections } from '../../../../../state/set/visualization/genes-actions';

export class SelectionContainer extends Component {
  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.state = {
      canPasteContext: true,
      columns: [...this.props.genes.columns],
      columnsHighlighted: [],
      columnsSelected: [...this.props.genes.columnsSelected],
      columnsSelectedHighlighted: [],
      contextPos: {
        left: 0,
        top: 0,
      },
      contextTarget: null,
      pasteText: '',
      pasteType: null,
      rows: [...this.props.genes.rows],
      rowsHighlighted: [],
      rowsSelected: [...this.props.genes.rowsSelected],
      rowsSelectedHighlighted: [],
      showContext: false,
      showModal: false,
    };
  }
  componentWillUnmount = () => {
    this.props.storeSelections({
      columns: this.state.columns,
      columnsSelected: this.state.columnsSelected,
      rows: this.state.rows,
      rowsSelected: this.state.rowsSelected,
    });
  }
  arrangeSelected = (target, by) => {
    const selected = by > 0 ?
      [...this.state[`${target}Highlighted`]].reverse()
      :
      [...this.state[`${target}Highlighted`]];
    const source = [...this.state[target]];
    selected.forEach((value) => {
      const currIndex = source.indexOf(value);
      source.splice(currIndex + by < 0 ? 0 : currIndex + by, 0, source.splice(currIndex, 1)[0]);
    });
    const newState = {};
    newState[target] = source;
    this.setState(newState);
  }
  closeContextMenu = () => {
    this.setState({
      showContext: false,
    });
  }
  copyAll = () => {
    const copyList = this.state[this.state.contextTarget].join('\r\n');
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
  listSwap = (source, target, sort, sortBy) => {
    const newState = {};
    // Add highlighted genes in source to target list and sort if requested.
    newState[target] = [
      ...this.state[target],
      ...this.state[`${source}Highlighted`],
    ];
    newState[target] = sort ?
      newState[target].sort((a, b) => (
        this.props.genes[sortBy][a] - this.props.genes[sortBy][b]
      ))
      : newState[target];
    // Remove highlighted genes from source list.
    newState[source] = this.state[source].filter(gene => (
      !this.state[`${source}Highlighted`].includes(gene)
    ));
    // Clear highlighted genes.
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
      contextPos: {
        left: left > 210 ? 210 : left,
        top,
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
    /* Convert paste text to array, remove duplicates and remove any genes not
    ** in corresponding source list. */
    const list = [...new Set(this.state.pasteText.split(/[\s+,+]+/))]
      .filter(item => (this.state[source].includes(item)));
    // Remove new genes from source list.
    const newState = {};
    newState[source] = this.state[source].filter(item => (!list.includes(item)));
    // Append to list.
    newState[`${source}Selected`] = [
      ...this.state[`${source}Selected`],
      ...list,
    ];
    this.setState({
      ...newState,
      pasteText: '',
      pasteType: null,
      showModal: false,
    });
  }
  pasteReplace = () => {
    // Get name of map and full list of genes.
    const mapName = `${this.state.contextTarget.replace('sSelected', '')}Map`;
    const genes = Object.keys(this.props.genes[mapName]);
    /* Convert paste text to array, remove duplicates and remove any genes not
    ** in full gene list. */
    const list = [...new Set(this.state.pasteText.split(/[\s,]+/))]
      .filter(item => (genes.includes(item)));
    // Source list name.
    const source = this.state.contextTarget.replace('Selected', '');
    // Add items that will be replaced back to source list and sort it.
    const newState = {};
    newState[source] = [
      ...this.state[source].filter(item => (!list.includes(item))),
      ...this.state[`${source}Selected`].filter(item => (!list.includes(item))),
    ].sort((a, b) => (
      this.props.genes[mapName][a] - this.props.genes[mapName][b]
    ));
    newState[`${source}Selected`] = list;
    this.setState({
      ...newState,
      pasteText: '',
      pasteType: null,
      showModal: false,
    });
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
  render() {
    return (
      <div ref={this.elementRef}>
        <Selection
          arrangeSelected={this.arrangeSelected}
          canPasteContext={this.state.canPasteContext}
          closeContextMenu={this.closeContextMenu}
          columns={this.state.columns}
          columnsSelected={this.state.columnsSelected}
          contextPos={this.state.contextPos}
          copyAll={this.copyAll}
          copyList={this.state.copyList}
          copySelected={this.copySelected}
          listSelect={this.listSelect}
          listSwap={this.listSwap}
          openContextMenu={this.openContextMenu}
          paste={this.paste}
          pasteText={this.state.pasteText}
          rows={this.state.rows}
          rowsSelected={this.state.rowsSelected}
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
  genes: PropTypes.shape({
    columnMap: PropTypes.shape({}),
    columns: PropTypes.arrayOf(PropTypes.string),
    columnsSelected: PropTypes.arrayOf(PropTypes.string),
    rowMap: PropTypes.shape({}),
    rows: PropTypes.arrayOf(PropTypes.string),
    rowsSelected: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  storeSelections: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  genes: GeneSelector(state),
});


/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  storeSelections: (selections) => {
    dispatch(storeSelections(selections));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectionContainer);

export default ConnectedContainer;
