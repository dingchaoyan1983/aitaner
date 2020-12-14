import Taro from '@tarojs/taro';
import { navToLogin } from '../utils';

let countDown = 0;

export default ({ dispatch, getState }) => next => action => {
  const { payload } = action;
  if (payload) {
    const { isApi, requestMeta = {}, options = {} } = payload || {};
    if (isApi) {
      if (countDown === 0) {
        Taro.showLoading({
          title: '正在加载...'
        });
      }
      countDown += 1;
      let header = {
        ['content-type']: 'application/json',
      };
      const { needAuth = true, includeHeader } = options;
      if (needAuth) {
        const state = getState();
        header['Signature'] = state.entities.session.Signature;
        header['User-Info'] = state.entities.session['User-Info'];
      }
      
      return new Promise((resolve, reject) => {
        Taro.request({
          ...requestMeta,
          header: {
            ...header,
            ...(requestMeta.header || {}),
          },
          success: (result = {}) => {
            const { statusCode, data, header } = result;
            if (statusCode >= 200 && statusCode < 300) {
              let payload = data;
              if (includeHeader) {
                payload = {
                  body: data,
                  header,
                };
              }
              next({
                ...action,
                payload,
              });
              resolve(result);
            } else if (statusCode === 401) {
              // 需要登录 跳转到登录界面
              navToLogin();
            } else {
              reject(data);
              //显示错误信息
            }
            
          },
          fail: (error) => {
            reject(error);
            // dispatch 一个处理错误的action
          },
          complete: () => {
            countDown -= 1;
            setTimeout(() => {
              if (countDown === 0) {
                Taro.hideLoading();
              }
            }, 20);
          }
        });
      });
    }
  }
  return next(action);
};
