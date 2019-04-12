// import { wechatShareAPI } from '../api/data'; // 获取微信分享所需的appid等

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
 * 深拷贝方法(下面3个是一体的)
 */
// export function deepCopy(obj) {
//     let type = isType(obj);
//     if (type === 'Array' || type === 'Object') {
//         return cloneObj(obj);
//     } else if (type === 'Date') {
//         return obj.constructor(obj);
//     } else {
//         return obj;
//     }
// }

// function cloneObj(obj) {
//     let newObj = obj instanceof Array ? [] : {};
//     for (let key in obj) {
//         newObj[key] = typeof obj[key] === 'object' ? cloneObj(obj[key]) : obj[key];
//     }
//     return newObj;
// }

// function isType(o) {
//     return /\[object\s(.*?)\]/.exec(Object.prototype.toString.call(o))[1];
// }

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

export const checkPhone = (param) => {
    let specialChar = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    let phoneNo = new RegExp(/^(1[3,4,5,6,7,8,9])\d{9}$/);

    if (!specialChar.test(param) && param.indexOf(' ') === -1 && phoneNo.test(param)) {   // 检测特殊字符&空格&正确的手机号格式
        return true;
    } else {
        return false;
    }
};

export const checkEnName = (param) => {
    let nameChar = new RegExp('/^[a-zA-Z]$/');          // 英文字母，点，下划线，横线
    if (nameChar.test(param)) {
        return true;
    } else {
        return false;
    }
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

export const mobileType = () => {
    let u = window.navigator.userAgent;
    //  这里可以判断是ios还是android系统
    //	let android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    //	let ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //	return { android , ios }

    // 只需要判断是否是ios系统即可
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
};
