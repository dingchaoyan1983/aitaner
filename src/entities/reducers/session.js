import { handleActions } from 'redux-actions';
import Taro from '@tarojs/api';
import { LOGIN } from '../actions/session';

export default handleActions({
  [LOGIN]: (state, { payload: { data } }) => {
    Taro.setStorageSync('Signature', data['Signature']);
    Taro.setStorageSync('User-Info', data['User-Info']);
    return {
      ...state,
      data,
    };
  }
}, {
  // Signature: Taro.getStorageSync('Signature'),
  // ['User-Info']: Taro.getStorageSync('User-Info'),
  Signature: '',
  ['User-Info']: '',
});