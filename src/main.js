// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import FastClick from 'fastclick'; // 解决移动端点击延迟
import './config/rem';
import './assets/normalize.css';
Vue.config.productionTip = false;

import { ToastPlugin, LoadingPlugin } from 'vux';
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(require('vue-wechat-title')); // 微信title自定义
if ('addEventListener' in document) {
    document.addEventListener(
        'DOMContentLoaded',
        function() {
            FastClick.attach(document.body);
        },
        false
    );
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
