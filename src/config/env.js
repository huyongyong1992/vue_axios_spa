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
let signUrl ;
let routerMode;
let wxapiUrl;
if (process.env.NODE_ENV === 'production') {
	url = 'https://xxx.com';	//生产环境接口url
  wxapiUrl = 'https://xxx/';
	routerMode = 'hash';
	signUrl = 'https://xxx.com';
}else{
	url = 'http://xxx/api';
	routerMode = 'hash';
	signUrl = 'http://xxx.com';
	wxapiUrl = 'http://xxx/api';
}

export {
	url,
	routerMode,
	signUrl,
  wxapiUrl
}
