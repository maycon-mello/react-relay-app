/*
 * Only one instance of React should be used in an application
 * We must require React and ReactDOM from the application node_modules
 */
import React from '<%ROOT_PATH%>/node_modules/react';
import { render } from '<%ROOT_PATH%>/node_modules/react-dom';

// This file is a linking to the application entry point
import app from './reactHotApp.tmp';

import { AppContainer } from 'react-hot-loader';

const rootEl = document.getElementById('<%WRAPPER_ID%>');

render(
  React.createElement(AppContainer, null, app),
  rootEl
);

if (module.hot) {
  module.hot.accept('./reactHotApp.tmp', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    var NextApp = require('./reactHotApp.tmp').default;

    render(
      React.createElement(AppContainer, null, NextApp),
      rootEl
    );
  });
}
