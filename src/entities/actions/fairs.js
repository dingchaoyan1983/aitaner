import { createAction } from 'redux-actions';
import { actionTypeCreator } from '../../utils';
import { post } from '../request';

const actionType = actionTypeCreator('src/entities/actions/fairs.js');

export const PUBLISH = actionType('PUBLISH');

export const publish = createAction(
  PUBLISH,
  (payload) => post(
    '/chutan/rest/fairs',
    payload,
    {
      needAuth: false,
    }
  ));