const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  let newConfig = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  newConfig = rewireLess.withLoaderOptions({
    modifyVars: {
      '@accent-color': '#763626',
      '@primary-color': '#336B87',
    },
  })(newConfig, env);
  return newConfig;
};
