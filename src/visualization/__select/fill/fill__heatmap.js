import fillAnnotations from './fill__annotations';
import fillColumns from './fill__columns';
import fillGenes from './fill__genes';
import fillGo from './fill__go';
import fillMap from './fill__minimap';
import fillMarkers from './fill__markers';
import fillParameters from './fill__parameters';
import fillPosition from './fill__position';
import fillRows from './fill__rows';
import fillSave from './fill__save';
import fillSearch from './fill__search';
import fillSettings from './fill__settings';
import fillTabs from './fill__tabs';

const Heatmap = (name, file) => {
  const {
    annotations,
    columns,
    genes,
    go,
    markers,
    minimap,
    parameters,
    position,
    positionCustomize,
    rows,
    save,
    search,
    settings,
    tabs,
  } = file;
  return {
    annotations: fillAnnotations(annotations),
    columns: fillColumns(columns),
    genes: fillGenes(columns, genes, rows),
    go: fillGo(go),
    markers: fillMarkers(markers),
    minimap: fillMap(minimap),
    parameters: fillParameters(parameters),
    position: fillPosition(position),
    positionCustomize: fillPosition(positionCustomize),
    rows: fillRows(rows),
    save: fillSave(save),
    search: fillSearch(search),
    settings: fillSettings(settings),
    tabs: fillTabs(tabs),
  };
};
export default Heatmap;
