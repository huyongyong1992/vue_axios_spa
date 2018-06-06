import Vue from 'vue';
import {wxapiUrl} from './env';
import {wechatShareAPI} from '../service/getData';

/**
 * 存储/获取localStorage
 */
export const setStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}
export const getStorage = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}
export const removeStorage = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}
/**
 * 获取url ?后面的传值
 */
export const getQuery = (key) => {
  const location = window.location;
  const query = {};
  const params = location.href.split('?')[1] || ''
  if (params) {
    params.split('&').forEach((item) => {
      const queryPair = item.split('=');
      query[queryPair[0]] = queryPair[1];
    });
  }
  const rst = query[key];
  //解码一个编码的 URI。
  return rst ? window.decodeURIComponent(query[key]) : '';
}

/**
 * 微信分享
 * @param {*} title
 * @param {*} link
 * @param {*} imgUrl
 * @param {*} desc
 */
export const wxShare = (title, link, imgUrl, desc) => {
  const wx = window.wx;
  const url = window.location.href;
  wechatShareAPI({
    url: url,
  }).then(data => {
    wx.config({
      debug: false,
      appId: data.data.appId,
      timestamp: data.data.timestamp,
      nonceStr: data.data.nonceStr,
      signature: data.data.signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareQZone',
        'chooseWXPay'
      ]
    });
  });
  wx.ready(() => {
    wx.onMenuShareTimeline({
      title,
      link,
      imgUrl,
      success: () => {
      },
      cancel: () => {
      },
    });
    wx.onMenuShareAppMessage({
      title,
      desc,
      link,
      imgUrl,
      type: '',
      dataUrl: '',
      success: () => {
      },
      cancel: () => {
      },
    });
    wx.onMenuShareQQ({
      title,
      desc,
      link,
      imgUrl,
      success: () => {
      },
      cancel: () => {
      },
    });
    wx.onMenuShareWeibo({
      title,
      desc,
      link,
      imgUrl,
      success: () => {
      },
      cancel: () => {
      },
    });
    wx.onMenuShareQZone({
      title,
      desc,
      link,
      imgUrl,
      success: () => {
      },
      cancel: () => {
      },
    });
  });
};
export const wxPay = () => {
  const wx = window.wx;
  //去拿支付接口返回的参数,配置微信支付
  // ....
  wx.ready(() => {
    wx.chooseWXPay({
      timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: '', // 支付签名随机串，不长于 32 位
      package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: '', // 支付签名
      success: function (res) {
          // 支付成功后的回调函数
      }
    })
  })
};
/**
 * 微信授权
 * @param {appid，type}
 */
export const wechatOauth = (appid, type,product='daidaikan') => {
  const url = encodeURI(wxapiUrl + "/page/product/"+product+"/redirectTo/" + type);
  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
}

/**
 * 去掉空格
 */
export const trim = (String) => {
  const result = String.replace(/\s/g, "");
  return result;
}
