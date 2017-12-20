import axios from 'axios';

var fetch = axios.create({
    headers: { 'Content-Type': 'application/json' },
		timeout: 150000,
})

function json2url(json,isQueryToken) {
	if(!isQueryToken) {
		const accessToken = window.localStorage.getItem('accessToken');
		json.accessToken = accessToken;	//每次请求都带上accessToken
		console.log(accessToken)
	}
	var arr = [];
	var str = '';
	for (var i in json) {
		str = i + '=' + json[i];
		arr.push(str);
	}
	return arr.join('&');
}
var getInfo = (url='',data={},type='get',isQueryToken=false) =>{
  if(type === 'get'){	//对象拼接成字符串
    var params = json2url(data,isQueryToken);
		var getUrl = params ? (url + '?' + params) : url ;	//若传参data为空的话，就不拼接，不为空，则拼接url
		return fetch.get(getUrl).then(function (resp) {
			if (resp.data.data && resp.data.data.accessToken) {	//更新accessToken
				window.localStorage.setItem('accessToken', resp.data.data.accessToken);
			}
			return resp.data ;
		});  
  }
   
	if (type === 'post') { //对象拼接成字符串
			var postUrl ;
			if (!isQueryToken) {
				const accessToken = window.localStorage.getItem('accessToken');
				postUrl = url.split("?")[1] ? url.split("?")[0] + "?" + url.split("?")[1] + "&accessToken=" + accessToken : url + "?accessToken=" + accessToken;
			} else {
					postUrl = url
			}

			return fetch({
				method: type,
				url: postUrl,
				data: data,
			
			}).then(function(resp) {
					if (resp.data.data && resp.data.data.accessToken) { //更新accessToken
							window.localStorage.setItem('accessToken', resp.data.data.accessToken);
					}
					return resp.data;
			})
	}
};

export {  getInfo }

