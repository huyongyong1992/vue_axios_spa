import Vue from 'vue';
import {wxapiUrl} from './env';
import {wechatShareAPI,voicecode,smscode} from '../service/getData';

/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStorage = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}
let CryptoJS = require("crypto-js");
/**
 * AES加密
 * @param {*} value
 */
export const encryptWithAES = (value) => {
  let str = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), CryptoJS.enc.Utf8.parse('abcdefgabcdefg12'), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
  }).toString();
  // console.log(CryptoJS.enc.Hex.parse(str));
  // let strHex = CryptoJS.enc.Hex.parse(str);
  return str;
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
 * 捕获异常弹窗
 */
export const customToast = (e, type) => {
  let msg = e.message ? e.message : '服务异常，请稍后再试'
  Vue.$vux.toast.text(msg, 'middle');
  if (e.code == 401 || e.code === 403) {
    if (type === 'manager') {
      window.location.href = "/#/managerLogin";
      return
    }
    window.location.href = "/#/login";
  }
}


/**
 * 获取图形验证码
 */
import {getImageCode} from '../service/getData';
export const getImgCodeCommon = mobile => {
  return getImageCode({
    mobile: mobile
  }).then(data => {
    return 'data:image/jpg;base64,' + data.data.imageBase64;
  })
};

/**
 * 图片压缩
 */
export const compressImg = (img, width, height) => {
  if (img.src.length < 400000) {   //小于400K的借据不压缩
    return img.src;
  }
  //用于压缩图片的canvas
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext('2d');
  let initSize = img.src.length;
  // console.log(width,height)
  var expectWidth = '';
  var expectHeight = '';
  if (width > height && width > 480) {
    expectWidth = 480;
    expectHeight = expectWidth * height / width;
  } else if (height > width && height > 600) {
    expectHeight = 600;
    expectWidth = expectHeight * width / height;
  }
  canvas.width = expectWidth;
  canvas.height = expectHeight;
  //铺底色
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(img, 0, 0, expectWidth, expectHeight);
  //进行最小压缩
  let dataURL = canvas.toDataURL('image/jpeg', 1);
  // console.log('压缩前：' + initSize);
  // console.log('压缩后：' + dataURL.length);
  // console.log('压缩率：' + ~~(100 * (initSize - dataURL.length) / initSize) + "%");
  return dataURL;
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
    product: 'daidaikan'
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

const mobileTest=/^1[0-9]\d{9}$/;
export const getvoiceCode = (mobile,getActive) =>{
  if (!mobileTest.test(mobile)) {
    Vue.$vux.toast.text('请输入正确的手机号码', 'middle');
    return;
  }
  if(!!getActive){
    Vue.$vux.toast.text('请稍后重试', 'middle');
    return;
  }
  Vue.$vux.confirm.show({
    title: '语音验证码',
    content: '我们将以电话的方式告诉你验证码，请注意接听',
    confirmText: '确定',
    cancelText: '取消',
    onCancel (){
    },
    onConfirm (){
      voicecode({mobile:mobile}).then(data=>{
        if(data.error) return ;
      })
    }
  });
}
