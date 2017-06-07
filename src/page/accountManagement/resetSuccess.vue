<template>
    <div class="resetSuccessContainer">
      <!--   恭喜您
        <span>这是重置密码成功页面!!!</span> -->
      <!--<head-top headTitle="重置成功"></head-top>-->
      <img class="success_pic" src="../../images/resetPasswordSuccess.png"> 
      <article >恭喜你成功重置密码！</article> 
       <router-link :to="'/login'"><button class="resetSuccess_btn">立即登录</button></router-link>
    </div>
</template>

<script>
    import headTop from "../../components/header/head";

    export default {
      data(){
        return {
            
        }
      },
      created(){
          
      },
      components: {
        headTop 
      },
      computed: {
          
      },
      methods: {
          
      }
    }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .resetSuccessContainer{
       
    article{
      font-size:0.5rem;
      text-align:center;
      
    }
    .resetSuccess_btn{
      display: block;
      height: 1.2rem;
      font-size: 16px;
      border-radius: 0.6rem;
      width: 56%;
      background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
      color: #fff;
      margin-top: 1.49rem;
      margin-left:22%; 
    }
    .success_pic{
      width:80%;
      margin-left:10%;
      margin-top:2.56rem;
      margin-bottom:1.28rem;
    }
  }
</style>
