<template>
<div>
 <head-top headTitle="维粒贷" linkUs="true"></head-top>
    <div class="borrowMoney">
      <div></div>
      <span class="personalPage" @click="personalPage"><img src="../../images/icon_geren@3x.png"></span>
      <div class="borrowMoney_content">
        <span class="one" ><img src="../../images/icon_td_1.png"><br>急速体现</span>
        <span class="two"><img src="../../images/icon_td_3.png"><br>超低月息</span>
        <span class="tree"><img src="../../images/icon_td_2.png"><br>超高额度</span>
        <p class="content-text">您的预估额度为</p>
        <p class="content-money">{{limitMoney}}</p>
      </div>
      <div>
      <button class="borrowMoney_btn" @click="activeLimit">三步激活额度</button>
      </div>
      <div ></div>
    </div>
 </div>
</template>
<script>
import headTop from "../../components/header/head";
import { createOrder,getOrder,searchLimit,getToken,getAccountId } from '../../service/getData';
import { getQuery,customToast } from '../../config/mUtils';
export default {
  data(){
    return{
      limitMoney:'',
      orderfrom:'BAIDU',
      openId:'',
      accountId:''
    }
  },
  created(){
    this.openId = window.localStorage.getItem('openId');
     searchLimit({
      openId:this.openId
    }).then((data)=>{
      if(data.error){
        customToast(data);
        return ;
      }
      this.limitMoney = data.data.wldMoney *1.5;
    })
  },
  components:{
      headTop
  },
  
  methods:{
    activeLimit() {
      this.accountId = window.localStorage.getItem("accountId") || '';
      if(!this.accountId){
        getAccountId().then((data) =>{
          this.accountId = data.data.accountId;
          window.localStorage.setItem("accountId",data.data.accountId);
          this.commonFunction();
        })
        return ;
      }
      this.commonFunction();
    },
    commonFunction() {
      getOrder({
        accountId:this.accountId
      }).then((data) => {
        var that = this;
        if(data.error){
          customToast(data);
          return ;
        }
        if(!(data.data && data.data.orderId)) {  //订单不存在，去创建订单
          
          createOrder({
            orderFrom :'wld',
            openId:that.openId,
            accountId:that.accountId
          }).then((data) =>{  
            if(data.error){
              customToast(data);
              return ;
            }
            that.$router.push('/getLimit/personalAuthentication');
          })
        }else if(data.data.applyStep=== 10){
          window.localStorage.setItem("orderId",data.data.orderId)
          that.$router.push('/getLimit/personalAuthentication');
        }else if(data.data.applyStep=== 240){
          window.localStorage.setItem("orderId",data.data.orderId)
          that.$router.push('/getLimit/savingCard');
        }else if(data.data.applyStep=== 500){
          window.localStorage.setItem("orderId",data.data.orderId)
          that.$router.push('/calculateLimit');
        }else if(data.data.applyStep=== 600){
          window.localStorage.setItem("orderId",data.data.orderId)
          that.$router.push('/calculateLimit');
        }else {
          window.localStorage.setItem("orderId",data.data.orderId)
          that.$router.push('/getLimit/personalAuthentication');
        }
      })
    },
    personalPage() {
      this.$router.push('/myInfo')
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
  .personalPage img{
    position:absolute;
    top:0.4rem;
    left:0.5rem;
    width:1rem;
    height:auto;
  }
  .personalPage:hover{
    border: 1px solid #00CCC2;
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
}


</style>
