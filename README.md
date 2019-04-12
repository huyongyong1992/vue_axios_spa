# vue-cli

> 官方脚手架

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for test env with minification
npm run test 

# build for uat env with minification
npm run uat 

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

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
        if(process.env.NODE_ENV === 'test') {         //测试环境启用
            let VConsole = require('vconsole');
            this.vConsole = new VConsole();
        }
    }
}
```
