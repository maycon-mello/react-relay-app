const fs = require('fs');
const express = require( 'express');
const webpack = require( 'webpack');
const WebpackDevServer = require( 'webpack-dev-server');

const updateSchema = require('./tools/updateSchema');
const config = require('./config.tmp.json');
const webPackDevConfig = require('./webpack/webpack.dev.config.js');

function watch() {
  fs.watch(config.schema.watchPath, { encoding: 'buffer' }, (eventType, filename) => {
    if (!(/schema\.(json|graphql)/).test(filename.toString())) {
      updateSchema();
    }
  });
}

function run(compiler) {
  let app = new WebpackDevServer(compiler, {
    publicPath: config.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      assets: false,
      chunks: false,
    }
  });

  // Serve static resources
  app.use('/', express.static(config.staticsPath));
  app.listen(config.port, () => {
    console.log(`App is now running on http://localhost:${config.port}`);
  });
}

function serve(config) {
  let compiler = webpack(webPackDevConfig);

  updateSchema().then(() => run(compiler));
}

module.exports = serve
