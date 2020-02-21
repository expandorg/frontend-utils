// @flow
import { call, put, take, race } from 'redux-saga/effects';
import { delay } from '@expandorg/utils';
import { appActionTypes, userActionTypes } from './actionTypes';

export const refreshSaga = () => ({
  type: appActionTypes.REFRESH,
  payload: null,
});

export const initSaga = () => ({
  type: appActionTypes.INIT,
  payload: null,
});

export const userUpdatedSaga = (data: mixed, params: mixed) => ({
  type: userActionTypes.UPDATED,
  payload: { data, params },
});

const NOTIFICATION_TIMEOUT = 3000;

declare type NotificationType = 'error' | 'success' | 'warning' | 'message';

export const addNotification = (type: NotificationType, message: string) => ({
  type: appActionTypes.NOTIFICATION_ADD,
  payload: { type, message },
});

export const clearNotification = () => ({
  type: appActionTypes.NOTIFICATION_REMOVE,
  payload: null,
});

export function* handldNotificationAdded(): any {
  const { timeout } = yield race({
    timeout: call(delay, NOTIFICATION_TIMEOUT),
    clear: take(appActionTypes.NOTIFICATION_REMOVE),
  });
  if (timeout) {
    yield put(clearNotification());
  }
}
