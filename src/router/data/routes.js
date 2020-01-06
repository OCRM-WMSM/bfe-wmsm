import Home from '@pages/Home'
import Login from '@pages/login/Login'
import Dict from '@pages/Dict'
const Trans = resolve => require(['@pages/Trans'], resolve)

/**
 * 路由数据模型
 * @author  pangjian
 */
const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      requireAuth: false,
      title: '首页'
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      requireAuth: false,
      title: '首页'
    }
  },
  {
    path: '/transfer',
    component: Trans,
    meta: {
      requireAuth: false,
      title: '转账'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      fullScreen: true,
      title: '登录'
    }
  },
  {
    path: '/dict',
    component: Dict,
    meta: {
      title: '代码字典'
    }
  },
  {
    path: '/forCash',
    component: Home,
    meta: {
      title: '外币预约'
    }
  },
  {
    path: '/*',
    redirect: '/'
  }
]

export default routes;
