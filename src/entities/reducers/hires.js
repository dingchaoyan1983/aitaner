import { handleActions } from 'redux-actions';
import { PUBLISH, FETCH_RECORDS } from '../actions/hires';

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
  })
}, {});