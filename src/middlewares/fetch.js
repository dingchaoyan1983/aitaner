import Taro from '@tarojs/taro';

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
            Taro.showToast({
              title: JSON.stringify(result.header),
            });
            let payload = result.data;
            if (includeHeader) {
              payload = {
                body: result.data,
                header: result.header
              }
            }
            next({
              ...action,
              payload,
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
