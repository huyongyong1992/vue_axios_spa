/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * 
 */
let baseUrl; 
let routerMode;

if (process.env.NODE_ENV == 'development') {
	baseUrl = '';
	routerMode = 'hash'
}else{
	baseUrl = 'https://mainsite-restapi.ele.me';	//生产环境接口baseUrl
	routerMode = 'hash'
}

export {
	baseUrl,
	routerMode,
}