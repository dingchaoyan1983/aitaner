import { createAction } from 'redux-actions';
import { actionTypeCreator } from '../../utils';
import { post } from '../request';

const actionType = actionTypeCreator(__filename);

export const LOGIN = actionType('LOGIN');

export const login = createAction(LOGIN, (...args) => post('http://120.78.173.75:18080/identity/rest/users/wechat-login', ...args));