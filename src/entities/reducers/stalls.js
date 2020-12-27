import { handleActions } from 'redux-actions';
import { PUBLISH, FETCH_RECORDS, CLEAR_RECORDS } from '../actions/stalls';

export default handleActions({
  [PUBLISH]: (state, { payload }) => {
    return [
      ...state,
      data,
    ];
  },
  [FETCH_RECORDS]: (state, { payload }) => ({
    ...state,
    count: payload.count,
    data: [...(state.data || []), ...payload.data]
  }),
  [CLEAR_RECORDS]: (state) => ({
    ...state,
    count: undefined,
    data: [],
  }),
}, {});