<template>
	<div class="myInfo">
    <header-top headTitle="维立贷" linkUs="true"></header-top>
    <div class="info">
      <img src="../../images/bg03@3x.png" style="width:100%;height:auto;">
      <p class="myInfoUser">
        <img :src="headUrl" alt="我的头像" class="headUrl"><br>
        <span>{{name}}</span>
      </p>
    </div>
    <div class="InfoList">
      <router-link :to="'../borrowSuccess'">
      <span class="iconfont icon-icon_qbao"></span>
      <span>我的额度</span>
      </router-link>
    </div>
    <div class="InfoList">
      <router-link :to="'myBill'">
      <span class="iconfont icon-icon_zdn"></span>
      <span>我的账单</span>
      </router-link>
    </div>
    <div class="InfoList">
      <router-link :to="'myBankList'">
      <span class="iconfont icon-icon_ka" style="width:0.2rem;height:10px;"></span>
      <span>我的银行卡</span>
      </router-link>
    </div>
    <div class="InfoList" style="margin-top:0.5rem;">
      <router-link :to="'connectUs'">
      <span class="iconfont icon-icon_kefu"></span>
      <span>联系客服</span>
      </router-link>
    </div>
    <div class="InfoList">
      <router-link :to="'myBankList'">
      <span class="iconfont icon-icon_whao"></span>
      <span>常见问题</span>
      </router-link>
    </div>
    <div class="InfoList">
      <router-link :to="'aboutUs'">
      <span class="iconfont icon-CombinedShape"></span>
      <span>关于我们</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import headerTop from '../../components/header/head';
  import  { Group,Cell } from 'vux';
  export default {
    name:'myInfo',
    data(){
      return{
        name:'用户名',
        headUrl:'http://p2.wmpic.me/article/2017/06/10/1497073948_uesOevoh_215x185.jpg'
      }
    },

  	created(){

    },

    components:{
      headerTop,Group,Cell
    },
    methods:{

    },

  }
</script>

<style lang="scss" >
body{
  background: #fff;
}
.myInfo{
  .info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    .myInfoUser{
      position:absolute;
      top:1.7rem;
      left:40%;
    .headUrl{
      width:60px;
      height:auto;
      border-radius: 48%;
    }
    span{
      display: inline-block;
      margin-left:0.2rem;
      margin-top:0.1rem;
      color:#fff;
      font-size:16px;
    }
    }
  }
  .InfoList{
    width:100%;
    height:1.5rem;
    line-height:1.5rem;
    border-bottom:1px solid #f3f3f3;
    margin-left:15px;
    margin-right:15px;
    text-align: left;
    span{
      font-size:14px;
      text-align: left;
    }
    .iconfont{
      color:#00ccc2;
      font-size:16px;
      margin-right:8px;
     }
    .icon-icon_ka{
      font-size:0.3rem;
    }
    a{
      text-decoration: none;
    }

  }

}
</style>
