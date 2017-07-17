<template>
    <div class="loginContainer">
      <head-top headTitle="登录"></head-top>
      <img class="logoPic" src="../../images/bg02.png">
      <div class="login-tab" >
        <span :class="[isSuccess  ? 'success' : '']" @click="identifyingTabSelcted" >验证码登录</span>
        <span :class="[isSuccess1  ? 'success' : '']"  @click="passwordTabSelcted">密码登录</span>
      </div>

<!--密码登录-->
      <div class="passwordLogin" v-if="page===2">
        <div class="user">
          <span class="iconfont icon-icon_sjhm"></span>
          <span>手机号码</span>
          <input type="number" placeholder="请输入手机号码" v-model="mobile" @blur="judgePhone"  >
        </div>
        <div class="user">
          <span class="iconfont icon-icon_dlmm"></span>
          <span style="margin-right:0px;">登录密码</span>
          <input  placeholder="请输入登录密码"  type="password"  v-model="password" v-if="isTypeShow"  >
          <input  placeholder="请输入登录密码"  type="text"  v-model="password" v-else>
          <span :class=" [isEay ? 'iconfont icon-icon_mmayanj eay' : 'iconfont icon-icon_mmayanj']" @click="passwordEays"  v-model="isEay"></span>
        </div>
        <router-link :to="'/forgetPassword/'">
            <span class="borderLeft">忘记密码</span>
        </router-link>
        <button class="subBtn" :disabled="mobile===''|| password===''|| !mobileReg.test(mobile)" @click="logins">立即登录</button>
        <div class="footer">
          <router-link :to="'/register/'">
            <span>立即注册</span>
          </router-link><br >
          <i class="iconfont icon-iconfontyiqiyibiao"></i>
        </div>
    </div>

<!--tab切换验证码登录-->
    <div class="identifyingCodeLogin" v-else>
        <div class="user">
          <span class="iconfont icon-icon_sjhm"></span>
          <span>手机号码</span>
          <input type="number" placeholder="请输入手机号码" v-model="mobile" @blur="judgePhone"  >
        </div>
        <div class="user">
          <span slot="label" class="iconfont icon-icon_dxyz"></span>
          <span>验证码</span>
          <input  placeholder="请输入手机验证码" v-model="identifyingCode" style="margin-left:0.7rem;" >
          <button slot="right" @click='btnClick' :disabled='isDisabled' :class=" [btn ? 'grayBtn' : 'btn','btn']" :startNo="startNo">{{value}}</button>
        </div>

        <p class="bottom">如您未注册维立贷，登录时将自动注册，且代表您同意<router-link :to="'/registerServerAgreement'" class="registerServerAgree">《维立贷注册服务协议》</router-link></p>

        <button class="subBtn" :disabled="mobile===''||identifyingCode ===''|| !mobileReg.test(mobile)" @click="identifylogin">立即登录</button>
    </div>

  </div>
</template>
<script>
     import headTop from "../../components/header/head";
     import md5 from 'js-md5';  //md5加密
     import { login,saveLimit,getNoImgSmsCode,bindWechat,smsLogin } from '../../service/getData';
     import { customToast } from '../../config/mUtils';
     import { XInput, Group, XButton,ButtonTab,ButtonTabItem } from 'vux'
     export default {
        data(){
          return {
            mobile:'',
            password: '',
            identifyingCode:'',
            mobileReg: /^0?1[3|4|5|7|8][0-9]\d{8}$/,
            isSuccess:true,
            isSuccess1:false,
            page:1,
            isDisabled:false,
            value:'获取',
            smsCode:this.defaultVal,
            btn:false,
            time: this.startNo,
            startNo:60,
            isEay:false,
            isTypeShow:true

          }
        },
        created(){
           this.smsCode = this.defaultVal;
        },
        components: {
           headTop,XInput, Group, XButton,ButtonTab,ButtonTabItem
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
            const openId = window.localStorage.getItem('openId');
            const password = md5(this.password).toUpperCase();
            login({
              username:this.mobile,
              password:password,
            }).then((data) =>{
              if(data.error) {
                customToast(data)
                return ;
              }
              window.localStorage.setItem('accountId',data.data.accountId);
              window.localStorage.setItem('accessToken',data.data.accessToken);
              console.log(window.localStorage.getItem('accessToken'))
              //登录成功后绑定微信账号
              bindWechat({
                accountId:data.data.accountId,
                thirdAccount:openId,
                thirdType:'weixin',
                accessToken:data.data.accessToken
              })
              this.$router.push('/borrowMoney') ;
            })
          },
          identifylogin() { //验证码登录
            const openId = window.localStorage.getItem('openId');
            smsLogin({
              mobile:this.mobile,
              smsCode:this.identifyingCode,
            }).then((data) =>{
              if(data.error) {
                customToast(data)
                return ;
              }
              window.localStorage.setItem('accountId',data.data.accountId);
              window.localStorage.setItem('accessToken',data.data.accessToken);
              //登录成功后绑定微信账号
              bindWechat({
                accountId:data.data.accountId,
                thirdAccount:openId,
                thirdType:'weixin',
                accessToken:data.data.accessToken
              })
              this.$router.push('/borrowMoney') ;
            })
          },
          identifyingTabSelcted(){ //验证码登录
            this.isSuccess=true;
            this.isSuccess1=false;
            this.page=1;
          },
          passwordTabSelcted(){  //密码登录
            this.isSuccess1=true;
            this.isSuccess=false;
            this.page=2;
          },
          btnClick() {       //获取
            getNoImgSmsCode({
              mobile:this.mobile
            }).then(data =>{
              if(data.error){
                customToast(data);
                return ;
              }
              this.isDisabled = true;   //倒计时中不允许再次点击
              this.countDown();
            })
         },
          countDown() {
            const that = this;
            that.time = that.startNo;
            let timer = setInterval(function(){
              that.time -=1;

              that.value = that.time + 's'; //更改显示内容;
              that.btn = true;   //字的颜色变灰
              if(that.time == 0) {
                clearInterval(timer); //清除定时器
                that.time = that.startNo; //重设
                that.value = '重新发送';
                that.btn = false;
                that.isDisabled = false;
              }
            },1000)
          },
          passwordEays(){
            this.isEay =! this.isEay;
            this.isTypeShow =! this.isTypeShow
          }
      },
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
      width:70%;
      margin-left:15%;
      border-bottom:1px solid #f3f3f3;
      span{
        
        color:#666;
        font-family: 'PingFangSC-Regular'
      }
      .icon-icon_sjhm{
        color:#81E8E3;
        margin-right:10px;
        font-size:19px;
      }
      .icon-icon_dxyz{
        color:#81E8E3;
        font-size:16px;
        margin-right:10px;
        margin-left:2px;
      }
      .icon-icon_mmayanj{
        font-size:0.3rem;
        margin-right:10px;
        margin-left:2px;

      }
      .eay{
        color:#81E8E3;
      }
      .icon-icon_dlmm{
        color:#81E8E3;
        margin-right:10px;
        font-size:16px;
        margin-left:2px;
      }
      input{
        width:3rem;
        margin-left:0.4rem;
      }
    }
    .logoPic{
      width:100%;
      height:4.25rem;
      text-align: center;
      display:block;
      margin-bottom:0.7rem;
    }
    .borderLeft {
      float:right;
      display: block;
      font-size: 12px;
      height:12px;
      line-height:12px;
      color:#00BBCC;
      font-weight:600;
      margin:0.3rem 1.5rem 0 0;
      font-family:'PingFangSC-Regular';
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
        font-weight:600;
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
    .login-tab{
      display: flex;
      justify-content: space-around;
      border-bottom: #00CCC2 solid 1px;
      padding:0 15px 0px 15px;
      margin-bottom:40px;
      span{
        padding-bottom:10px;
        font-size: 14px;
        width:2.5rem;
        color: #CCCCCC;
        border-bottom:2px solid #fff;
        text-align: center;
      }
      .success{
        color:#00CCC2;
        border-bottom:2px solid #81E8E2;
      }
      //   .active{
      //   color:#00CCC2;
      //   border-bottom:2px solid #81E8E2;
      // }
    }
    .btn{
      color:#00BBCC;
      font-family: PingFangSC-Regular;
      background-color: #fff;
      border:none;
    }
    .grayBtn{
      color:#B3B3B3;
    }
    .bottom{
      width:6.8rem;
      height:auto;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
      line-height: 16px;
      margin-top: 0.5rem;
      margin-left:1.5rem;
      text-align: left;
      .registerServerAgree{
        color:#00BBCC;
        text-decoration: none;
      }
    }

  }
</style>
