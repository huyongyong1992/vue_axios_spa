import axios from 'axios';
import router from '../router/router';
import { getStorage, setStorage } from '../config/util';
import Vue from 'vue';
//设置全局axios默认值
axios.defaults.timeout = 30000; //30s的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 创建axios实例
const fetch = axios.create({
  headers:{
    accessToken:getStorage('accessToken')
  }
});

const getInfo = (url='',data={},type='get') =>{
  if(type === 'get'){	
    return fetch.get(url,{params: data}).then(function (resp) {
      if (resp.data.data && resp.data.data.accessToken) {	//更新accessToken
        setStorage('accessToken', resp.data.data.accessToken);
      }
      return resp.data ;
    }).catch(e => {
      Vue.$vux.toast.text(e)
    }) 
  }
  if (type === 'post' || type === 'put' ) { 
    return fetch.post(url,data).then(function(resp) {
      if (resp.data.data && resp.data.data.accessToken) { //更新accessToken
        setStorage('accessToken', resp.data.data.accessToken);
      }
      return resp.data;
    }).catch(e => {
      Vue.$vux.toast.text(e)
    })
  }
};

export {  getInfo }

