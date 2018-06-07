import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/router';
import store from './store/';
import { routerMode } from './config/env';
import './config/rem';
import FastClick from 'fastclick';
import { LoadingPlugin, ToastPlugin, DatetimePlugin, AlertPlugin } from 'vux';
Vue.use(require('vue-wechat-title'))    //微信title自定义
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)
Vue.use(AlertPlugin)

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV === 'production'
})
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

import Croppa from 'vue-croppa'
Vue.use(Croppa) 

//注册全局钩子用来拦截导航
// router.beforeEach((to, from, next) => {

//     //获取localStorage里面的token
//     console.log(to.meta)
//     let token = window.localStorage.getItem('accessToken');
//     //判断要去的路由有没有requiresAuth
//     if(to.meta.requiresAuth){ //需要权限
//       if(token){
//         next();
//       }else{
//         next({
//           path: '/login',
//           query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
//         });
//       }
//     }else{
//       next();//如果无需token,那么随它去吧
//     }
//   });

new Vue({
  router,
  store,
}).$mount('#app')
