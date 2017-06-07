import {getInfo} from '../config/axios';


                        /**************************************************************************************************************************** */
                        /****************************************************订单管理模块************************************************************ */
                        /*************************************************************************************************************************** */
/**
 * 登录接口
 * @param { } openId,username,password 
 */
var login = (params) => getInfo('http://10.160.10.50:8020/account/wechat/login', params,'post');
/**
 * @param { appid secrect code grant_type	}
 * 获取关注用户openId
 */
var getOpenId =(params) => getInfo('https://api.weixin.qq.com/sns/oauth2/access_token',params,'get');

                        /**************************************************************************************************************************** */
                        /****************************************************订单管理模块************************************************************ */
                        /*************************************************************************************************************************** */

/**
 * @param {accountId}
 * 根据账号获取订单号
 */
var getOrder = (params) => getInfo('http://10.160.10.50:8008/orders/'+params.accountId+'/orders',{},'get');

/**
 * @param { accountId }
 * 查看客户经理
 */
var checkManager = (params) => getInfo('http://10.160.10.50:8008/orders/'+params.accountId +'/saleinfo',{},'get');

/**
 * @param {}
 * 银行卡认证
 */
var bankCardVerify = (params) => getInfo('http://10.160.10.50:8008/orders/'+params.orderId+'/creditCheck',params,'post');


/**
 * @param {accountId,city,education,marriage,profession,salary}
 * 客户申请贷款: 保存或修改订单申请基本信息
 */
var saveOrderInfo = (params) => getInfo('http://10.160.10.50:8008/orders/'+params.orderId+'/idcardAndBaseinfo',params,'post');

/**
 * 客户申请贷款: 客户创建订单
 */
var createOrder = (params) => getInfo('http://10.160.10.50:8008/orders?openId='+params.openId,params,'post');


/**
 * @param {orderId} 
 * 获取身份证正反面照片,姓名，身份证号
 */
var getIdCardInfo = (params) => getInfo('http://10.160.10.50:8008/orders/'+params.orderId+'/idcardImage/info',{},'get');

/**
 * @param {idcardImageObverseBase64}
 * 上传身份证正面
 */
var uploadFacePic = (params) => getInfo('http://10.160.10.50:8008/orders/'+params.orderId+'/idcardImage/obverse',{idcardImageObverseBase64:params.idcardImageObverseBase64},'post');

/**
 * @param {idcardImageReverseBase64}
 * 上传身份证反面照片
 */
var uploadBackPic = (params) => getInfo('http://10.160.10.50:8008/orders/'+params.orderId+'/idcardImage/reverse',{idcardImageReverseBase64:params.idcardImageReverseBase64},'post');

/**
 * @param {accountId,facebase64}
 * 手持身份证照片验证
 */
var uploadHandPic = (params) => getInfo('http://10.160.10.50:8008/orders/'+params.orderId+'/faceCompare/score',{facebase64:params.facebase64},'post');


/**
 * @param {accountId}
 * 客户申请贷款：OCR签名
 */
var getOcrSign = (params) => getInfo('http://10.160.10.50:8008/orders/'+params.orderId+'/ocrAuditSignature',params,'get');

/**
 * @param {}
 * 客户申请贷款：查询预审结果
 */
var getCheckResult = (params) => getInfo('http://10.160.10.50:8008/orders/'+params.accountId+'/result',params,'get');


                      /**************************************************************************************************************************** */
                      /****************************************************common公共资源************************************************************ */
                      /*************************************************************************************************************************** */
/**
 * 获取城市列表（放本地)
 * @param {isAll(boolean) required}
 */
var getCityList = (params) => getInfo('http://10.160.10.50:8019/common/city/list',params,'get');

/**
 * 获取银行卡列表
 * @param {}
 */
var getBankList = (params) => getInfo('http://10.160.10.50:8019/common/bank/list',params,'get');


/**
 * 获取数据字典
 * @param {}  
 */
var getDictionaries = (params) => getInfo('http://10.160.10.50:8019/common/dictionaries',{},'get');

/**
 * @param {loanmoney} openId
 * 客户进入公众号: 保存微粒贷额度
 */
var saveLimit = (params) => getInfo('http://10.160.10.50:8019/common/wechat/'+params.loanmoney+'?openId='+params.openId,'post');

/**
 * 获取accessToken
 * @param {*} openId 
 */
var getToken = (params) => getInfo('http://10.160.10.50:8019/common/init/accessToken',params,'get');

/**
 * 获取图片验证码
 * @param {mobile} 
 */
var getImageCode = (params) => getInfo('http://10.160.10.50:8019/common/verification/Image/'+params.mobile,{},'get');

/**
 * 获取手机短信验证码(把图形验证码传给后端校验)
 * @param {mobile，verifyCode} 
 */
var getSmsCode = (params) => getInfo('http://10.160.10.50:8019/common/verification/mobile/'+params.mobile,{"verifyCode":params.verifyCode},'get');


/**
 * 普通用户/微信公众号注册
 * @param {} loginName,openId,smsCode,password
 */
var register = (params) => getInfo('http://10.160.10.50:8019/common/wechat/register/customer',params,'post');

/**
 * 找回密码
 * @param {} inputSMSCode,mobile,password
 */
var findPassword = (params) => getInfo('http://10.160.10.50:8019/common/passwordFirst',params,'post');
/**
 * 重置密码
 * @param {  }
 */
var resetPassword = (params) => getInfo('http://10.160.10.50:8019/common/passwordSecond',params,'post');


/**
 * 网点查询
 * @param {city，中文}
 */
var branchSearch = (params) => getInfo('http://10.160.10.50:8019/common/query/'+params.city+'/stores',{},'get');

/**
 * 客户登录: 查询微粒贷额度
 * @param {openId}
 */
var searchLimit = (params) => getInfo('http://10.160.10.50:8019/common/wechat/loanmoney?openId='+params.openId,{},'get');


export { 
  login,              //登录
  register,           //注册
  saveLimit,          //保存额度
  searchLimit,        //查询微粒贷额度
  getOrder,           //获取orderId
  checkManager,       //查看客户经理
  bankCardVerify,     //银行卡认证
  uploadHandPic,      //上传手持身份证照片
  getIdCardInfo,      //获取身份证上的信息
  uploadFacePic,      //上传身份证正面照片
  uploadBackPic,      //上传身份证背面照片
  getOcrSign,
  getCheckResult,
  saveOrderInfo,
  getCityList,        //获取城市列表
  getDictionaries,    //获取数据字典（身份认证页面）
  getToken,           //获取用户token
  getImageCode,       //获取图片验证码
  findPassword,       //找回密码
  resetPassword,      //重置密码
  getSmsCode,         //获取短信验证码
  branchSearch,       //网点查询
  getOpenId,          //获取openId
  getBankList,        //获取银行列表
  createOrder         //创建订单
}



