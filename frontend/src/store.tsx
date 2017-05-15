import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore, autoRehydrate } from 'redux-persist';

import { reducer as offlineCapabilities } from './offlineCapabilities';
import { reducer as manga } from './manga';

const reducers = combineReducers({
  offlineCapabilities,
  manga,
});

const composeWithMiddleware = composeWithDevTools(
  applyMiddleware(thunk, promiseMiddleware()),
  autoRehydrate()
);

const store = composeWithMiddleware(createStore)(reducers);

persistStore(store);

export default store;
