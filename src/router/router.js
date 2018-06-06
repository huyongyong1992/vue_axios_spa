import App from '../App'
/**
 * @Author   huyongyong
 * @DateTime 2018-06-05T19:14:44+0800
 */
const redirect = r => require.ensure([], () => r(require('../page/redirect/redirect')), 'redirect'); //重定向
const consolejs = r => require.ensure([], () => r(require('../page/redirect/consolejs')), 'consolejs'); //重定向


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转redirect页面
        {
            path: '',
            redirect: '/redirect'
            
        },
        //重定向页面
        {
            path: '/redirect',
            component: redirect,
            meta:{
                title:'重定向'
            }
        },
        {
            path: '/consolejs',
            component: consolejs,
            meta:{
                title:'console'
            }
        },
        
    ]
}]


