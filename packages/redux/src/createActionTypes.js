// @flow
import { keyMirror } from '@expandorg/utils';

const createActionTypes = (scope: string, actionTypes: Object) =>
  keyMirror(actionTypes, key => `${scope}/${key}`);

export default createActionTypes;
