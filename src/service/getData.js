import {getInfo} from '../config/axios';

// const url = 'http://10.160.10.50:8005/wld/api';
const url = process.env.NODE_ENV === 'development' ? 'http://beauty-dev.vdanbao.com/o2o/platform/api' : 'http://beauty-dev.vdanbao.com/o2o/platform/api' ;

                        /**************************************************************************************************************************** */
                        /****************************************************账户管理模块************************************************************ */
                        /*************************************************************************************************************************** */
/**
 * 登录接口
 * @param { } openId,username,password 
 */
var login = (params) => getInfo(url+'/security/login', params,'post',true);

/**
 * @param { appid secrect code grant_type	}
 * 获取关注用户openId
 */
var getOpenId =(params) => getInfo('https://api.weixin.qq.com/sns/oauth2/access_token',params,'get');

/**
 * @param {accountId,openId,thirdType} thirdType-->weixin
 * 用户登录成功后，调用该接口绑定一个微信账号
 */
var bindWechat = (params) => getInfo(url+'/account/thirdAccount/binding?accessToken='+params.accessToken, params,'post',true);

/** 
 * 根据第三方账号换取accessToken
 * @param {thirdAccount ,thirdType}
 */
var getToken = (params) => getInfo(url+'/security/token/thirdAccount',params,'post',true);

/**
 * @param { mobile, smsCode }
 * 用户登录 -- 短信验证登录
 */
var smsLogin = (params) => getInfo(url+'/security/login/sms', params,'post',true);

/**
 * @param { mobile, smsCode }
 * 用户登录 -- 短信验证登录
 */
var getAccountId = (params) => getInfo(url+'/account/token/info', params,'get');

                        /**************************************************************************************************************************** */
                        /****************************************************订单管理模块************************************************************ */
                        /*************************************************************************************************************************** */

/**
 * @param {accountId}
 * 根据账号获取订单号
 */
var getOrder = (params) => getInfo(url+'/wld/order/'+params.accountId+'/orders',{},'post');

/**
 * @param { accountId }
 * 查看客户经理
 */
var checkManager = (params) => getInfo(url+'/wld/order/'+params.accountId +'/saleinfo',{},'get');

/**
 * @param {accountId,city,education,marriage,profession,salary}
 * 客户申请贷款: 保存或修改订单申请基本信息
 */
var saveOrderInfo = (params) => getInfo(url+'/wld/order/'+params.orderId+'/idcardAndBaseinfo',params,'post');

/**
 * 客户申请贷款: 客户创建订单
 */
var createOrder = (params) => getInfo(url+'/wld/order/createOrder?openId='+params.openId,params,'post');


/**
 * @param {orderId} 
 * 获取身份证正反面照片,姓名，身份证号
 */
var getIdCardInfo = (params) => getInfo(url+'/wld/order/'+params.orderId+'/idcardImage/info',{},'get');

/**
 * @param {orderId,idcardImageObverseBase64}
 * 上传身份证正面
 */
var uploadFacePic = (params) => getInfo(url+'/wld/order/'+params.orderId+'/idcardImage/obverse',{idcardImageObverseBase64:params.idcardImageObverseBase64},'post');

/**
 * @param {idcardImageReverseBase64}
 * 上传身份证反面照片
 */
var uploadBackPic = (params) => getInfo(url+'/wld/order/'+params.orderId+'/idcardImage/reverse',{idcardImageReverseBase64:params.idcardImageReverseBase64},'post');

/**
 * @param {accountId,facebase64}
 * 手持身份证照片验证
 */
var uploadHandPic = (params) => getInfo(url+'/wld/order/'+params.orderId+'/faceCompare/score',{facebase64:params.facebase64},'post');

/**
 * 上传维立贷借据
 */
var uploadDebt = (params) => getInfo(url+'/wld/order/'+params.orderId+'/londWechatIou',{wechatIouBase64:params.wechatIouBase64},'post');


/**
 * @param {accountId}
 * 客户申请贷款：OCR签名
 */
var getOcrSign = (params) => getInfo(url+'/wld/order/'+params.orderId+'/ocrAuditSignature',params,'get');



                      /**************************************************************************************************************************** */
                      /****************************************************贷前贷后*********************************************************** */
                      /*************************************************************************************************************************** */
/**
 * @param {orderId}
 * 银行卡认证
 */
var bankCardVerify = (params) => getInfo(url+'/wld/loan/'+params.orderId+'/creditCheck',params,'post');

/**
 * @param {} loanMoney,loanPeriod,orderId
 * 维立贷借款确认
 */
var loanConfirm = (params) => getInfo(url+'/wld/loan/loanConfirm',params,'post');

/**
 * @param {} bankCardType,bankName,cardNum,mobile,ownerIdcard,ownerName,smCode
 * 维立贷更换银行卡
 */
var changeBankCard = (params) => getInfo(url+'/wld/loan/'+params.accountId+'/changeBankCard',params,'post');

/**
 * @param {} idCard,name,cardNum,mobile,messageCode
 * 芝麻认证
 */
var sesameAuth = (params) => getInfo(url+'/wld/loan/'+params.orderId+'/sesameAuth',params,'post');

/**
 * @param {}
 * 查询预审额度
 */
var loanMoney = (params) => getInfo(url+'/wld/loan/'+params.orderId+'/query/loanMoney',params,'get');


                      /**************************************************************************************************************************** */
                      /****************************************************贷后接口*********************************************************** */
                      /*************************************************************************************************************************** */
/**
 * 账户借款记录查询
 * @param {isAll(boolean) required}
 */
var getLoanRecord = (params) => getInfo(url+'/wld//loanafter/'+params.accountId+'/loanRecord',params,'get');

/**
 * 还款计划
 * @param {orderId}
 */
var getRepayPlan = (params) => getInfo(url+'/wld//loanafter/'+params.orderId  +'/repaymentPlan',params,'get');
                      /**************************************************************************************************************************** */
                      /**********************************************手机详单采集接口*************************************************************** */
                      /*************************************************************************************************************************** */
/**
 * @param {identityCard，mobile，name}
 * 手机账单初始化
 */
var mobileInit = (params) => getInfo(url+'/mobile/bill/init',params,'post',true);
/**
 * 手机账单登录
 * @param {} params 
 */
var mobileLogin = (params) => getInfo(url+'/mobile/bill/login',params,'post',true);
/**
 * 手机账单-验证手机动态验证码
 * @param {*} params 
 */
var mobileCheckSms = (params) => getInfo(url+'/mobile/bill/sms/check',params,'post',true);
/**
 * 手机账单-发送手机动态验证码
 * @param {*} params 
 */
var mobileSendSms = (params) => getInfo(url+'/mobile/bill/sms/send',params,'post',true);

/**
 * @param {mobileId，mobile，orderId}
 * 上传mobileId
 */
var mobileId = (params) => getInfo(url+'/wld/order/mobileId',params,'post',true);
                      /**************************************************************************************************************************** */
                      /****************************************************common公共资源*********************************************************** */
                      /*************************************************************************************************************************** */
/**
 * 获取城市列表（放本地)
 * @param {isAll(boolean) required}
 */
var getCityList = (params) => getInfo(url+'/wld/common/city/list',params,'get');

/**
 * 获取银行卡列表
 * @param {}
 */
var getBankList = (params) => getInfo(url+'/common/bank/list',params,'get');


/**
 * 获取数据字典
 * @param {}  
 */
var getDictionaries = (params) => getInfo(url+'/common/dictionaries',{},'get');

/**
 * @param {loanmoney} openId
 * 客户进入公众号: 保存微粒贷额度
 */
var saveLimit = (params) => getInfo(url+'/wld/common/wechat/'+params.loanmoney+'?openId='+params.openId, {},'post');



/**
 * 获取图片验证码
 * @param {mobile} 
 */
var getImageCode = (params) => getInfo(url+'/wld/common/verification/Image/'+params.mobile,{},'get');

/**
 * 获取手机短信验证码(把图形验证码传给后端校验)
 * @param {mobile，verifyCode} 
 */
var getSmsCode = (params) => getInfo(url+'/common/verification/mobile/'+params.mobile,{"verifyCode":params.verifyCode},'get');

/**
 * 获取手机短信验证码(不带图形验证码)
 * @param {mobile，verifyCode} 
 */
var getNoImgSmsCode = (params) => getInfo(url+'/common/verification/mobile/'+params.mobile,{},'get',true);

/**
 * 普通用户/微信公众号注册
 * @param {} loginName,openId,smsCode,password
 */
var register = (params) => getInfo(url+'/account/wechat/register/customer',params,'post');

/**
 * 找回密码
 * @param {} inputSMSCode,mobile,password
 */
var findPassword = (params) => getInfo(url+'/security/password',params,'post');



/**
 * 网点查询
 * @param {city，中文}
 */
var branchSearch = (params) => getInfo(url+'/wld/common/query/'+params.city+'/stores',{},'get');

/**
 * 客户登录: 查询微粒贷额度
 * @param {openId}
 */
var searchLimit = (params) => getInfo(url+'/wld/common/wechat/loanmoney',params,'get');


export { 
  login,              //登录
  smsLogin,           //短信验证码登录
  register,           //注册
  saveLimit,          //保存额度
  searchLimit,        //查询微粒贷额度
  getOrder,           //获取orderId
  checkManager,       //查看客户经理
  getAccountId,
  uploadHandPic,      //上传手持身份证照片
  getIdCardInfo,      //获取身份证上的信息
  uploadFacePic,      //上传身份证正面照片
  uploadBackPic,      //上传身份证背面照片
  getOcrSign,
  saveOrderInfo,
  getCityList,        //获取城市列表
  getDictionaries,    //获取数据字典（身份认证页面）
  getToken,           //获取用户token
  getImageCode,       //获取图片验证码
  findPassword,       //找回密码
  getSmsCode,         //获取短信验证码
  getNoImgSmsCode,    //获取没有短信图片验证码的短信验证码
  branchSearch,       //网点查询
  getOpenId,          //获取openId
  getBankList,        //获取银行列表
  createOrder,        //创建订单
  bindWechat,          //绑定微信账号
  uploadDebt,
  //手机详单采集接口
  mobileInit,
  mobileLogin,
  mobileCheckSms,
  mobileSendSms,
  mobileId,
  // 贷前贷后
  loanConfirm,          //借款确认
  changeBankCard,       //维粒贷更换银行卡
  bankCardVerify,       //银行卡认证
  sesameAuth,           //芝麻授权
  loanMoney,            //查询预审额度
  //贷后接口
  getLoanRecord,
  getRepayPlan
}



