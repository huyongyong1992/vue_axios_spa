<template>
    <div class="loginContainer">
        
      <head-top headTitle="登录"></head-top>
      <img class="logoPic" src="../../images/login_bg_top.png"/>
      <div class="user"> 
        <span class="iconfont icon-icon_sjhm"></span>
        <span>手机号码</span>
        <input type="number" placeholder="请输入手机号码" v-model="mobile" @blur="judgePhone"  />
      </div>
      <div class="user"> 
        <span class="iconfont icon-icon_dlmm"></span>
        <span>登录密码</span>
        <input  placeholder="请输入登录密码" v-model="password" type="password" />
      </div>
      <!--<group>
        <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" type="tel" v-model="mobile" class="borderTop">
          <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
        </x-input>
        <x-input title="账号密码" type="password" placeholder="请输入账号密码" v-model="password" >
          <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
        </x-input>
      </group>-->
      <button class="subBtn" :disabled="mobile===''|| password===''|| !mobileReg.test(mobile)" @click="logins">立即登录</button>
      <div class="footer">
        <router-link :to="'/register/'"> 
          <span>免费注册</span>
        </router-link><br />
        <router-link :to="'/forgetPassword/'"> 
          <span class="borderLeft">忘记密码</span>
        </router-link>
        <i class="iconfont icon-iconfontyiqiyibiao"></i>
      </div>

      <div class="wechatLogin">
        <span class="iconfont icon-icon_wechat"></span><span>微信登录</span>
      </div>
    </div>
</template>
<script>
     import headTop from "../../components/header/head";
     import { login,saveLimit } from '../../service/getData'; 
     import { customToast } from '../../config/mUtils';
     import { XInput, Group, XButton } from 'vux'
     export default {
        data(){
          return {
            mobile:'',
            password: '', 
            mobileReg: /^0?1[3|4|5|7|8][0-9]\d{8}$/,
          }
        },
        created(){
            
        },
        components: {
           headTop,XInput, Group, XButton
        },
        computed: {
           
        },
        methods: {
          judgePhone() {
            if(!this.mobileReg.test(this.mobile)){
              this.$vux.toast.text('请输入正确的手机号码', 'top')
            }
           
          },
          //登录
          logins() {
            const openId = window.localStorage.getItem('openId')
            login({
              username:this.mobile,
              password:this.password,
              openId:openId
            }).then((data) =>{
              if(data.error.error) {
                customToast(data)
                return ;
              }
              window.localStorage.setItem('accountId',data.data.accountId);
              this.$router.push('/borrowMoney')
              
            })
          }, 
        }
      }

</script>

<style lang="scss" >
  @import '../../style/common';
  body{
    background-color: #fff;
  }
  .loginContainer{
    
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-content:center;
    justify-content: center;
    .user{
      display: flex;
      align-items: center;
      height:50px;
      width:60%;
      margin-left:20%;
      border-bottom:1px solid #f3f3f3;
      span{
        margin-right:10px;
        color:#666;
        font-family: 'PingFangSC-Regular'
      }
      .icon-icon_sjhm{
        color:#81E8E3;
        font-size:19px;
      }
      .icon-icon_dlmm{
        color:#81E8E3;
        font-size:16px;
        margin-left:2px;
      }
      input{
        width:3rem;
      }
    }
    .logoPic{
      width:100%;
      height:4.25rem;
      text-align: center;
      display:block;
      margin-bottom:0.7rem;
    }
    .footer{
      width:100%;
      display: flex;
      justify-content: center;
      margin-top:0.48rem;
      span{
        display: block;
        font-size: 12px;
        height:12px;
        line-height:12px;
        color:#00BBCC;
        font-family:'PingFangSC-Regular'; 
        padding-right:10px;
        padding-left:10px;
      }
      .borderLeft {
        border-left: 1px solid #ccc;
      }
    }
    .weui-cells{
      width:60%;
      margin-left:20%;
      font-size:14px;
     
    }
    .borderTop{
      border-top:none;
    }
    /*微信登录*/ 
    .wechatLogin{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.1rem;
      span{
        font-size:14px;
        color:#999;
        font-family: 'PingFangSC-Regular';
      }
      .icon-icon_wechat{
        font-size:20px;
        color: #5AB847;
        margin-right: 0.28rem;
      }
    }
  }
</style>
