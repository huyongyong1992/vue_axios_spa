import { getInfo } from '../config/axios';
import { url } from '../config/env.js';

/**
 * @param { appid secrect code grant_type	}
 * 获取关注用户openId
 */
export const getOpenId = (params) => getInfo('https://api.weixin.qq.com/sns/oauth2/access_token',params,'get');

export const wechatShareAPI = (params) => getInfo(url+'/common/verification/mobile',params,'get');