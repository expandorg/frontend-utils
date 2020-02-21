// @flow

import { call, put, getContext } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { ApiError } from '@expandorg/api-client';

import { type ReduxAction } from '../types.flow';

export default function* handleAsyncCall({
  type,
  asyncCall,
  payload,
  meta,
}: ReduxAction): Iterable<any> {
  try {
    if (meta && meta.validation) {
      const services = yield getContext('services');
      // $FlowFixMe
      const validate = services.resolve('validate');

      const errors = validate(payload, meta.validation);
      if (errors) {
        throw ApiError.validation(errors);
      }
    }
    if (!asyncCall) {
      return;
    }
    let result = yield call(asyncCall, payload);

    if (meta && meta.schema) {
      result = normalize(result, meta.schema);
    }
    yield put({
      type: `${type}_COMPLETE`,
      payload: result,
      complete: true,
      meta,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: `${type}_FAILED`,
      payload: error,
      failed: true,
      meta,
    });
  }
}
