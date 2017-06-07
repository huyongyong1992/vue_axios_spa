<template>
	<div class="waitingLink">
  <head-top headTitle="维粒贷" linkUs="true"></head-top>
  <div class="waitCustomer">
  <div class="header">
    <p>您的借款申请已受理</p>
    <p>您的专属客户经理将马上联系您</p>
  </div>
  <div class="main-content">
  <h2>
    <img src="../../images/dot1.png" />
    客户经理联系
  </h2>
  <p style="border-left: 2px solid #76E7E7;">客户经理联系您补充资料，确定借款金额</p>
  <h2 style="color:#00BBCC">
  <img src="../../images/dot1.png"/>
  门店审核
  </h2>
  <p>门店审核您的资料</p>
  <h2>
  <img src="../../images/dot0.png" />
  门店审核
  </h2>
  <p>您到门店进行借款签约，签约后放款
  </p>
  </div>
  <!--<router-link :to="'/customerManager/'">-->
  </div>
  <div class="footer">
  <button class="checkBtn" @click="searchManager">
    查看客户经理
  </button>
  <a :href="`tel:${saleMobile}`" class="linkBtn">马上联系他</a>
  </div>
  </div>
</template>

<script>
import headTop from "../../components/header/head";
import { checkManager } from '../../service/getData';
import { customToast } from '../../config/mUtils';
export default {

  data(){
    return{
      saleMobile:'',
      accountId:'',
      saleName:''
    }
  },

	created(){
    this.accountId = window.localStorage.getItem('accountId'); 
    checkManager({
      accountId:this.accountId
    }).then(data =>{
      if(data.error.error) {
        customToast(data);
        return ;
      }
      this.saleMobile = data.data.saleMobile;
      this.saleName = data.data.saleName
    })
  },


  components:{
    headTop      
  },

  computed:{
      
     
  },

  methods:{
    searchManager() {
      if(!this.saleName) {
        this.$vux.toast.show({
          text:'待分配客户经理'
        })
        return ;
      }
      this.$router.push('/customerManager');
    },
    
  },
}

</script>

<style lang="scss">
body{
  background-color: #fff;
}
.waitingLink{
  .waitCustomer{
    width:10rem;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center; 
   .header{
    width:10rem;
    font-size:0.5rem;
    margin-top:1rem;
    p{
      height:24px;
      line-height: 24px;
      color:#666;
      font-size:16px;
      text-align: center;
    }
   } 
   .main-content{
    text-align:left;
    margin-top:1rem;
    font-size:0.4rem;
    width:4rem;
    img{
      width:16px;
      height:16px;
    }
    h2{
      color:#666;
      height:14px;
      margin:20px 0px 20px 0px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      line-height: 14px;
    }
    p{
      width:5rem;
      height:50px;
      color:#7f7f7f;
      font-size:12px;
      border-left: 2px solid #ddd;
      padding-left:0.2rem;
      padding-top:10px;
      margin-left: 0.2rem;
      margin-top:-5px;
    }
  }

  }



  .footer{
    margin-top:0.62rem;
    display: flex;
    justify-content: center;
    
  }
  .checkBtn{
    display: block;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    background-color: #fff;
    border:1px solid #00bbcc;
    border-radius: 22px;
    width: 3.7rem;
    margin-right:10px;
  }
    .linkBtn{
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    border-radius: 22px;
    width:3.7rem;
    text-indent: 5px;
    text-decoration: none;
    background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
    color: #fff;
   }

}    

</style>
