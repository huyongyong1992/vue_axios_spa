import Vue from 'vue';
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
export const customToast = e => {
	Vue.$vux.toast.show({
		text: e.message,
		type: 'text',
		width: '80%',
		time: 1500
	})
	if(e.code === 401 || e.code === 403) {
		window.location.href="/#/login";
	}
}

/**
 * 处理错误
 */
export const errorHandler = e => {
    if (e.error) {
        Vue.$vux.toast.show({
            text: e.message,
            type: 'text',
            width: '80%'
        })

        return;
    }
}

/**
 * 获取图形验证码
 */
import { getImageCode } from '../service/getData';
export const getImgCodeCommon = mobile => {
    return getImageCode({
        mobile: mobile
    }).then(data => {
        return 'data:image/jpg;base64,' + data.data.imageBase64;
    })
}

/**
 * 图片压缩
 */
export const compressImg = (img, width, height) => {
    if(img.src.length <2000000) {   //小于200K的压缩
        return img.src;
    }
    //用于压缩图片的canvas
    console.log(width + "," + height)
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext('2d');

    //    瓦片canvas
    // var tCanvas = document.createElement("canvas");
    // var tctx = tCanvas.getContext("2d");

    let initSize = img.src.length;
    // console.log(img.src)
   
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio *=10;
        
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 5;
    }
    console.log('ratio=' +ratio)
    canvas.width = width * 2;
    console.log(width)
    canvas.height = height * 2;
    //铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //如果图片像素大于100万则使用瓦片绘制
    // var count;
    // if ((count = width * height / 1000000) > 1) {
    //     console.log('count='+count)
    //     count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
    //     //计算每块瓦片的宽和高
    //     var nw = ~~(width / count);
    //     var nh = ~~(height / count);
    //     tCanvas.width = nw;
    //     tCanvas.height = nh;
    //     for (var i = 0; i < count; i++) {
    //         for (var j = 0; j < count; j++) {
    //             tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio * 2, nh * ratio * 2, 0, 0, nw, nh);
    //             ctx.drawImage(tCanvas, i * nw, j * nh, nw * 2, nh * 2);
    //         }
    //     }
    // } else {
        ctx.drawImage(img, 0, 0, width * 2, height * 2);
    // }
    //进行最小压缩
    let dataURL = canvas.toDataURL('image/jpeg', 1);
    
    console.log('压缩前：' + initSize);
    console.log('压缩后：' + dataURL.length);
    console.log('压缩率：' + ~~(100 * (initSize - dataURL.length) / initSize) + "%");
    console.log(dataURL)
    return dataURL;
}

export const wxShare = (title, link, imgUrl, desc) => {
    const wx = window.wx;
    wx.ready(() => {
        wx.onMenuShareTimeline({
            title,
            link,
            imgUrl,
            success: () => {},
            cancel: () => {},
        });

        wx.onMenuShareAppMessage({
            title,
            desc,
            link,
            imgUrl,
            type: '',
            dataUrl: '',
            success: () => {},
            cancel: () => {},
        });

        wx.onMenuShareQQ({
            title,
            desc,
            link,
            imgUrl,
            success: () => {},
            cancel: () => {},
        });

        wx.onMenuShareWeibo({
            title,
            desc,
            link,
            imgUrl,
            success: () => {},
            cancel: () => {},
        });

        wx.onMenuShareQZone({
            title,
            desc,
            link,
            imgUrl,
            success: () => {},
            cancel: () => {},
        });
    });
}