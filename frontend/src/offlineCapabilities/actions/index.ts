import { EnableAction, DisableAction } from '../interfaces';

export const serviceWorkerEnabled = () : EnableAction => ({
  type: 'CACHE_SERVICE_WORKER_ENABLED',
});

export const serviceWorkerDisabled = () : DisableAction => ({
  type: 'CACHE_SERVICE_WORKER_DISABLED',
});
