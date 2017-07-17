<template>
	<div>
    <header-top headTitle="我的银行卡"></header-top>
    <p v-if="bankList.length === 0">暂无银行卡</p>
    <section v-for="item in bankList" :style="`background:url(${item.bgUrl});`">
      <div class="top">
        <img :src="item.imgUrl" >
        <div class="topRight">
          <div class="bank">{{item.name}}</div>
          <div class="variety">{{item.variety}}</div>
        </div>
      </div>
      <div class="bottom"> {{item.number}} </div>
    </section>
    <router-link :to="'/addBankCard?from=myBankList'">更换还款银行卡</router-link>
  </div>
</template>

<script>
  import headerTop from '../../components/header/head';

  export default {
    data(){
      return{
        bankList:[{
          "name":'建设银行',
          'variety':'储蓄卡',
          'number':'**********3309',
          'imgUrl':'http://p3.wmpic.me/article/2017/06/19/1497856535_MbkTClVK.jpg',
          'bgUrl' :'http://p3.wmpic.me/article/2017/06/19/1497856535_SFHCQwxs.jpg'
        }]
      }
    },
    components:{
      headerTop
    },

  	created(){

    },

    

    computed:{
        
    },

    methods:{
      changCard() {
        this.$router.push('addBankCard?from=myBankList');
      }
    },
  }
</script>

<style lang="scss" scoped>
  section{
    margin:0.4rem 4%;
    border-radius:4px;
    height:94px;
    padding:0.4rem;
    .top{
      display: flex;
      img{
        width:30px;
        height:30px;
        margin-right:0.4rem;
      }
      .topRight{
        div{
          color:#fff;
          font-size:12px;
        }
        .bank{
          font-size:14px;
        }
        
      }
    }
    .bottom{
      text-align: right;
      font-size:20px;
      color:#fff;
    }
  }
  a{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #00BBCC;
    line-height: 14px;
    margin-left:0.4rem;
  }
</style>
