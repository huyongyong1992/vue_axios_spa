
## 技术栈
vue2 + vuex + vue-router + webpack + ES6/7 + fetch + sass + flex + svg



# 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，node 7 是先行版，有可能会出问题，建议使用 node 6 稳定版(我是6.2.0)

```
git clone ssh://git@10.160.10.50:10022/o2o/wld-wechat-client.git

cd wld-wechat-client  

npm install(装个淘宝镜像 cnpm install)

```

### 编译环境
```
npm run dev

访问 http://localhost:8088
```

### 线上版本
```
npm run build
```

生成的elm文件夹放在服务器即可正常访问

### 代码提交
```
git branch dev //切换到dev分支

git push origin dev //提交到分支
```

# 项目布局


.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── elm                                         // 上线项目文件
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   ├── footer
│   │   │   └── footGuide.vue                   // 底部公共组件
│   │   └── header
│   │       └── head.vue                        // 头部公共组件
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 环境切换配置
│   │   ├── fetch.js                            // 获取数据
│   │   ├── mUtils.js                           // 常用的js方法
│   │   └── rem.js                              // px转换rem
│   ├── images                                  // 公共图片
│   ├── page                                    // 页面
│   │   ├── accountManagement                    // 账号管理
|   |   |   ├── forgetPassword.vue              // 忘记密码
|   |   |   ├── register.vue                    // 注册
|   |   |   ├── resetPassword.vue               // 重置密码
|   |   |   ├── resetSuccess.vue                // 重置密码成功
│   │   |   └── login.vue                       // 登录
|   |   |  
|   |   ├── borrowMoney                         // 取现模块
|   |   |   ├── borrowMoney.vue                 // 取现
|   |   |   ├── borrowSuccess.vue               // 取现成功
|   |   |   └── waitingLink.vue                 // 等待联系
|   |   |
|   |   ├── customerManager                     // 客户经理
|   |   |   └── customerManager.vue             // 我的客户经理
|   |   |
|   |   ├── isLimit                             // 是否有额度
|   |   |   ├── applyFail.vue                   // 还款失败
|   |   |   ├── applySucecess.vue               // 还款成功
|   |   |   ├── calculateLimit.vue              // 计算额度
|   |   |   └── isLimit.vue                     // 是否有额度
|   |   |
|   |   ├── myBill                              // 我的账单
|   |   |   ├── borrowRecord.vue                // 借款记录
|   |   |   ├── myBill.vue                      // 我的账单
|   |   |   ├── repayAllBill.vue                // 结清所有账单
|   |   |   ├── repayCurrentBill.vue            // 还清当前账单
|   |   |   └── repayPlan.vue                   // 还款计划
|   |   |
|   |   ├── more                                // 更多
|   |   |   ├── aboutUs.vue                     // 关于维粒贷
|   |   |   ├── connectUs.vue                   // 联系我们
|   |   |   ├── greenhand.vue                   // 新手指引
|   |   |   ├── branchSearch.vue                // 网点查询
|   |   |   └── generalQuestion.vue             // 常见问题
|   |　 |       ├── qa.vue                      // 常见问题
|   |　 |       └── suggestion.vue              //意见反馈
|   |   |
|   |   ├── personalInfo                        // 个人信息
|   |   |   ├── emergencyContact.vue            // 紧急联系人
|   |   |   ├── presentAddress.vue              // 现居地
|   |   |   ├── jobInfo.vue                     // 工作信息
|   |   |   └── getLimit.vue                    // 获取额度
|   |　 |       ├── bankCardAuthentication.vue  // 银行卡认证
|   |　 |       ├── mobileAuthentication.vue    // 手机认证
|   |　 |       ├── completeInfo.vue            // 完善信息
|   |　 |       ├── bankCardAuthentication.vue  // 银行卡认证
|   |　 |       └── personalAuthentication.vue  // 实名认证
|   |　 |
|   |   ├── recommendGift                       // 推荐有礼
|   |　 |   ├── recommendGift.vue               // 推荐有礼
|   |　 |   ├── createInviteCode.vue            // 创建邀请码
|   |　 |   └── myRecommend.vue                 // 我的推荐
|   |   |
│   ├── plugins                                 // 引用的插件
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   └── getData.js                          // 对接口进行统一管理
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── getters.js                          // 配置getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   └── style
│       ├── common.scss                         // 公共样式文件
│       └── mixin.scss
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.

```

# 前后端数据交互之fetch
#### 1.组件中

```
  //从service的 getDta.js中引入你要调用的函数
  import { getOrderList } from '../../service/getData';
  
  export default {
    created(){//vue实例被创建后执行
      this.getMsg();    //this指向vue实例
    },
    //该组件中所有执行函数均存放在这里
    methods() { 
      async getMsg() {
        this.data = await getOrderList({
            params:params,  //传参
        });   //调用getData中的方法
        console.log(this.data.title)
      },
    }
  }
  
```
[vue 事件](https://cn.vuejs.org/v2/guide/events.html)

#### 2.service/getData.js
```
    import fetch from '../config/fetch';    //引入封装好的fetch组件
    var getOrderList = (params) => fetch.admin.homepage(params)
    //参数解释:
    //params:组件中调用该方法传的参数
    //admin(名字根据具体情况可换) -->对应下面fetch.js文件中的admin
    //homepage(名字根据具体情况可换) -->对应下面fetch.js文件中的homepage
    
    export { getOrderList } //记得export!!!
```

#### 3.fetch.js

```
import nattyFetch from 'natty-fetch';   //我们用的是natty-fetch
//接口url
const apiUrl = {    
  development: '//api.m-internal.s-ant.cn/m/',
  production: '//api.m.microants.cn/m/',
};
const mat = localStorage.getItem('mat');    //用户token信息
const context = nattyFetch.context({    //fetch API,自己官网看
  mock: process.env.NODE_ENV === 'development', 
  mockUrlPrefix: './mock/',//开发环境用本地/mock/下的mock数据
  url: apiUrl[process.env.NODE_ENV],    //根据环境变量配置接口url
  willFetch: function fit(vars) {
    vars.mark = {
      api: vars.mark._api,
    };
    if (vars.data.data) vars.data.data = JSON.stringify(vars.data.data);
    return vars;
  },
  fit: function fit(resp) {
    // 更新mat(如果后端返回token信息,那么我们要重新更新mat)
    if (resp.meta && resp.meta.mat) {
      socket.init(resp.meta.mat);
      window.localStorage.setItem('mat', resp.meta.mat);
    }

    return {
      success: resp.result.success,
      content: resp.result.data,
      error: {      //封装后端报错信息(具体看mock下面的json文件格式,就会明白)
        errorMsg: resp.result.msg,
        errorCode: resp.result.code,
      },
    };
  },
  data: {
    v: '1.0',
    ttid: '0.1.0_admin@pc',
    did: '0',
    sign: 'sign',
    mat,
  },
  urlStamp: 'ts',
});


//接口请求名全放这里

/**
 *  1.只能模拟get请求(post请求在本地模拟的话请改成get)
 *  2.fetch API  -->调用方式: fetch.admin(create中传的第一个参数).homepage(传的第二个参数)
**/ 
context.create('admin', {
  homepage: {
    mockUrl: 'admin.homepage.json',
  },
  login: {
    method: 'POST',
    mockUrl: 'admin.login.json',
  }
});

export default context.api;
```


# 更新记录
2017-5-4  更改src/config/rem.js  ,改为以iphone6尺寸标准
/**
 * 2017-5-11 加入图片上传组件
 */
