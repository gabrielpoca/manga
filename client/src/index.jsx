import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import apolloClient from './apollo';
import { store, persistor } from './store';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
