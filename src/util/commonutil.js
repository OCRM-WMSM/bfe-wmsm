import md5 from 'md5'

var CommonUtil = {}

/**
 * CommonUtil - 获取返回数据
 * @author pangjian
 * @param  {object} res http返回结果
 * @return {object}     返回的JSON
 */
CommonUtil.getResData = function(res) {
  if(CommonUtil.isSuccess(res)) {
    return res.data;
  }else{
    // console.log('请求报错了')
  }
}

/**
 * CommonUtil - 获取错误信息
 * @author pangjian
 * @param  {object} res http返回结果
 * @return {object}     错误信息包含code和message
 */
CommonUtil.getErr = function(res) {
  if(!CommonUtil.isSuccess(res)) {
    return {
      code: res.data.code,
      msg: res.data.msg,
      data: res.data.data
    }
  }
}

/**
 * CommonUtil - 检查返回是否成功
 * @author pangjian
 * @param  {object} res http返回结果
 * @return {boolean}    是否成功标识
 */
CommonUtil.isSuccess = function(res) {
  var code = res.data.code;
  if(code === "0") {
    return true;
  }
  return false;
}

/**
 * 返回md5对象
 */
CommonUtil.md5 = md5

CommonUtil.install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $CU: {
      get() {
        return CommonUtil
      }
    }
  })
}

export default CommonUtil
