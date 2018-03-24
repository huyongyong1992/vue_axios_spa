import App from '../App'
/**
 * @Author   huyongyong
 * @DateTime 2017-05-26T14:14:44+0800
 */
const redirect = r => require.ensure([], () => r(require('../page/isLimit/redirect')), 'redirect'); //重定向

const login = r => require.ensure([], () => r(require('../page/accountManagement/login')), 'login'); //登录
const register = r => require.ensure([], () => r(require('../page/accountManagement/register')), 'register'); //注册页面

/**
 * 更多
 * @Author   huyongyong
 * @DateTime 2017-05-12T14:10:00+0800
 */
const greenhand = r => require.ensure([], () => r(require('../page/more/greenhand')), 'greenhand'); //新手指引
const connectUs = r => require.ensure([], () => r(require('../page/more/connectUs')), 'connectUs'); //联系我们

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转isLimit页面
        {
            path: '',
            redirect: '/redirect'
        },
        //重定向页面
        {
            path: '/redirect',
            component: redirect
        },
       
        //账号管理
        //登录页
        {
            path: '/login',
            component: login
        },
        //注册页
        {
            path: '/register',
            component: register
        },
        //更多
        {
            path: '/greenhand', //新手指引
            component: greenhand
        }, {
            path: '/connectUs', //联系客服
            component: connectUs
        }
    ]
}]

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取localStorage里面的token
  let token = window.localStorage.getItem('accessToken');
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){ //需要权限
    if(token){
      next();
    }else{
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }
  }else{
    next();//如果无需token,那么随它去吧
  }
});
