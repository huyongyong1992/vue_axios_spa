import axios from 'axios';
// import { $storage } from '../config/util';
import Vue from 'vue';
import { BASE_URL } from './env';
// 设置全局axios默认值
// axios.defaults.timeout = 30000; //30s的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 创建axios实例


export const request = (url = '', data = {}, type = 'get') => {
    const accessToken = window.localStorage.getItem('accessToken');
    const fetch = axios.create({
        headers: {
            'access-token': accessToken
        },
        baseURL: BASE_URL, // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
        timeout: 15000
    });
    if (type.toLowerCase() === 'get') {
        return new Promise((resolve, reject) => {
            fetch.get(url, { params: data }).then(resp => {
                if (resp.data.success) {
                    resolve(resp.data.data);
                } else {
                    Vue.$vux.toast.text(resp.data.errorMessage || '服务异常');
                    if (resp.data.errorCode === 102) {
                        window.location.href = '/login';
                    }

                    reject(resp.data);
                }
            }).catch(e => {
                Vue.$vux.toast.text(e);
            });
        });
    }
    if (type.toLowerCase() === 'post' || type.toLowerCase() === 'put') {
        return new Promise((resolve, reject) => {
            fetch({
                url,
                data,
                method: type
            }).then(resp => {
                if (resp.data.success) {
                    resolve(resp.data.data);
                } else {
                    Vue.$vux.toast.text(resp.data.errorMessage || '服务异常');
                    if (resp.data.errorCode === 102) {
                        window.location.href = '/login';
                    }
                    reject(resp.data);
                }
            }).catch(e => {
                Vue.$vux.toast.text(e);
            });
        });
    }

};
