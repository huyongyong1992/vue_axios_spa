
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
    }else if(element.currentStyle){
        target = element.currentStyle[attr]; 
    }else{ 
        target = document.defaultView.getComputedStyle(element,null)[attr]; 
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
} 

/**
 * 捕获异常
 */
// export const errorHandler = e => {
//   // 跳转到授权／登录
  
//   if (e.errorCode == 401) {
//     // Vue.$router.push('/login');
//     window.location.href = '/login';
//   } else if (e.errorMsg || e.errMsg || e.message) {
//     Vue.$vux.toast.show({
//       text: e.errorMsg || e.errMsg || e.message
//     })
//     // alert(e.errorMsg || e.errMsg || e.message)
//   }
// }


/**
 * 获取url ?后面的传值
 */
export const  getQuery = (key) => {
  const location = window.location;
  const query = {};
  const params = location.href.split('?')[1] || ''
  if(params) {
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
 * 弹窗
 */
export const customToast = e => {
  Vue.$vux.toast.show({   
    text:e.error.errorMsg,
    type:'text',
    width:'80%',
    time:1500
  })
}

/**
 * 处理错误
 */
export const errorHandler = e => {
  if(e.error.error){
    Vue.$vux.toast.show({   
      text:e.error.errorMsg,
      type:'text',
      width:'80%'
    })
    return ;
  }
}

/**
 * 获取图形验证码
 */
import {getImageCode} from '../service/getData' ;
export const getImgCodeCommon = mobile => {
  return getImageCode({
          mobile:mobile
        }).then(data =>{
          return  'data:image/jpg;base64,'+ data.data.imageBase64;
        })
}
