// @flow
import { type ReduxAction } from '../types.flow';

export default function normalizedItemsReducer(entityName: string) {
  return (state: Object = {}, action: ReduxAction) => {
    if (action.payload) {
      const { entities } = action.payload;
      if (entities && entities[entityName]) {
        return { ...state, ...entities[entityName] };
      }
    }
    return state;
  };
}
