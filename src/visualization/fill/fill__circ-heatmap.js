import fillAvailablePlots from './fill__available-plots';
import fillCircHeatmapSettings from './fill__circ-heatmap-settings';
import fillGo from './fill__go';
import fillPanel from './fill__panel';
import fillParameters from './fill__parameters';
import fillPlot from './fill__plot';
import fillSave from './fill__save';
import fillSearch from './fill__search';
import fillSettings from './fill__settings';
import fillTabs from './fill__tabs';
import fillVizAnalysis from './fill__viz-analysis';
import fillVizAnalysisForm from './fill__viz-analysis-form';

const circHeatmap = (name, file) => {
  const {
    availablePlots,
    circHeatmapSettings,
    go,
    panel,
    parameters,
    plot,
    save,
    search,
    settings,
    tabs,
    vizanalysis,
    vizanalysisform,
  } = file;
  return {
    availablePlots: fillAvailablePlots(availablePlots),
    circHeatmapSettings: fillCircHeatmapSettings(circHeatmapSettings),
    go: fillGo(go),
    panel: fillPanel(panel),
    parameters: fillParameters(parameters, name),
    plot: fillPlot(plot, availablePlots),
    save: fillSave(save),
    search: fillSearch(search),
    settings: fillSettings(settings, parameters.imageType),
    tabs: fillTabs(tabs),
    vizanalysis: fillVizAnalysis(vizanalysis),
    vizanalysisform: fillVizAnalysisForm(vizanalysisform),
  };
};

export default circHeatmap;
