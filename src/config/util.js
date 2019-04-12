
/**
 * 存储/获取localStorage
 */
export const $storage = (name, content) => {
    if (!name) return;
    if (!content) {
    // content不存在，getStorage
        return window.localStorage.getItem(name);
    } else if (content === 'remove') {
    // content 为`remove`时 removeStorage
        window.localStorage.removeItem(name);
    } else {
        window.localStorage.setItem(name, content);
    }
};

/**
 * 获取url ?后面的传值
 */
export const getQuery = key => {
    const location = window.location;
    const query = {};
    const params = location.href.split('?')[1] || '';
    if (params) {
        params.split('&').forEach(item => {
            const queryPair = item.split('=');
            query[queryPair[0]] = queryPair[1];
        });
    }
    const rst = query[key];
    console.log(rst);
    // 解码一个编码的 URI。
    return rst ? window.decodeURIComponent(query[key]) : '';
};

/**
 * 去掉空格
 */
export const trim = String => {
    const result = String.replace(/\s/g, '');
    return result;
};

export const checkAgent = () => {
    let ua = window.navigator.userAgent;
    let obj = { isWechat: false, isAndroid: false, isIos: false };
    if (ua.indexOf('MicroMessenger') > -1) {
        obj.isWechat = true;
    }
    if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
        obj.isAndroid = true;
    }
    if (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        obj.isIos = true;
    }
    return obj;
};

export const isUrl = (url) => {
    return (/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/i).test(url);
};

// 验证手机号码是否正确， true/false
export const isTel = (tel) => {
    return (/^1[3|4|5|6|7|8|9]\d{9}$/).test(tel);
};

// 判断是否是object对象
export const isObject = (value) => {
    return !!value && Object.prototype.toString.call(value) === '[object Object]';
};

// 判断是否是数组
export const isArray = (value) => {
    return Object.prototype.toString.call(value) === '[object Array]';
};
