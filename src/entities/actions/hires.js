import { createAction } from 'redux-actions';
import { actionTypeCreator } from '../../utils';
import { get, post } from '../request';

const actionType = actionTypeCreator('src/entities/actions/hires.js');

export const PUBLISH = actionType('PUBLISH');
export const FETCH_RECORDS = actionType('FETCH_RECORDS');
export const CLEAR_RECORDS = actionType('CLEAR_RECORDS');

export const clearHires = createAction(CLEAR_RECORDS);
export const fetchHires = createAction(
  FETCH_RECORDS,
  (payload) => get(
    '/chutan/rest/hires',
    payload,
    {
      needAuth: false,
    }
  ));

export const publish = createAction(
  PUBLISH,
  (payload) => post(
    '/chutan/rest/hires',
    payload,
  ));