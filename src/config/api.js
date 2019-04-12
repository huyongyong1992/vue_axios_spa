import { request } from '../config/axios';

/**
 * @param { appid secrect code grant_type	}
 * 获取关注用户openId
 */
export const getOpenId = (params) => request('https://api.weixin.qq.com/sns/oauth2/access_token',params,'get');

export const wechatShareAPI = (params) => request('/common/verification/mobile',params,'get');

export const mock = (params) => request('/info',params,'get')
