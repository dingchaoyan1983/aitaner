import Taro from '@tarojs/api';

export const identity = (_) => _;
export const dayPattern = 'YYYY-MM-DD';
export const timePattern = 'HH:mm';
export const dayTimePattern = `${dayPattern} ${timePattern}`;
export const isEmpty = (value) => {
  return value === undefined || value === null || value.toLowerCase() === 'undefined' || value.toLowerCase() === 'null';
}

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

export const actionTypeCreator = (prefix) => (actionType) => `${prefix}#${actionType}`;