import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
const runtime = require('serviceworker-webpack-plugin/lib/runtime');

import { actions } from './offlineCapabilities';
import App from './App';
import store from './store';

if ('serviceWorker' in navigator) {
  setTimeout(() => {
    runtime.register()
      .then(() => store.dispatch(actions.serviceWorkerEnabled()))
      .catch((error: string) => store.dispatch(actions.serviceWorkerDisabled()));
  }, 0);
}

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
