import { getInfo } from '../config/axios';
import { url } from '../config/env.js';
                        /**************************************************************************************************************************** */
                        /****************************************************账户管理模块************************************************************ */
                        /*************************************************************************************************************************** */
/**
 * 登录接口
 * @param {} openId,username,password 
 */
export const login = (params) => getInfo(url+'/security/login', params,'post',true);

/**
 * @param { appid secrect code grant_type	}
 * 获取关注用户openId
 */
export const getOpenId =(params) => getInfo('https://api.weixin.qq.com/sns/oauth2/access_token',params,'get');

/**
 * @param {accountId,openId,thirdType} thirdType-->weixin
 * 用户登录成功后，调用该接口绑定一个微信账号
 */
export const bindWechat = (params) => getInfo(url+'/account/thirdAccount/binding?accessToken='+params.accessToken, params,'post',true);

/** 
 * 根据第三方账号换取accessToken
 * @param {thirdAccount ,thirdType}
 */
export const getToken = (params) => getInfo(url+'/security/token/thirdAccount',params,'post',true);

/**
 * @param { mobile, smsCode }
 * 用户登录 -- 短信验证登录
 */
export const smsLogin = (params) => getInfo(url+'/security/login/sms', params,'post',true);

/**
 * @param { mobile, smsCode }
 * 用户登录 -- 短信验证登录
 */
export const getAccountId = (params) => getInfo(url+'/account/token/info', params,'get');

                        /**************************************************************************************************************************** */
                        /****************************************************订单管理模块************************************************************ */
                        /*************************************************************************************************************************** */

/**
 * @param {accountId}
 * 根据账号获取订单号
 */
export const getOrder = (params) => getInfo(url+'/wld/order/'+params.accountId+'/orders',{},'post');

/**
 * @param { accountId }
 * 查看客户经理
 */
export const checkManager = (params) => getInfo(url+'/wld/order/'+params.accountId +'/saleinfo',{},'get');

/**
 * @param {accountId,city,education,marriage,profession,salary}
 * 客户申请贷款: 保存或修改订单申请基本信息
 */
export const saveOrderInfo = (params) => getInfo(url+'/wld/order/'+params.orderId+'/idcardAndBaseinfo',params,'post');

/**
 * 客户申请贷款: 客户创建订单
 */
export const createOrder = (params) => getInfo(url+'/wld/order/createOrder?openId='+params.openId,params,'post');


/**
 * @param {orderId} 
 * 获取身份证正反面照片,姓名，身份证号
 */
export const getIdCardInfo = (params) => getInfo(url+'/wld/order/'+params.orderId+'/idcardImage/info',{},'get');

/**
 * @param {orderId,idcardImageObverseBase64}
 * 上传身份证正面
 */
export const uploadFacePic = (params) => getInfo(url+'/wld/order/'+params.orderId+'/idcardImage/obverse',{idcardImageObverseBase64:params.idcardImageObverseBase64},'post');

/**
 * @param {idcardImageReverseBase64}
 * 上传身份证反面照片
 */
export const uploadBackPic = (params) => getInfo(url+'/wld/order/'+params.orderId+'/idcardImage/reverse',{idcardImageReverseBase64:params.idcardImageReverseBase64},'post');

/**
 * @param {accountId,facebase64}
 * 手持身份证照片验证
 */
export const uploadHandPic = (params) => getInfo(url+'/wld/order/'+params.orderId+'/faceCompare/score',{facebase64:params.facebase64},'post');

/**
 * 上传维立贷借据
 */
export const uploadDebt = (params) => getInfo(url+'/wld/order/'+params.orderId+'/londWechatIou',{wechatIouBase64:params.wechatIouBase64},'post');


/**
 * @param {accountId}
 * 客户申请贷款：OCR签名
 */
export const getOcrSign = (params) => getInfo(url+'/wld/order/'+params.orderId+'/ocrAuditSignature',params,'get');



                      /**************************************************************************************************************************** */
                      /****************************************************贷前贷后*********************************************************** */
                      /*************************************************************************************************************************** */
/**
 * @param {orderId}
 * 银行卡认证
 */
export const bankCardVerify = (params) => getInfo(url+'/wld/loan/'+params.orderId+'/creditCheck',params,'post');

/**
 * @param {} loanMoney,loanPeriod,orderId
 * 维立贷借款确认
 */
export const loanConfirm = (params) => getInfo(url+'/wld/loan/loanConfirm',params,'post');

/**
 * @param {} bankCardType,bankName,cardNum,mobile,ownerIdcard,ownerName,smCode
 * 维立贷更换银行卡
 */
export const changeBankCard = (params) => getInfo(url+'/wld/loan/'+params.accountId+'/changeBankCard',params,'post');

/**
 * @param {} idCard,name,cardNum,mobile,messageCode
 * 芝麻认证
 */
export const sesameAuth = (params) => getInfo(url+'/wld/loan/'+params.orderId+'/sesameAuth',params,'post');

/**
 * @param {}
 * 查询预审额度
 */
export const loanMoney = (params) => getInfo(url+'/wld/loan/'+params.orderId+'/query/loanMoney',params,'get');


                      /**************************************************************************************************************************** */
                      /****************************************************贷后接口*********************************************************** */
                      /*************************************************************************************************************************** */
/**
 * 账户借款记录查询
 * @param {isAll(boolean) required}
 */
export const getLoanRecord = (params) => getInfo(url+'/wld//loanafter/'+params.accountId+'/loanRecord',params,'get');

/**
 * 还款计划
 * @param {orderId}
 */
export const getRepayPlan = (params) => getInfo(url+'/wld//loanafter/'+params.orderId  +'/repaymentPlan',params,'get');
                      /**************************************************************************************************************************** */
                      /**********************************************手机详单采集接口*************************************************************** */
                      /*************************************************************************************************************************** */
/**
 * @param {identityCard，mobile，name}
 * 手机账单初始化
 */
export const mobileInit = (params) => getInfo(url+'/mobile/bill/init',params,'post',true);
/**
 * 手机账单登录
 * @param {} params 
 */
export const mobileLogin = (params) => getInfo(url+'/mobile/bill/login',params,'post',true);
/**
 * 手机账单-验证手机动态验证码
 * @param {*} params 
 */
export const mobileCheckSms = (params) => getInfo(url+'/mobile/bill/sms/check',params,'post',true);
/**
 * 手机账单-发送手机动态验证码
 * @param {*} params 
 */
export const mobileSendSms = (params) => getInfo(url+'/mobile/bill/sms/send',params,'post',true);

/**
 * @param {mobileId，mobile，orderId}
 * 上传mobileId
 */
export const mobileId = (params) => getInfo(url+'/wld/order/mobileId',params,'post',true);
                      /**************************************************************************************************************************** */
                      /****************************************************common公共资源*********************************************************** */
                      /*************************************************************************************************************************** */
/**
 * 获取城市列表（放本地)
 * @param {isAll(boolean) required}
 */
export const getCityList = (params) => getInfo(url+'/wld/common/city/list',params,'get');

/**
 * 获取银行卡列表
 * @param {}
 */
export const getBankList = (params) => getInfo(url+'/common/bank/list',params,'get');


/**
 * 获取数据字典
 * @param {}  
 */
export const getDictionaries = (params) => getInfo(url+'/common/dictionaries',{},'get');

/**
 * @param {loanmoney} openId
 * 客户进入公众号: 保存微粒贷额度
 */
export const saveLimit = (params) => getInfo(url+'/wld/common/wechat/'+params.loanmoney+'?openId='+params.openId, {},'post');



/**
 * 获取图片验证码
 * @param {mobile} 
 */
export const getImageCode = (params) => getInfo(url+'/wld/common/verification/Image/'+params.mobile,{},'get');

/**
 * 获取手机短信验证码(把图形验证码传给后端校验)
 * @param {mobile，verifyCode} 
 */
export const getSmsCode = (params) => getInfo(url+'/common/verification/mobile/'+params.mobile,{"verifyCode":params.verifyCode},'get');

/**
 * 获取手机短信验证码(不带图形验证码)
 * @param {mobile，verifyCode} 
 */
export const getNoImgSmsCode = (params) => getInfo(url+'/common/verification/mobile/'+params.mobile,{},'get',true);

/**
 * 普通用户/微信公众号注册
 * @param {} loginName,openId,smsCode,password
 */
export const register = (params) => getInfo(url+'/account/wechat/register/customer',params,'post');

/**
 * 找回密码
 * @param {} inputSMSCode,mobile,password
 */
export const findPassword = (params) => getInfo(url+'/security/password',params,'post');



/**
 * 网点查询
 * @param {city，中文}
 */
export const branchSearch = (params) => getInfo(url+'/wld/common/query/'+params.city+'/stores',{},'get');

/**
 * 客户登录: 查询微粒贷额度
 * @param {openId}
 */
export const searchLimit = (params) => getInfo(url+'/wld/common/wechat/loanmoney',params,'get');


