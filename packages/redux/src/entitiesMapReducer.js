// @flow
import { type ReduxAction } from '../types.flow';

export default function entitiesMapReducer(
  actionTypes: Array<string>,
  idSelector: Function = action => action.meta.id
) {
  return (reduce: Function) => (state: Object = {}, action: ReduxAction) => {
    if (actionTypes.indexOf(action.type) !== -1) {
      const id = idSelector(action);
      return {
        ...state,
        [id]: reduce(state[id], action),
      };
    }
    return state;
  };
}
