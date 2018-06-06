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


// 添加拦截器
// axios.interceptors.request.use = fetch.interceptors.request.use;
// axios.interceptors.response.use = fetch.interceptors.response.use;

// // request 拦截器
// fetch.interceptors.request.use(
//     config => {
//         //每次发送请求之前检测都本地存有token（也可以存在vuex中，vuex去从localStorage/ssesionStorage中去取）,那么都要放在请求头发送给服务器
//         let accessToken = window.localStorage.getItem('accessToken')
//         if (accessToken) {
//             config.headers.Authorization = `token ${accessToken}`;  //设置header Authorization 的值为 token
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     }
// );

// // response 拦截器
// fetch.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => { //默认除了2XX之外的都是错误的，就会走这里
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401: 
//                     router.replace({ //跳转到登录页面
//                         path: 'login',
//                         query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//                     });
//                 case 403:
//                    router.replace({ //跳转到403页面
//                       path: '403',
//                   });
//             }
//         }
//         return Promise.reject(error.response);
//     }
// );

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

