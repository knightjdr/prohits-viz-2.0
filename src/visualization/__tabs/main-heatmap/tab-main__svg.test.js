import { shallow } from 'enzyme';

import renderSvg from './tab-main__svg';

jest.mock('./tab-main__store-connection');

const openContextMenu = jest.fn();

describe('Main heatmap svg', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      renderSvg({
        addMarkerBox: jest.fn(),
        annotations: {},
        closeContextMenu: jest.fn(),
        columns: {},
        contextTarget: '',
        dimensions: {
          pageX: 10,
          pageY: 20,
        },
        display: {
          plotTranslate: 0,
          selectionBox: false,
          tooltips: false,
        },
        fixLeft: false,
        handleClick: jest.fn(),
        height: {
          arrowsY: true,
        },
        markers: {},
        openContextMenu,
        panel: false,
        position: {
          x: 0,
          y: 0,
        },
        reset: jest.fn(),
        rowNames: [],
        rows: [],
        scoreType: 'lte',
        search: {},
        setContainerRef: {},
        setSelections: jest.fn(),
        setRef: jest.fn(),
        setReference: jest.fn(),
        setSelectedGenes: jest.fn(),
        settings: {
          abundanceCap: 50,
          cellSize: 20,
          edgeColor: 'blueBlack',
          fillColor: 'blueBlack',
          imageType: 'dotplot',
          invertColor: false,
          minAbundance: 0,
          primaryFilter: 0.01,
          secondaryFilter: 0.5,
        },
        showContext: '',
        sort: jest.fn,
        sortInfo: {},
        sortRows: jest.fn(),
        tooltip: {},
        toggleSelection: jest.fn(),
        toggleTips: jest.fn(),
        toggleTooltip: jest.fn(),
        translateLeft: jest.fn(),
        updateAnnotation: jest.fn(),
        updatePlotXY: jest.fn(),
        updateXY: jest.fn(),
        width: {
          arrowsX: false,
          canTranslate: false,
          wrapper: 500,
        },
      }),
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
