import { combineReducers } from 'redux';
import session from './reducers/session';
import fairs from './reducers/fairs';
import stalls from './reducers/stalls';
import hires from './reducers/hires';

export default combineReducers({
  session,
  fairs,
  stalls,
  hires,
}); 