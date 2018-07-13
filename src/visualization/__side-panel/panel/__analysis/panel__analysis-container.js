import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Analysis from './panel__analysis';
import CopyToClipboard from '../../../../helpers/copy-to-clipboard';

class AnalysisContainer extends Component {
  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.state = {
      canPasteContext: true,
      columnMap: this.mapList(this.props.columns),
      columns: [...this.props.columns],
      columnsHighlighted: [],
      columnsSelected: [],
      columnsSelectedHighlighted: [],
      contextPos: {
        left: 0,
        top: 0,
      },
      contextTarget: null,
      pasteText: '',
      pasteType: null,
      rowMap: this.mapList(this.props.rows),
      rows: [...this.props.rows],
      rowsHighlighted: [],
      rowsSelected: [],
      rowsSelectedHighlighted: [],
      showContext: false,
      showModal: false,
    };
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
    CopyToClipboard(copyList);
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
    const newState = {};
    // Add highlighted genes in source to target list and sort based on map.
    newState[target] = [
      ...this.state[target],
      ...this.state[`${source}Highlighted`],
    ].sort((a, b) => (
      this.state[sortBy][a] - this.state[sortBy][b]
    ));
    // Remove highlighted genes from source list.
    newState[source] = this.state[source].filter(gene => (
      !this.state[`${source}Highlighted`].includes(gene)
    ));
    // Clear highlighted genes.
    newState[`${source}Highlighted`] = [];
    this.setState(newState);
  }
  mapList = list => (
    list.reduce(((obj, gene, index) => {
      const newGene = {};
      newGene[gene] = index;
      return { ...obj, ...newGene };
    }), {})
  )
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
    if (this.state.pasteType === 'pasteAppend') {
      this.pasteAppend();
    } else {
      this.pasteReplace();
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
    const genes = Object.keys(this.state[mapName]);
    /* Convert paste text to array, remove duplicates and remove any genes not
    ** in full gene list. */
    const list = [...new Set(this.state.pasteText.split(/[\s+,+]+/))]
      .filter(item => (genes.includes(item)));
    // Source list name.
    const source = this.state.contextTarget.replace('Selected', '');
    // Add items that will be replaced back to source list and sort it.
    const newState = {};
    newState[source] = [
      ...this.state[source].filter(item => (!list.includes(item))),
      ...this.state[`${source}Selected`].filter(item => (!list.includes(item))),
    ].sort((a, b) => (
      this.state[mapName][a] - this.state[mapName][b]
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
        <Analysis
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

AnalysisContainer.defaultProps = {
  columns: ['gene-a', 'gene-b', 'gene-c'],
  rows: ['gene-d', 'gene-e', 'gene-f'],
};

AnalysisContainer.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.string),
};

export default AnalysisContainer;
