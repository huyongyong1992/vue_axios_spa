/**
 * 配置编译环境和线上环境之间的切换
 * url: 接口域名地址
 * routerMode: 路由模式
 *
 */
let url;
let routerMode = "hash";
if (process.env.NODE_ENV === "production") {
  url = "https://xxx.com"; //生产环境接口url
} else if (process.env.NODE_ENV === "test") {
  url = "https://easy-mock.com/mock/5a2f70916ce8af6869ec3956/example";
} else {
  url = "https://easy-mock.com/mock/5a2f70916ce8af6869ec3956/example";
}

export { url, routerMode };
