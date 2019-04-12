import Vue from 'vue';
import Router from 'vue-router';
import App from '../App';

// 路由懒加载 vue-router 官方文档：https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
// 在.babelrc 文件中配置 "plugins": ["syntax-dynamic-import"]
Vue.use(Router);
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: App,
            children: [
                {
                    path: '/',
                    redirect: '/index'
                }, {
                    path: '/index',
                    name: 'index',
                    component: () => import('../pages/index'),
                    meta: {
                        title: '首页',
                    }
                }, {
                    path: '/login',
                    name: 'login',
                    component: () => import('../pages/login'),
                    meta: {
                        title: '登录',
                    }
                }
            ]
        }
    ]
});

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//     // to: Route: 即将要进入的目标 路由对象
//     // from: Route: 当前导航正要离开的路由
//     // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//     let accessToken = window.localStorage.getItem('accessToken') || '';
//     // console.log(to.meta.notRequired);
//     if (!accessToken && !to.meta.notRequired) {
//         next({ path: '/login', replace: true, query: { back: to.fullPath }});
//     } else {
//         next();
//     }
//     next();

// });

export default router;
