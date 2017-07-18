import App from '../App'
/**
 * 是否有额度
 * @Author   huyongyong
 * @DateTime 2017-05-12T14:14:44+0800
 */
/**
 * @Author   huyongyong
 * @DateTime 2017-05-26T14:14:44+0800
 */
const redirect = r => require.ensure([], () => r(require('../page/isLimit/redirect')), 'redirect'); //重定向
const isLimit = r => require.ensure([], () => r(require('../page/isLimit/isLimit')), 'isLimit'); //是否有额度
const calculateLimit = r => require.ensure([], () => r(require('../page/isLimit/calculateLimit')), 'calculateLimit'); //计算额度
const applySuccess = r => require.ensure([], () => r(require('../page/isLimit/applySuccess')), 'applySuccess'); //授信成功
const applyFail = r => require.ensure([], () => r(require('../page/isLimit/applyFail')), 'applyFail'); //授信失败
const fillLimit = r => require.ensure([], () => r(require('../page/isLimit/fillLimit')), 'fillLimit'); //填写额度
const EstimatedMoney = r => require.ensure([], () => r(require('../page/isLimit/EstimatedMoney')), 'EstimatedMoney'); //填写额度
const billSavingCard = r => require.ensure([], () => r(require('../page/isLimit/billSavingCard')), 'billSavingCard'); //添加收款和借款银行卡

/**
 * 个人信息模块
 * @Author   huyongyong
 * @DateTime 2017-05-12T14:04:25+0800
 */
const getLimit = r => require.ensure([], () => r(require('../page/personalInfo/getLimit')), 'getLimit') //获取额度
const myBankList = r => require.ensure([], () => r(require('../page/personalInfo/myBankList')), 'myBankList'); //我的银行卡列表
const myInfo = r => require.ensure([], () => r(require('../page/personalInfo/myInfo')), 'myInfo'); //工作信息
const uploadDebt = r => require.ensure([], () => r(require('../page/personalInfo/uploadDebt')), 'uploadDebt'); //上传借据
const zhimaAuth = r => require.ensure([], () => r(require('../page/personalInfo/zhimaAuth')), 'zhimaAuth'); //芝麻信用

//二级路由
const personalAuthentication = r => require.ensure([], () => r(require('../page/personalInfo/children/personalAuthentication')), 'personalAuthentication'); //实名认证
const savingCard = r => require.ensure([], () => r(require('../page/personalInfo/children/savingCard')), 'savingCard'); //储蓄卡认证
const bankCardAuthentication = r => require.ensure([], () => r(require('../page/personalInfo/children/bankCardAuthentication')), 'bankCardAuthentication'); //银行卡认证
const completeInfo = r => require.ensure([], () => r(require('../page/personalInfo/children/completeInfo')), 'completeInfo'); //完善信息
const mobileAuth = r => require.ensure([], () => r(require('../page/personalInfo/children/mobileAuth')), 'mobileAuth'); //手机认证

/**
 * 取现
 * @Author   huyongyong
 * @DateTime 2017-05-12T14:03:49+0800
 */
const borrowMoney = r => require.ensure([], () => r(require('../page/borrowMoney/borrowMoney')), 'borrowMoney'); //取现
const borrowSuccess = r => require.ensure([], () => r(require('../page/borrowMoney/borrowSuccess')), 'borrowSuccess') //取现成功
const waitingLink = r => require.ensure([], () => r(require('../page/borrowMoney/waitingLink')), 'waitingLink') //等待联系

/**
 * 我的客户经理
 * @Author   huyongyong
 * @DateTime 2017-05-12T13:47:21+0800
 */
const customerManager = r => require.ensure([], () => r(require('../page/customerManager/customerManager')), 'customerManager'); //我的客户经理

/**
 * 账号管理模块
 * @Author   huyongyong
 * @DateTime 2017-05-12T14:05:21+0800
 */
const login = r => require.ensure([], () => r(require('../page/accountManagement/login')), 'login'); //登录
const register = r => require.ensure([], () => r(require('../page/accountManagement/register')), 'register'); //注册页面
const forgetPassword = r => require.ensure([], () => r(require('../page/accountManagement/forgetPassword')), 'forgetPassword'); //忘记密码
const resetPassword = r => require.ensure([], () => r(require('../page/accountManagement/resetPassword')), 'resetPassword'); //重置密码
const resetSuccess = r => require.ensure([], () => r(require('../page/accountManagement/resetSuccess')), 'resetSuccess'); //重置成功

/**
 * 我的账单
 * @Author   huyongyong
 * @DateTime 2017-05-12T14:11:47+0800
 */
const myBill = r => require.ensure([], () => r(require('../page/myBill/myBill')), 'myBill'); //我的账单
const borrowRecord = r => require.ensure([], () => r(require('../page/myBill/borrowRecord')), 'borrowRecord'); //借款记录
const repayCurrentBill = r => require.ensure([], () => r(require('../page/myBill/repayCurrentBill')), 'repayCurrentBill'); //支付当前账单
const repayPlan = r => require.ensure([], () => r(require('../page/myBill/repayPlan')), 'repayPlan'); //还款计划
const repayAllBill = r => require.ensure([], () => r(require('../page/myBill/repayAllBill')), 'repayAllBill'); //结清所有账单
const addBankCard = r => require.ensure([], () => r(require('../page/myBill/addBankCard')), 'addBankCard'); //添加银行卡
const gatheringAccount = r => require.ensure([], () => r(require('../page/myBill/gatheringAccount')), 'gatheringAccount'); //收款账户
const loanResult = r => require.ensure([], () => r(require('../page/myBill/loanResult')), 'loanResult'); //贷款结果
const repaymentSuccess = r => require.ensure([], () => r(require('../page/myBill/repaymentSuccess')), 'repaymentSuccess'); //还款成功
const contactCustomer = r => require.ensure([], () => r(require('../page/myBill/contactCustomer')), 'contactCustomer'); //还款成功



/**
 * 推荐有礼
 * @Author   huyongyong
 * @DateTime 2017-05-12T14:11:17+0800
 */
const recommendGift = r => require.ensure([], () => r(require('../page/recommendGift/recommendGift')), 'recommendGift'); //推荐有礼
const createInviteCode = r => require.ensure([], () => r(require('../page/recommendGift/createInviteCode')), 'createInviteCode'); //生成邀请码
const myRecommend = r => require.ensure([], () => r(require('../page/recommendGift/myRecommend')), 'myRecommend'); //我的推荐

/**
 * 更多
 * @Author   huyongyong
 * @DateTime 2017-05-12T14:10:00+0800
 */
const greenhand = r => require.ensure([], () => r(require('../page/more/greenhand')), 'greenhand'); //新手指引
const connectUs = r => require.ensure([], () => r(require('../page/more/connectUs')), 'connectUs'); //联系我们
const aboutUs = r => require.ensure([], () => r(require('../page/more/aboutUs')), 'aboutUs'); //关于维粒贷
const registerServerAgreement = r => require.ensure([], () => r(require('../page/more/registerServerAgreement')), 'registerServerAgreement'); //用户注册协议
const onlineLoanContrac = r => require.ensure([], () => r(require('../page/more/onlineLoanContrac')), 'onlineLoanContrac'); //线上贷款合同
const branchSearch = r => require.ensure([], () => r(require('../page/more/branchSearch')), 'branchSearch'); //网点查询
const generalQuestion = r => require.ensure([], () => r(require('../page/more/generalQuestion')), 'generalQuestion') //常见问题
const cityPicker = r => require.ensure([], () => r(require('../page/more/cityPicker')), 'cityPicker') //城市选择
    //二级路由
const qa = r => require.ensure([], () => r(require('../page/more/children/qa')), 'qa'); //常见问题
const suggestion = r => require.ensure([], () => r(require('../page/more/children/suggestion')), 'suggestion'); //意见反馈


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转isLimit页面
        {
            path: '',
            redirect: '/redirect'
        },
        //重定向页面
        {
            path: '/redirect',
            component: redirect
        },
        //微粒贷提示页面-->是否有额度
        {
            path: '/isLimit',
            component: isLimit
        }, {
            path: '/fillLimit',
            component: fillLimit
        }, {
            path: '/EstimatedMoney', //预估额度
            component: EstimatedMoney
        },
        {
            path: '/myBankList', //我的银行卡列表
            component: myBankList
        },
        {
            path: '/myInfo', //工作信息
            component: myInfo
        }, {
            path: 'uploadDebt', //上传借据
            component: uploadDebt
        }, {
            path: 'zhimaAuth',
            component: zhimaAuth
        }, {
            path: '/getLimit',
            component: getLimit,
            children: [{
                path: 'personalAuthentication', //实名认证
                component: personalAuthentication
            }, {
                path: 'savingCard', //储蓄卡
                component: savingCard
            }, {
                path: 'bankCardAuthentication', //银行卡验证(信用卡)
                component: bankCardAuthentication
            }, {
                path: 'completeInfo', //完善信息页
                component: completeInfo
            }, {
                path: 'mobileAuth', //手机认证
                component: mobileAuth
            }]
        },
        {
            path: 'calculateLimit', //额度计算中
            component: calculateLimit
        }, {
            path: 'applySuccess', //授信成功页
            component: applySuccess
        }, {
            path: 'applyFail',
            component: applyFail
        },
        {
            path: 'billSavingCard', //添加收款和借款储蓄卡
            component: billSavingCard
        },

        //取现
        {
            path: '/borrowMoney', //取现
            component: borrowMoney
        }, {
            path: 'borrowSuccess', //取现成功
            component: borrowSuccess
        }, {
            path: 'waitingLink', //高额取现
            component: waitingLink
        },
        //我的客户经理
        {
            path: '/customerManager',
            component: customerManager
        },
        //我的账单
        {
            path: 'myBill', //我的账单
            component: myBill
        }, {
            path: 'borrowRecord', //借款记录
            component: borrowRecord
        }, {
            path: 'repayCurrentBill', //还本期账单
            component: repayCurrentBill
        }, {
            path: 'repayPlan', //还款计划
            component: repayPlan
        }, {
            path: 'repayAllBill',
            component: repayAllBill
        }, {
            path: 'addBankCard',
            component: addBankCard
        }, {
            path: 'gatheringAccount',
            component: gatheringAccount
        }, {
            path: 'loanResult',
            component: loanResult
        }, {
            path: 'repaymentSuccess',
            component: repaymentSuccess
        }, {
            path: 'contactCustomer', //贷款成功联系客服
            component: contactCustomer
        },
        //推荐有礼
        {
            path: 'recommendGift',
            component: recommendGift
        }, {
            path: 'createInviteCode',
            component: createInviteCode
        }, {
            path: 'myRecommend',
            component: myRecommend
        },

        //账号管理
        //登录页
        {
            path: '/login',
            component: login
        },
        //注册页
        {
            path: '/register',
            component: register
        },
        //忘记密码页
        {
            path: '/forgetPassword',
            component: forgetPassword
        },
        //重置密码页
        {
            path: '/resetPassword',
            component: resetPassword
        },
        //密码重置成功页
        {
            path: '/resetSuccess',
            component: resetSuccess
        },

        //更多
        {
            path: '/greenhand', //新手指引
            component: greenhand
        }, {
            path: '/connectUs', //联系客服
            component: connectUs
        }, {
            path: '/branchSearch', //网点查询
            component: branchSearch
        },
        {
            path: '/generalQuestion', //常见问题页
            component: generalQuestion,
            children: [{
                path: 'qa', //常见问题问答
                component: qa,
            }, {
                path: 'suggestion', //吐槽维粒贷
                component: suggestion
            }]
        }, {
            path: '/aboutUs',
            component: aboutUs
        }, {
            path: '/registerServerAgreement', //用户注册协议
            component: registerServerAgreement
        }, {
            path: '/ onlineLoanContrac', //线上贷款合同
            component: onlineLoanContrac
        }, {
            path: 'cityPicker', //城市选择
            component: cityPicker
        }

    ]
}]
