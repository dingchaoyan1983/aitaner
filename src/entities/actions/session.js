import { createAction } from 'redux-actions';
import { actionTypeCreator } from '../../utils';
import { post } from '../request';

const actionType = actionTypeCreator('src/entities/actions/session.js');

export const LOGIN = actionType('LOGIN');

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