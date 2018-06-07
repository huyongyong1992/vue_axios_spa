import App from '../App'
/**
 * @Author   huyongyong
 * @DateTime 2018-06-05T19:14:44+0800
 */
const redirect = r => require.ensure([], () => r(require('../page/redirect/redirect')), 'redirect'); //重定向
const consolejs = r => require.ensure([], () => r(require('../page/redirect/consolejs')), 'consolejs'); //重定向

const activeRoute = r => require.ensure([], () => r(require('../page/redirect/activeRoute')), 'activeRoute'); //动态路由


const parentRoute = r => require.ensure([], () => r(require('../page/redirect/parentRoute')), 'parentRoute'); //父路由
const childOneRoute = r => require.ensure([], () => r(require('../page/redirect/childOneRoute')), 'childOneRoute'); //父路由
const childTwoRoute = r => require.ensure([], () => r(require('../page/redirect/childTwoRoute')), 'childTwoRoute'); //父路由


const cropa = r => require.ensure([], () => r(require('../page/redirect/cropajs')), 'cropa'); //图片裁剪


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
        {
            path: '/activeRoute/:id',
            component: activeRoute,
            meta:{
                title:'动态路由'
            }
        },
        {
            path: '/cropa',
            component: cropa,
            meta:{
                title:'图片裁剪'
            }
        },
        {
            path: '/parentRoute',
            component: parentRoute,
            meta:{
                title:'父路由'
            },
            children:[{
                path: '/childOneRoute',
                component: childOneRoute,
                meta:{
                    title:'子路由1'
                }
            },{
                path: '/childTwoRoute',
                component: childTwoRoute,
                meta:{
                    title:'子路由2'
                }
            }]
        },
        
    ]
}]


