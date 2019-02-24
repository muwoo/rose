import axios from 'axios';

function createAPI(baseURL, Authorization) {
  return function (conf) {
    conf = conf || {};
    if (conf.opts && conf.opts.data && conf.opts.data.experiment_id) {
      conf.opts.data.hash = CryptoJS.AES.encrypt(JSON.stringify(conf.opts.data), key).toString();
    }
    return axios(Object.assign({}, {
      url: conf.url,
      baseURL: baseURL,
      method: conf.method,
      withCredentials: true,
      Authorization
    }, conf.opts)).then(res => {
      return res.data
    });
  };
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach((key) => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g');
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

export {
  createAPI,
  convertRESTAPI
};
