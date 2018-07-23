import Annotations from './fill__dotplot-annotations';
import Columns from './fill__dotplot-columns';
import Genes from './fill__dotplot-genes';
import Map from './fill__dotplot-map';
import Markers from './fill__dotplot-markers';
import Position from './fill__dotplot-position';
import Rows from './fill__dotplot-rows';
import Save from './fill__dotplot-save';
import Settings from './fill__dotplot-settings';

const Dotplot = (name, file) => {
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
export default Dotplot;
