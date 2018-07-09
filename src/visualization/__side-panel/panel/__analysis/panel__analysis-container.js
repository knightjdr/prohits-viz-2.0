import React, { Component } from 'react';

import Analysis from './panel__analysis';

class AnalysisContainer extends Component {
  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.state = {
      canPasteContext: true,
      columns: ['gene-a', 'gene-b', 'gene-c'],
      contextPos: {
        left: 0,
        top: 0,
      },
      rows: ['gene-d', 'gene-e', 'gene-f'],
      selectedColumns: [],
      selectedRows: [],
      showContext: false,
    };
  }
  closeContextMenu = () => {
    this.setState({
      showContext: false,
    });
  }
  openContextMenu = (e, canPaste) => {
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
      showContext: true,
    });
  }
  render() {
    return (
      <div ref={this.elementRef}>
        <Analysis
          canPasteContext={this.state.canPasteContext}
          closeContextMenu={this.closeContextMenu}
          columns={this.state.columns}
          contextPos={this.state.contextPos}
          openContextMenu={this.openContextMenu}
          rows={this.state.rows}
          selectedColumns={this.state.selectedColumns}
          selectedRows={this.state.selectedRows}
          showContext={this.state.showContext}
        />
      </div>
    );
  }
}

export default AnalysisContainer;
