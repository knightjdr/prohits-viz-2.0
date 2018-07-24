import Annotations from './fill__annotations';
import Columns from './fill__columns';
import Genes from './fill__genes';
import Map from './fill__map';
import Markers from './fill__markers';
import Position from './fill__position';
import Rows from './fill__rows';
import Save from './fill__save';
import Settings from './fill__settings';

const Heatmap = (name, file) => {
  const {
    annotations,
    columns,
    genes,
    markers,
    minimap,
    params,
    position,
    rows,
    save,
    settings,
  } = file;
  return {
    annotations: Annotations(annotations),
    columns: Columns(columns),
    genes: Genes(columns, genes, rows),
    markers: Markers(markers),
    minimap: Map(minimap),
    params: {
      ...params,
      /* Use the session name (file.name) by default or the name specified
      ** in the params or lastly the file name. */
      name: file.name || params.name || name,
    },
    position: Position(position),
    rows: Rows(rows),
    save: Save(save),
    settings: Settings(params.imageType, settings),
  };
};
export default Heatmap;
