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

访问 http://localhost:8001（自动编译）
```
### 测试环境
```
npm run test //环境变量test，但是编译和生产是一模一样的
```
### 生产环境
```
npm run build   //生成的dist文件夹放在服务器即可正常访问
```


## 项目布局
```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── dist                                        // 上线项目文件
├── src                                         // 源码目录
│ ├── components                                // 组件
│ │ ├── common                                  // 公共组件
│ ├── config                                    // 基本配置
│ │ ├── env.js                                  // 环境切换配置(域名,路由模式)
│ │ ├── axios.js                                // axios底层封装
│ │ ├── util.js                                 // 常用的js方法
│ │ └── rem.js                                  // 移动端自适应,1rem = 37.5px(iphone6)
│ ├── images                                    // 公共图片
│ ├── page                                      // 页面
│ | └── redirect                                // 重定向页面
| |      └── redirect.vue                       // 具体页面
│ ├── plugins                                   // 引用的插件
│ ├── router
│ │ └── router.js                               // 路由配置
│ ├── service                                   // 前后端接口数据交互
│ │ └── getData.js                              // 对接口进行统一管理
│ ├── store                                     // vuex的状态管理
│ │ ├── action.js                               // 配置actions
│ │ ├── getters.js                              // 配置getters
│ │ ├── index.js                                // 引用vuex，创建store
│ │ ├── modules                                 // store模块
│ │ ├── mutation-types.js                       // 定义常量muations名
│ │ └── mutations.js                            // 配置mutations
│ └── style
│   └── common.scss                             // 公共样式文件
│ ├── App.vue                                   // 页面入口文件
│ ├── main.js                                   // 程序入口文件
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
    import { url } from '../config/env';      //引入接口baseUrl
    export const getOrderList = (params) => getInfo(url+'具体接口路径',params,method);
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
```
## 公共函数 util.js
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

### 移动端调试
```
// App.vue
export default {
    created() {
        if(process.env.NODE_ENV !== 'production') {         //生产环境 不启用,测试环境和本地环境启用
            let VConsole = require('vconsole');
            let vConsole = new VConsole();
        }
    }
}
```
