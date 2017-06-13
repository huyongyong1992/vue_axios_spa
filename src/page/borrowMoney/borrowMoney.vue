<template>
<div>
 <head-top headTitle="维粒贷" linkUs="true"></head-top>
    <div class="borrowMoney">
    <div></div>
    <div class="borrowMoney_content">
    <span class="one" ><img src="../../images/icon_td_1.png"><br>急速体现</span>
    <span class="two"><img src="../../images/icon_td_3.png"><br>超低月息</span>
    <span class="tree"><img src="../../images/icon_td_2.png"><br>超高额度</span>
      <p class="content-text">您的预估额度为</p>
      <p class="content-money">{{limitMoney}}</p>
    </div>
    <div>
    <button class="borrowMoney_btn" @click="activeLimit">两步激活额度</button>
    </div>
    <div ></div>
    </div>
  </div>
</template>
<script>
import headTop from "../../components/header/head";
import {createOrder,getOrder,searchLimit,getToken} from '../../service/getData';
import { getQuery,customToast } from '../../config/mUtils';
export default {
    data(){
      return{
        limitMoney:'',
        orderfrom:'BAIDU',
        openId:''
      }
    },
  created(){
      this.openId = window.localStorage.getItem('openId');
      this.wldMoney()  
    },
    components:{
       headTop 
    },
    computed:{
        
       
    },
    methods:{
      activeLimit() {
        const accountId = window.localStorage.getItem("accountId") || '';
        const openId = window.localStorage.getItem("openId");
         //判断是否需要登录
         getToken({
           openId:openId
        }).then((data)=>{
          if(!data.data.accessToken==""||!data.data.accessToken==null){
            this.$router.push('borrowMoney')  
          }
          else {
            this.$router.push('login') 
            return ;
          }
      })

        if(!accountId) {
          this.$router.push('/login');
          return ;
        }
        getOrder({
          accountId:accountId
        }).then((data) => {
          var that = this;
          if(data.error.error){
            customToast(data);
            return ;
          }
          if(!(data.data && data.data.order && data.data.order.orderId)) {
            createOrder({
              openId:that.openId,
              accountId:accountId
            }).then((data) =>{
              if(data.error.error){
                customToast(data);
                return ;
              }
              that.$router.push('/getLimit/personalAuthentication');
            })
          }else if(data.data.order.applyStep=== 10){
            that.$router.push('/getLimit/personalAuthentication');
          }else if(data.data.order.applyStep=== 240){
            that.$router.push('/getLimit/savingCard');
          }else if(data.data.order.applyStep=== 500){
            that.$router.push('/calculateLimit');  
          }else if(data.data.order.applyStep=== 600){
            that.$router.push('/calculateLimit');  
          }
          else if( data.data.closeOrder= true){
             that.$router.push('/getLimit/personalAuthentication');
          }
        })
        
      },
      wldMoney(){
        searchLimit({
          openId:this.openId
        }).then((data)=>{
          if(data.error.error){
            customToast(data);
            return ;
          }
          this.limitMoney = data.data.wldMoney*1.5;
        })
      }
    }
}
</script>
<style lang="scss">
body{
  background-color:#fff;
}
.borrowMoney{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between; 
  position:relative;
  width:100%;
  height:15rem;
}
.YuGu_pic{
  width: 100%;
  height:auto;
  
}
.borrowMoney_content{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around; 
  position:relative;
  width:7rem;
  height:7rem;
  background-image: linear-gradient(#00E6D3 0%, #00C5CC 99%);
  border-radius:7rem;
  text-align: center;
  border:40px solid #f5f5f5;
  
}
.content-text{
  opacity: 0.8;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 14px;
  text-align: center;
}
.content-money{
  font-family: PingFangSC-Medium;
  font-size: 42px;
  color: #FFFFFF;
  line-height: 42px;
  text-align: center; 
  margin-top:-2.5rem;
  
}
.borrowMoney_btn{
  height: 44px;
  text-align: center;
  font-size: 16px;
  border-radius: 22px;
  width:5.5rem;
  text-indent: 5px;
  text-decoration: none;
  background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
  color: #fff;
  margin-top:-1rem;
}
.one{
    position:absolute;
    left: 1.8rem;
    top: -2rem;
    font-size: 12px;
    color: #00CCC2;
    line-height: 12px;
    img{
        width:1.2rem;
        height:auto;
    }
}
.two{
    position:absolute;
    left: 5rem;
    top: 3rem;
    font-size: 12px;
    color: #00CCC2;
    line-height: 12px;
    img{
    width:1.3rem;
    height:auto;
}
}
.tree{
    position:absolute;
    left: -1.5rem;
    top: 3rem;
    font-size: 12px;
    color: #00CCC2;
    line-height: 12px;
    img{
    width:1.2rem;
    height:auto;
}
}
    
</style>