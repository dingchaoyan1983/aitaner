import { handleActions } from 'redux-actions';
import Taro from '@tarojs/taro';
import { LOGIN, INIT_SESSION } from '../actions/session';

export default handleActions({
  [LOGIN]: (state, { payload: { header } }) => {
    Taro.setStorageSync('Signature', header['Signature']);
    Taro.setStorageSync('User-Info', header['User-Info']);
    return {
      ...state,
      ...header,
    };
  },
  [INIT_SESSION]: () => ({
    Signature: Taro.getStorageSync('Signature'),
    ['User-Info']: Taro.getStorageSync('User-Info'),
  })
}, {
  Signature: Taro.getStorageSync('Signature'),
  ['User-Info']: Taro.getStorageSync('User-Info'),
});