import { createAction } from 'redux-actions';
import { actionTypeCreator } from '../../utils';
import { get, post } from '../request';

const actionType = actionTypeCreator('src/entities/actions/fairs.js');

export const PUBLISH = actionType('PUBLISH');
export const FETCH_RECORDS = actionType('FETCH_RECORDS');
export const CLEAR_RECORDS = actionType('CLEAR_RECORDS');

export const clearFairs = createAction(CLEAR_RECORDS);
export const fetchFairs = createAction(
  FETCH_RECORDS,
  (payload) => get(
    '/chutan/rest/fairs',
    payload,
    {
      needAuth: false,
    }
  ));

export const publish = createAction(
  PUBLISH,
  (payload) => post(
    '/chutan/rest/fairs',
    payload,
  ));