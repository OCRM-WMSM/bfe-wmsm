// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'

import 'bfe-ui/lib/theme/index.css'
import './assets/common.css'
import 'normalize.css/normalize.css'

import BfeUI from 'bfe-ui'

import router from './router'
import store from './store'
import axios from 'axios'
import VueHttp from './util/http/vue-http'
import CommonUtil from './util/commonutil'
import VueI18n from 'vue-i18n'
import messages from './i18n'

// 添加mockjs拦截请求，模拟数据返回
//import './mock'
Vue.use(VueI18n)

Vue.use(VueHttp, axios)

Vue.use(CommonUtil)

const i18n = new VueI18n({
  locale: 'zh',
  messages
})

Vue.use(BfeUI, {
  i18n: (key, opt) => {
    i18n.t(key, opt)
  }
})

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  ...App
})

vm.$watch(function() {
  return this.$i18n.locale
}, function(newVal) {
  store.dispatch('saveLocale', newVal);
})
