import Home from '@pages/Home'
import Login from '@pages/login/Login'
import UpdatePwd from '@pages/user/UpdatePwd'
import UserManager from '@pages/user/UserManager'
import DistributionSet from '@pages/distribute/DistributionSet'
import Blacklist from '@pages/blacklist/BlacklistManager'
//const Trans = resolve => require(['@pages/Trans'], resolve)

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
    path: '/user',
    component: UserManager,
    meta: {
      requireAuth: true,
      title: '用户管理'
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
    path: '/distribute',
    component: DistributionSet,
    meta: {
      title: '分发策略'
    }
  },
  {
    path: '/blacklist',
    component: Blacklist,
    meta: {
      title: '黑名单'
    }
  },
  {
    path: '/UpdatePwd',
    component: UpdatePwd,
    meta: {
      requireAuth: true,
      title: '密码修改'
    }
  },
  {
    path: '/*',
    redirect: '/'
  }
]

export default routes;
