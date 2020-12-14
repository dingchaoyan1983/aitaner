import { handleActions } from 'redux-actions';
import { PUBLISH } from '../actions/fairs';

export default handleActions({
  [PUBLISH]: (state, { payload }) => {
    return [
      ...state,
      payload,
    ];
  },
}, []);