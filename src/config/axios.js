import axios from 'axios';
import { baseUrl } from './env';

const accessToken = localStorage.getItem('accessToken');
var fetch = axios.create({
	baseUrl:baseUrl,
	headers:{'Content-Type': 'application/json'}
	
})

function json2url(json) {
		json.accessToken = accessToken;	//每次请求都带上accessToken
    var arr = [];
    var str = '';
    for (var i in json) {
      str = i + '=' + json[i];
      arr.push(str);
    }
    return arr.join('&');
};
var getInfo = (url='',data={},type='post') =>{
  url = url
  type=type.toLocaleLowerCase()
  if(type === 'get'){	//对象拼接成字符串
    var params = json2url(data);
      return fetch.get(url + '?' + params).then(function (resp) {
				if (resp.data.data && resp.data.data.accessToken) {	//更新accessToken
					window.localStorage.setItem('accessToken', resp.data.accessToken);
				}
				
				return {
					success: resp.data.success,        //是否响应成功
					data: resp.data.data || resp,   //前端展示data存储在这里（防后端把数据放到data外面导致报错）
					error: {
						errorMsg: resp.data.message,     //报错信息
						errorCode: resp.data.code, 
						error:resp.data.error      //报错code
					},
				}
      });
    
  }
  if(type === ('post' || 'put')){	//对象拼接成字符串
		
    return  fetch({
      method:type,
      url:url,
      data:data,
      // transformRequest: [function (obj) {
			// 	var str = [];
			// 	for (var p in obj) {
			// 		str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
			// 	}
			// 	return str.join('&');
      // }]
    }).then(function(resp){
    		if (resp.data.data && resp.data.data.accessToken) {	//更新accessToken
					window.localStorage.setItem('accessToken', resp.data.accessToken);
				}
				return {
					success: resp.data.success,        //是否响应成功
					data: resp.data.data,   //前端展示data存储在这里（防后端把数据放到data外面导致报错）
					error: {
						errorMsg: resp.data.message || '',     //报错信息
						errorCode: resp.data.code,       //报错code
						error:resp.data.error
					},
				}
    })
  }
}

export { fetch,getInfo }