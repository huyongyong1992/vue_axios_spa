<template>
  <div class="contactCustomer">
      <header-top headTitle="借款申请完成"></header-top>
      <div class="main-content">
        <h2>
          <img src="../../images/icon_tijiao01@3x.png" > <span>借款申请已提交</span>
        </h2>
        <p ></p>
        <h2 style="color:#00BBCC">
          <img src="../../images/icon_dianhua01@3x.png"><span>稍后将和您电话确认借款信息</span>
        </h2>
        <p>请注意接听维立贷审核电话</p>
        <h2>
          <img src="../../images/icon_dengdai02@3x.png" ><span> 确认通过后，借款将转入银行卡</span>
        </h2>
      </div>
      <w-button @click="backIndex">返回首页</w-button>
  </div>
</template>

<script>
  import headerTop from '../../components/header/head';
  import {Flow,FlowState,FlowLine} from 'vux';
  import wButton from "../../components/wButton"
  export default {
    data(){
      return{


      }
    },

    mounted(){

    },
    components:{
      headerTop,Flow,FlowState,FlowLine,wButton
    },

    computed:{
    },

    methods:{
      backIndex(){

      }

    },

  }
</script>

<style lang="scss">
  .contactCustomer{
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:flex-start ;
   .main-content{
    text-align:left;
    font-size:0.4rem;
    margin-top:0.5rem;
    margin-left: 0.5rem;
    width:4rem;
    img{
      width:0.6rem;
      height:0.6rem;


    }
    h2{
      color:#666;
      height:14px;
      width:8rem;
      margin:0rem 0 0.5rem 0;
      font-size: 14px;
      line-height: 14px;
      font-weight:600;
      span{
        padding-left:0.3rem;
      }

    }
    p{
      width:5rem;
      height:80px;
      line-height: 40px;
      color:#7f7f7f;
      font-size:12px;
      border-left: 3px solid #ddd;
      margin-left: 0.2rem;
      padding-left:0.7rem;
      border-left: 3px solid #76E7E7;
    }
  }
 }



</style>
