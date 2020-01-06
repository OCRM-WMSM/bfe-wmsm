import qs from 'qs'
import CU from '../commonutil'
import store from '@/store'
import router from '@/router'

var {Message} = require("bfe-ui");
const httpConfig = {
  timeout: 5000,
  contentType: 'application/x-www-form-urlencoded',
  baseUrl: '',

  reqInterceptors: (config) => {
    //所有的请求需要加上认证信息
    config.headers['Authorization'] = "Bearer " + store.state.token
    // POST传参序列化
    if(config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },

  resInterceptors: (res) => {
    if(res.status === 200) {
      if(CU.getErr(res) && CU.getErr(res).code === '0107') {
        store.dispatch('logout')
      }
      if(CU.getErr(res) && CU.getErr(res).code === '301' || CU.getErr(res) && CU.getErr(res).code === '302') {
        //token 过期，解析失败，重新登录
        router.push("/login");
        return;
      }
      if(CU.getErr(res) && CU.getErr(res).code === '-11') {
        //未登录
        router.push("/login");
        return;
      }
      if(CU.getErr(res) && CU.getErr(res).code === '404') {
        Message({
          type: "error",
          message: "请求资源路径未找到！",
          showClose: true
        });
      }
      if(CU.getErr(res) && CU.getErr(res).code === '500') {
        //服务器异常
        Message({
          type: "error",
          message: "服务器异常，请联系管理员！",
          showClose: true
        });
      }
    }
    return res;
  }

}

export default httpConfig
