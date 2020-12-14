import { createAction } from 'redux-actions';
import { actionTypeCreator } from '../../utils';
import { post } from '../request';

const actionType = actionTypeCreator('src/entities/actions/session.js');

export const LOGIN = actionType('LOGIN');
export const INIT_SESSION = actionType('INIT_SESSION');

export const initSession = createAction(INIT_SESSION);
export const login = createAction(
  LOGIN,
  (payload) => post(
    '/identity/rest/users/wechat-login',
    payload,
    {
      needAuth: false,
      includeHeader: true,
    }
  ));