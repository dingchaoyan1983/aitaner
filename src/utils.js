import Taro, { getCurrentInstance } from '@tarojs/taro';

export const identity = (_) => _;
export const dayPattern = 'YYYY-MM-DD';
export const timePattern = 'HH:mm';
export const dayTimePattern = `${dayPattern} ${timePattern}`;
export const isEmpty = (value) => {
  return value === undefined || value === null;
}

// export const navigateBack = (params) => {
//   const sourcePage = Taro.getCurrentPages().slice(-2,-1)[0];
//   sourcePage['$$callback'] = params;
//   Taro.navigateBack({
//     delta: 1,
//   });
// };

// export const getCallbackParams = (cb) => {
//   const currentPage = Taro.getCurrentPages().slice(-1)[0];
//   const callback = currentPage['$$callback'];
//   delete currentPage['$$callback'];
//   if (callback) {
//     cb(callback);
//   }
// }

export const actionTypeCreator = (prefix) => (actionType) => `${prefix}#${actionType}`;

let flag401 = false;

export const navToLogin = () => {
  if (!flag401) {
    flag401 = true;
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }
}

export const resetFlag401 = () => {
  flag401 = false;
}

let id = 0;

export const getPid = () => `pid-${id++}`;

export const navigateTo = (url, params, callback) => {
  const pid = getPid();
  Taro.eventCenter.once(`openingPage:ready:${pid}`, () => {
    Taro.eventCenter.trigger(`send:message:${pid}`, params);
  });
  Taro.eventCenter.once(`receive:message:${pid}`, callback);
  Taro.navigateTo({
    url: `${url}?&pid=${pid}`,
  })
}


export const navigateBack = (params) => {
  const { pid } = getCurrentInstance().router.params;
  Taro.eventCenter.trigger(`receive:message:${pid}`, params);
  Taro.navigateBack();
} 

// export const receiveMessageOnLoad = (callback) => {
//   const { pid } = getCurrentInstance().router.params;
//   Taro.eventCenter.once(`send:message:${pid}`, (...args) => {
//     callback.apply(this, [this, ...args]);
//   });
//   Taro.eventCenter.trigger(`openingPage:ready:${pid}`)
// }
