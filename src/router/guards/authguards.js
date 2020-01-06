import store from '../../store'

/**
 * authguards - 登录权限验证钩子
 *
 * @author pangjian
 * @param  {Route} to         即将要进入的目标 路由对象
 * @param  {Route} from       当前导航正要离开的路由
 * @param  {Function} next    next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
                              next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
                              next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
 * @return {null} 无返回值
 */
var authguards = function(to, from, next) {
  if (to.matched.some(function(record) {
    return record.meta.requireAuth
  })) {
    // 检查route是否需要登录，需要登录的检查是否已经登录
    if (store.state.token) {
      // 已经登录进入下一个路由
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
}

export default authguards
