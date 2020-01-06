import Vue from 'vue'
import Router from 'vue-router'

import routes from './data/routes.js'
import authguards from './guards/authguards.js'

Vue.use(Router)

/**
* 如果放开 mode: 'history', 则需要apache如下配置，且仅能部署在根目录 2017-04-10
  history模式可以部署在非根目录下，需要添加base属性，20170411
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
*/
var router = new Router({
  mode: 'history',
  base: _basepath_,
  routes: routes
})

/**
 * 全局路由钩子
 */
router.beforeEach((to, from, next) => {
  authguards(to, from, next)
  // 以后可以注册更多的钩子
})

router.afterEach(route => {
  if(route.meta.title) {
    document.title = route.meta.title;
  }else {
    document.title = 'BFE'
  }
})

export default router
