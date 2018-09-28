import fillAnnotations from './fill__annotations';
import fillColumns from './fill__columns';
import fillCustomize from './fill__customize';
import fillGenes from './fill__genes';
import fillGo from './fill__go';
import fillMap from './fill__minimap';
import fillMarkers from './fill__markers';
import fillPanel from './fill__panel';
import fillParameters from './fill__parameters';
import fillPosition from './fill__position';
import fillRows from './fill__rows';
import fillSave from './fill__save';
import fillSearch from './fill__search';
import fillSettings from './fill__settings';
import fillTabs from './fill__tabs';
import fillVizAnalysis from './fill__viz-analysis';
import fillVizAnalysisForm from './fill__viz-analysis-form';

const heatmap = (name, file) => {
  const {
    annotations,
    columns,
    customize,
    genes,
    go,
    markers,
    minimap,
    panel,
    parameters,
    position,
    positionCustomize,
    rows,
    save,
    search,
    settings,
    tabs,
    vizanalysis,
    vizanalysisform,
  } = file;
  return {
    annotations: fillAnnotations(annotations),
    columns: fillColumns(columns),
    customize: fillCustomize(customize),
    genes: fillGenes(columns, genes, rows),
    go: fillGo(go),
    markers: fillMarkers(markers),
    minimap: fillMap(minimap),
    panel: fillPanel(panel),
    parameters: fillParameters(parameters, name),
    position: fillPosition(position),
    positionCustomize: fillPosition(positionCustomize),
    rows: fillRows(rows),
    save: fillSave(save),
    search: fillSearch(search),
    settings: fillSettings(settings),
    tabs: fillTabs(tabs),
    vizanalysis: fillVizAnalysis(vizanalysis),
    vizanalysisform: fillVizAnalysisForm(vizanalysisform),
  };
};
export default heatmap;
