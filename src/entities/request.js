const BASE_URL = 'https://www.chutan.cc:18443';

const commonFetch = (method, url, data, options = {}, header = {}) => {
  return {
    isApi: true,
    requestMeta: {
      method,
      url: `${BASE_URL}${url}`,
      data,
      header,
    },
    options,
  };
};

export const get = (...args) => commonFetch('GET', ...args);

export const post = (...args) => commonFetch('POST', ...args);

export const put = (...args) => commonFetch('PUT', ...args);

export const del = (...args) => commonFetch('DELETE', ...args);