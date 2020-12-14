import { handleActions } from 'redux-actions';
import Taro from '@tarojs/taro';
import { LOGIN } from '../actions/session';

export default handleActions({
  [LOGIN]: (state, { payload: { header } }) => {
    Taro.setStorageSync('Signature', header['Signature']);
    Taro.setStorageSync('User-Info', header['User-Info']);
    return {
      ...state,
      ...header,
    };
  },
}, {
  Signature: Taro.getStorageSync('Signature'),
  ['User-Info']: Taro.getStorageSync('User-Info'),
});