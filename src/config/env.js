/**
 * 配置编译环境和线上环境之间的切换
 * url: 接口域名地址
 *
 */
let BASE_URL;
if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'https://xxx.com';                 // 生产环境接口url
} else if (process.env.NODE_ENV === 'test') {
    BASE_URL = 'http://xxx';
} else if (process.env.NODE_ENV === 'uat') {            // 预发环境
    BASE_URL = 'http://xxx';
} else {                                               // 开发环境(默认)
    BASE_URL = 'http://xxx';
}

export {
    BASE_URL
};
