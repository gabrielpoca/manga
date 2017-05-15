export interface Reducer {
  serviceWorkerEnabled: boolean;
}

export interface EnableAction {
  type: 'CACHE_SERVICE_WORKER_ENABLED';
}

export interface DisableAction {
  type: 'CACHE_SERVICE_WORKER_DISABLED';
}

export type Action = EnableAction | DisableAction;
