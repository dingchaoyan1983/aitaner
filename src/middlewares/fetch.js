import Taro from '@tarojs/api';

let countDown = 0;

export default ({ dispatch }) => next => action => {
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
      const { needAuth = true } = options;
      if (needAuth) {
        header['Signature'] = Taro.getStorageSync('Signature');
        header['User-Info'] = Taro.getStorageSync('User-Info');
      }
      
      return new Promise((resolve, reject) => {
        Taro.request({
          ...requestMeta,
          header: {
            ...header,
            ...(requestMeta.header || {}),
          },
          success: (result = {}) => {
            next({
              ...action,
              payload: result.data,
            });
            resolve(result);
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
