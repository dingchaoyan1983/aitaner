import Taro from '@tarojs/api';

export const identity = (_) => _;

export const navigateBack = (params) => {
  const sourcePage = Taro.getCurrentPages().slice(-2,-1)[0];
  sourcePage['$$callback'] = params;
  Taro.navigateBack({
    delta: 1,
  });
};

export const getCallbackParams = (cb) => {
  const currentPage = Taro.getCurrentPages().slice(-1)[0];
  const callback = currentPage['$$callback'];
  delete currentPage['$$callback'];
  if (callback) {
    cb(callback);
  }
}
