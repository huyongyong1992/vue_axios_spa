import { request } from '../config/request';

export const getWxAuthUrl = (params) => request('/pdabc-mkt/oauth/getAuthUrl', params, 'get');

export const getRandomNameList = (params) => request('/pdabc-common/name_template/listRandom', params, 'get');

export const login = (params) => request('/pdabc-mkt/oauth/sms/stu', params, 'post');

/* 获取微信分享所需的appid等 */
export const wechatShareAPI = (params) => request('/pdabc-common/wx/getShareParam', params, 'POST');

/**
 * 发送短信验证码
 * @param {int 1} type
 * @param { } phone
 */
export const sendSmsCode = (params) => request(`/pdabc-common/sms-code`, params, 'post');

export const getUserInfo = (params) => request(`/pdabc-crm/user-stu/${params.id}`, {}, 'get');

export const getCenterUserInfo = (params) => request(`/pdabc-mkt/user-stu/${params.id}`, {}, 'get');

export const getChannelId = (params) => request(`/pdabc-mkt/user-stu/getChannelIdById/${params.id}`, {}, 'get');

/**
 * 获取订单列表(已购买)
 * @param {int} userId
 * @param {1} status
 */

export const getOrderList = (params) => request(`/pdabc-mkt/order-info`, params, 'get');

/**
 * 获取上课信息列表
 * @param {int} stuId
 * @param {0:未确认，1:未上课， 2：上课中，3：已上课} status 上课状态
 * @param { 1短期班 2长期班 } type 班级类型
 */
export const getClassListInfo = (params) => request(`/pdabc-mkt/class-sch`, params, 'get');

/**
 * 查询短期班进度
 * @param {String } userId 学生id
 */
export const getShortClassProcess = (params) => request(`/pdabc-mkt/user-stu/getShortProgress/${params.userId}`, {}, 'get');

// 编辑学生信息
export const editStuInfo = (params) => request(`/pdabc-common/user-stu/${params.id}`, params, 'put');

/*
 * 获取学习报告(通过班级id和学员id)
 */
export const getStudyReportByClsAndStu = (params) => request(`/pdabc-crm/stu-study-report/getByClassSchIdAndStuId/${params.classSchId}/${params.stuId}`, {}, 'get');

/*
 * 获取学习报告(通过报告id)
 */
export const getStudyReportById = (params) => request(`/pdabc-crm/stu-study-report/${params.reportId}`, {}, 'get');

/**
 * 上传图片
 * @param {formData形式，支持多文件上传} file
 */
export const uploadFiles = (params) => request(`/file/upload`, params, 'post');

// 获取省市区字典
export const getChinaAddress = (params) => request(`pdabc-crm/region-info/loadAllRegion`, {}, 'get');

/** ***************************************************************************************** */
/** *************************************** 收货地址管理 ************************************* */
/** **************************************************************************************** */

// 查询收货地址列表:http://192.168.10.204:3001/xiaoyao/doc/CYO4FVLBF
export const getRecievedAddress = (params) => request(`/pdabc-mkt/user-address`, params, 'get');

// 查询收货地址详情:http://192.168.10.204:3001/xiaoyao/doc/CYO4FVLBF
export const getRecievedAddressDetail = (params) => request(`/pdabc-mkt/user-address/${params.addressId}`, {}, 'get');
/**
 * 新增收货地址
 * @param { Number} userId：用户id
 * @param { Number} provinceId： 省代号
 * @param { Number} cityId：城市代号
 * @param { Number} areaId:区代号
 * @param { Number} channelId:渠道id
 * @param { String} receiverName:收货者姓名
 * @param { Number} receiverPhone：收货者手机号
 * @param { String} address：详细收货地址
 */
export const addRecievedAddress = (params) => request(`/pdabc-mkt/user-address`, params, 'post');

/**
 * 修改地址
 * @param {Number} addressId：收货地址id
 * 其他参数同新增收货地址
 */
export const updateRecievedAddress = (params) => request(`/pdabc-mkt/user-address/${params.id}`, params, 'put');
