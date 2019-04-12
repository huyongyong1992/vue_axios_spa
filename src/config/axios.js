import axios from 'axios';
import { operateStorage } from '../config/util';
import Vue from 'vue';
import { url } from './env';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 创建axios实例
const fetch = axios.create({
  headers:{
    accessToken:operateStorage('accessToken'),
  },
  baseURL: url,                             //`baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  timeout: 15000
})

export const request = (url='', data={}, type='get') =>{
  if(type.toLowerCase() === 'get'){	
    return new Promise((resolve,reject) => {
      fetch.get(url,{params: data}).then((resp)  =>{
        if(!resp.data.error) {
          resolve(resp.data.data)
        }else{
          Vue.$vux.toast.text(resp.data.errorMessage || '服务异常')
          if(resp.data.code === 401) {
            window.location.href = '/#/login'
          }
          reject(resp.data)
        }
      }).catch(e => {
        Vue.$vux.toast.text(e)
      })
    }) 
  }
  if (type.toLowerCase() === 'post' || type.toLowerCase() === 'put' ) { 
    return new Promise((resolve, reject) => {
      fetch.post(url,data).then((resp) => {
        if(!resp.data.error) {
          resolve(resp.data.data)
        }else{
          Vue.$vux.toast.text(resp.data.errorMessage || '服务异常')
          if(resp.data.code === 401) {
            window.location.href = '/#/login'
          }
          reject(resp.data)
        }
      }).catch(e => {
        Vue.$vux.toast.text(e)
      })
    })
  }
}
