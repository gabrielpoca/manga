import { Reducer, Action } from '../interfaces';

const initialState = { serviceWorkerEnabled: false };

export default (state: Reducer = initialState, action: Action) => {
  switch (action.type) {
    case 'CACHE_SERVICE_WORKER_ENABLED': {
      return { ...state, serviceWorkerEnabled: true };
    }
    case 'CACHE_SERVICE_WORKER_DISABLED': {
      return { ...state, serviceWorkerEnabled: true };
    }
    default: {
      return state;
    }
  }
};

export const canWorkOffline = (state: { offlineCapabilities: Reducer }) => {
  return state.offlineCapabilities.serviceWorkerEnabled;
};
