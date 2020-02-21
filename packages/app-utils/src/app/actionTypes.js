// @flow
import { createActionTypes } from '@expandorg/redux';

/* eslint-disable  import/prefer-default-export */

export const appActionTypes = createActionTypes('app', {
  INIT: null,
  REFRESH: null,

  NOTIFICATION_ADD: null,
  NOTIFICATION_REMOVE: null,
});

export const userActionTypes = createActionTypes('user', {
  UPDATED: null,
});
