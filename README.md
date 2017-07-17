## 技术栈
vue2 + vuex + vue-router + webpack + ES6/7 + axios + sass 

## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本，本项目node环境6.2.0;

```
git clone ssh://git@10.160.10.50:10022/o2o/wld-wechat-client.git

cd wld-wechat-client  

npm install //安装项目依赖

```

### 开发环境
```
npm run dev

访问 http://localhost:8088（自动编译）
```

### 生产环境
```
npm run build   //生成的wld文件夹放在服务器即可正常访问
```


### 代码提交
```
git push origin dev //提交到分支
```

## 项目布局

.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── elm                                         // 上线项目文件
├── src                                         // 源码目录
│ ├── components                              // 组件
│ │ ├── common                              // 公共组件
│ │ ├── footer
│ │ │ └── footGuide.vue                   // 底部公共组件
│ │ └── header
│ │     └── head.vue                        // 头部公共组件
│ ├── config                                  // 基本配置
│ │ ├── env.js                              // 环境切换配置
│ │ ├── fetch.js                            // 获取数据
│ │ ├── mUtils.js                           // 常用的js方法
│ │ └── rem.js                              // px转换rem
│ ├── images                                  // 公共图片
│ ├── page                                    // 页面
│   ├── accountManagement                    // 账号管理
|   |   |   ├── forgetPassword.vue              // 忘记密码
|   |   |   ├── register.vue                    // 注册
|   |   |   ├── resetPassword.vue               // 重置密码
|   |   |   ├── resetSuccess.vue                // 重置密码成功
│   |   └── login.vue                       // 登录
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
│ ├── plugins                                 // 引用的插件
│ ├── router
│ │ └── router.js                           // 路由配置
│ ├── service                                 // 数据交互统一调配
│ │ └── getData.js                          // 对接口进行统一管理
│ ├── store                                   // vuex的状态管理
│ │ ├── action.js                           // 配置actions
│ │ ├── getters.js                          // 配置getters
│ │ ├── index.js                            // 引用vuex，创建store
│ │ ├── modules                             // store模块
│ │ ├── mutation-types.js                   // 定义常量muations名
│ │ └── mutations.js                        // 配置mutations
│ └── style
│   ├── common.scss                         // 公共样式文件
│   └── mixin.scss
│ ├── App.vue                                 // 页面入口文件
│ ├── main.js                                 // 程序入口文件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.

## 前后端数据交互之[axios](https://www.axios.com/)
#### 1.组件中调用

```
  //从service的 getDta.js中引入你要调用的函数
  import { getOrderList } from '../../service/getData';
  
  export default {
    created(){//vue实例被创建后执行
      this.getMsg();    //this指向vue实例
    },
    //该组件中所有执行函数均存放在这里
    methods() { 
        getMsg() {
            getOrderList({
                params:params,  //传参
            }).then((data) =>{
                //响应的结果
            })
            
        },
    }
  }
  
```


#### 2.service/getData.js
```
    import gitInfo from '../config/axios';    //引入封装好的axios组件
    var getOrderList = (params) => getInfo(url,params,method);
    //参数解释:
    //params:组件中调用该方法传的参数
    //url:接口路径
    //method:请求方法
    
    export { getOrderList } //记得export该函数!
```

#### 3.axios.js

```
import axios from 'axios';   

var fetch = axios.create({  //创建axios实例
    headers: { 'Content-Type': 'application/json' }     //设置请求头
})

function json2url(json,isQueryToken) {  //将参数封装成（a=a&b=b）形式
	if(!isQueryToken) {
		json.accessToken = accessToken;	//每次请求都带上accessToken
	}
	var arr = [];
	var str = '';
	for (var i in json) {
		str = i + '=' + json[i];
		arr.push(str);
	}
	return arr.join('&');
}

var getInfo = (url='',data={},type='get',isQueryToken=false) =>{
    if(type === 'get'){	//get请求
        var params = json2url(data,isQueryToken);
		var getUrl = params ? (url + '?' + params) : url ;	//若传参data为空的话，就不拼接，不为空，则拼接url
		return fetch.get(getUrl).then(function (resp) {
			if (resp.data.data && resp.data.data.accessToken) {	//更新accessToken
				window.localStorage.setItem('accessToken', resp.data.data.accessToken);
			}
			return resp.data ;  //axios会在响应参数外包裹一层
		});  
    }
	if (type === 'post') { //post请求
		var postUrl ;
		if (!isQueryToken) {
			postUrl = url.split("?")[1] ? url.split("?")[0] + "?" + url.split("?")[1] + "&accessToken=" + accessToken : url + "?accessToken=" + accessToken;
		} else {
			postUrl = url
		}

		return fetch({
			method: type,
			url: postUrl,
			data: data,     //请求body
		}).then(function(resp) {
			if (resp.data.data && resp.data.data.accessToken) { //更新accessToken
				window.localStorage.setItem('accessToken', resp.data.data.accessToken);
			}
			return resp.data;
		})
	}
};
export { getInfo }

```
## UI
#### [UI库-vux](https://vux.li/#/)
#### src/config/rem.js,以iphone6尺寸标准,1rem=37.5px

## 公共函数 mUtils.js
###### 获取url中的参数
```
export const getQuery = (key) => {
    const location = window.location;
    const query = {};
    const params = location.href.split('?')[1] || '';
    if (params) {
        params.split('&').forEach((item) => {
            const queryPair = item.split('=');
            query[queryPair[0]] = queryPair[1];
        });
    }

    const rst = query[key];
    //解码一个编码的 URI。
    return rst ? window.decodeURIComponent(query[key]) : '';
}
```
###### 响应异常处理
```
import Vue from 'vue';
export const customToast = e => {
    Vue.$vux.toast.show({
        text: e.message,
        type: 'text',
        width: '80%',
        time: 1500
    })
    if(e.code == 401) { //重新登入
       window.location.href="/#/login";
    }
}
```