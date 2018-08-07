import App from "../App";
/**
 * @Author   huyongyong
 * @DateTime 2018-07-25T19:14:44+0800
 */
const redirect = r => require.ensure([], () => r(require("../page/redirect/redirect")), "redirect"); //重定向
const activeRoute = r => require.ensure([], () => r(require("../page/redirect/activeRoute")),"activeRoute"); //动态路由

export default [
  {
    path: "/",
    component: App, //顶层路由，对应index.html
    children: [
      //二级路由。对应App.vue
      //地址为空时跳转redirect页面
      {
        path: "/",
        redirect: "/redirect"
      },
      //重定向页面
      {
        path: "/redirect",
        component: redirect,
        meta: {
          title: "重定向"
        }
      },
      {
        path: "/activeRoute/:id",
        component: activeRoute,
        // component: () => require("../page/redirect/activeRoute"),
        meta: {
          title: "动态路由"
        }
      }
    ]
  }
];
