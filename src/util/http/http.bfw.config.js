import qs from 'qs'
import CU from '../commonutil'
import store from '@/store'

const bfwConfig = {
  timeout: 5000,
  contentType: 'application/x-www-form-urlencoded',
  baseUrl: '',

  reqInterceptors: (config) => {
    var locale = store.state.locale;
    var method = config.url;
    config.url = '/api/_bfwajax.do'
    // POST传参序列化
    if(config.method === 'post') {
      var data = {
        method: method,
        params: config.data,
        header: {
          agent: "BFE",
          locale: locale
        }
      }

      var json = {
        json: JSON.stringify(data)
      }
      config.data = qs.stringify(json);
      if(config.params) {
        config.params["method"] = method
        config.params["_locale"] = locale
      }else{
        config.params = {
          method: method,
          _locale: locale
        }
      }
    }
    return config;
  },

  resInterceptors: (res) => {
    if(res.status === 200) {
      if(CU.getErr(res) && CU.getErr(res).code === '0107') {
        store.dispatch('logout')
      }
      if(CU.getErr(res) && CU.getErr(res).code === '301') {
        //token 过期，重新登录
        store.dispatch('login')
      }
      if(CU.getErr(res) && CU.getErr(res).code === '404') {
        //请求路径不存在
        this.$alert('请求路径不存在!', '出错啦', {confirmButtonText: '确定'});
      }
      if(CU.getErr(res) && CU.getErr(res).code === '500') {
        //服务器异常
        this.$alert('服务器异常,请联系管理员！', '出错啦', {confirmButtonText: '确定'});
      }
    }
    return res;
  }

}

export default bfwConfig
