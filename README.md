# 参考自 [bailicangdu](https://github.com/bailicangdu/vue2-elm)，在此基础上做了一些修改，优化。
## 技术栈
vue2 + vuex + vue-router + webpack + ES6/7 + axios + sass 

## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本，本项目node环境6.2.0;

```
git clone ssh://git@10.160.10.50:10022/o2o/wld-wechat-client.git

cd vue_axios_spa

npm install //安装项目依赖

```

### 开发环境
```
npm run dev

访问 http://localhost:8088（自动编译）
```
### 测试环境
```
npm run test //环境变量依然为devolopment，但是编译和生产是一模一样的
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
```
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
```
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
    export const getOrderList = (params) => getInfo(url,params,method);
    //参数解释:
    //params:组件中调用该方法传的参数
    //url:接口路径
    //method:请求方法
```
#### 3.axios.js
```
import axios from 'axios';
import router from '../router/router'

//设置全局axios默认值
axios.defaults.timeout = 15000; //15s的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 创建axios实例
const fetch = axios.create();

// 添加拦截器
axios.interceptors.request.use = fetch.interceptors.request.use;
axios.interceptors.response.use = fetch.interceptors.response.use;

// request 拦截器
fetch.interceptors.request.use(
    config => {
        //每次发送请求之前检测都本地存有token（也可以存在vuex中，vuex去从localStorage/ssesionStorage中去取）,那么都要放在请求头发送给服务器
        let accessToken = window.localStorage.getItem('accessToken')
        if (accessToken) {
            config.headers.Authorization = `token ${accessToken}`;  //设置header Authorization 的值为 token
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// response 拦截器
fetch.interceptors.response.use(
    response => {
        return response;
    },
    error => { //默认除了2XX之外的都是错误的，就会走这里
        if (error.response) {
            switch (error.response.status) {
                case 401: 
                    router.replace({ //跳转到登录页面
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    });
                case 403:
                   router.replace({ //跳转到403页面
                      path: '403',
                  });
            }
        }
        return Promise.reject(error.response);
    }
);

const getInfo = (url='',data={},type='get') =>{
  if(type === 'get'){	
		return fetch.get(url,data).then(function (resp) {
			if (resp.data.data && resp.data.data.accessToken) {	//更新accessToken
				window.localStorage.setItem('accessToken', resp.data.data.accessToken);
			}
			return resp.data ;
		});  
  }
   
	if (type === 'post') { 
			return fetch.post(url,data).then(function(resp) {
					if (resp.data.data && resp.data.data.accessToken) { //更新accessToken
							window.localStorage.setItem('accessToken', resp.data.data.accessToken);
					}
					return resp.data;
			})
	}
};

export {  getInfo }
```
## UI
#### [UI库-vux](https://vux.li/#/)
```
 src/config/rem.js,以iphone6尺寸标准,1rem=37.5px
```
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
    Vue.$vux.toast.text(e.message,'middle')
    if(e.code == 401) { //重新登入
       window.location.href="/#/login";
    }
}
```
###### 图片压缩
```
export const compressImg = (base64) => {
    if(base64.length <50000) {   //小于50K的借据不压缩
        return base64;
    }
    var img = new Image();
    img.src = base64;
    let width = img.naturalWidth;
    let height = img.naturalHeight;
    //用于压缩图片的canvas
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext('2d');
    var expectWidth = '';
    var expectHeight = '';
    if (width > height && width > 480) {
        expectWidth = 480;
        expectHeight = expectWidth * height / width ;
    } else if (height > width && height > 600) {
        expectHeight = 600;
        expectWidth = expectHeight * width / height;
    }
    canvas.width = expectWidth;
    canvas.height = expectHeight ;
    //铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, expectWidth , expectHeight);
    //进行最小压缩
    let dataURL = canvas.toDataURL('image/jpeg', 1);
     // console.log('压缩后：' + dataURL.length);
    // console.log(dataURL)
    return dataURL;   //输出压缩后的base64码
}
```
