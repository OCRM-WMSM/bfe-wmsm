import config from './http.default.config'

import bfwConfig from './http.bfw.config.js'

/**
 * Install plugin
 * @param Vue
 * @param axios
 */
var {Message} = require("bfe-ui");
var vueHttp = {};

vueHttp.install = function(Vue, axios) {
  if (vueHttp.installed) {
    return
  }

  if (!axios) {
    return
  }

  vueHttp._settings(axios, config)

  Vue.axios = axios

  var bfwInstance = axios.create()

  vueHttp._settings(bfwInstance, bfwConfig)

  Object.defineProperties(Vue.prototype, {

    axios: {
      get() {
        return axios
      }
    },

    $http: {
      get() {
        return axios
      }
    },

    $bfw: {
      get() {
        return bfwInstance
      }
    }

  })
}

/**
 * vue http设置 - 可以根据config设置指定的axios实例
 * @author pangjian
 * @param  {Object} axios      axios实例
 * @param  {Object} httpConfig 配置信息
 * @return {Object} 返回一个Promise
 */
vueHttp._settings = function(axios, httpConfig) {
  if(httpConfig.timeout) {
    axios.defaults.timeout = httpConfig.timeout
  }
  if(httpConfig.contentType) {
    axios.defaults.headers.post['Content-Type'] = httpConfig.contentType
  }
  // 请求发送拦截器
  axios.interceptors.request.use(httpConfig.reqInterceptors, (error) => {
    return Promise.reject(error);
  });

  // 请求返回拦截器
  axios.interceptors.response.use(httpConfig.resInterceptors, (error) => {
    if(error.response.status === 401) {
      Message({
        type: "error",
        message: "deny！",
        showClose: true
      });
      return;
    }
    if(error.response.status === 404) {
      Message({
        type: "error",
        message: "请求资源路径未找到！",
        showClose: true
      });
      return;
    }
    if(error.response.status === 500) {
      Message({
        type: "error",
        message: "服务器异常，请联系管理员！",
        showClose: true
      });
      return;
    }
    return Promise.reject(error);
  });
}

export default vueHttp
