import { createAction } from 'redux-actions';
import { actionTypeCreator } from '../../utils';
import { get, post } from '../request';

const actionType = actionTypeCreator('src/entities/actions/stalls.js');

export const PUBLISH = actionType('PUBLISH');
export const FETCH_RECORDS = actionType('FETCH_RECORDS');

export const fetchStalls = createAction(
  FETCH_RECORDS,
  (payload) => get(
    '/chutan/rest/stalls',
    payload,
    {
      needAuth: false,
    }
  ));

export const publish = createAction(
  PUBLISH,
  (payload) => post(
    '/chutan/rest/stalls',
    payload,
  ));