/**
 * 配置编译环境和线上环境之间的切换
 *
 * url: 接口域名地址
 * routerMode: 路由模式
 * wxapiUrl： 微信授权需要的域名
 * signUrl: 电子签名页面所在的域名
 * 
 */
let url;
let routerMode;
if (process.env.NODE_ENV === 'production') {
	url = 'https://xxx.com';	//生产环境接口url
	routerMode = 'hash';
}else{
	url = 'http://xxx/api';
	routerMode = 'hash';
}

export {
	url,
	routerMode,
}
