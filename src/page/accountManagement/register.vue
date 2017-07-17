<template>
    <div class="registerContainer">
      <!--   我是注册页面 -->
      <head-top headTitle="注册"></head-top>
      <img  class="logoPic" src="../../images/login_bg_top.png">
      <group>
        <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" type="tel" :max="11"  v-model="mobile" class="tel" >
          <span slot="label"  class="iconfont icon-icon_sjhm"></span>
          <span slot="label">手机号码</span>
        </x-input>

        <!--<x-input title="设置密码" type="password" placeholder="请设置8-12位数字和字母组合" v-model="password" @on-blur="blurTestPassword"  v-if="isTypeShow" >
          <span slot="label" class="iconfont icon-icon_dlmm"></span>
          <span slot="label">设置密码</span>
          <span slot="right" :class=" [isEay ? 'iconfont icon-icon_mmayanj' : 'iconfont icon-icon_mmayanj eay']" @click="passwordEays"  v-model="isEay"></span>
        </x-input>-->
        <div class="user">
          <span class="iconfont icon-icon_dlmm"></span>
          <span>设置密码</span>
          <input  placeholder="请输入登录密码"  type="password"  v-model="password" v-if="isTypeShow"  @blur="blurTestPassword"  @focus="focusTestMobile">
          <input  placeholder="请输入登录密码"  type="text"  v-model="password" v-else  @blur="blurTestPassword"  @focus="focusTestMobile">
          <span :class=" [isEay ? 'iconfont icon-icon_mmayanj eay' : 'iconfont icon-icon_mmayanj']" @click="passwordEays"  v-model="isEay"></span>
        </div>

        <!--<x-input title="图片验证码" class="weui-cell_vcode" v-model="imgCode" placeholder="请输入图片验证码">
          <img slot="right" class="imgCode" :src="vercodeURL"  @click="refreshImgCode" v-if="isShowImgCode"/>
          <span slot="label" class="iconfont icon-icon_tpyz"></span>
          <span slot="label">图片验证码</span>
        </x-input>-->

        <!--倒计时-->
        <count-down  :phoneNo="mobile" @sendSmsCode = "getSmsCode"  imgCode="false" :defaultVal="smsCode" isImgShow="true"></count-down>
      </group>
      <div class="agree">
        <span :class="[agreeCheck ? 'icon-btn_gx_1' : 'icon-btn_gx_', 'iconfont']" @click="isAgree"></span>
        <span class="gray">同意并签署</span>
        <span class="server" @click="toRegisterProtocol" >《维粒贷注册服务协议》</span>
      </div>
      <button class="subBtn" :disabled="mobile===''|| password===''|| smsCode===''||!passwordReg.test(password) || !mobileReg.test(mobile)|| !agreeCheck" @click="registers">立即注册</button>
      <!--<p class="toLogin">
        <router-link :to="'/login'">
          已经注册，去登录
        </router-link>
      </p>-->
    </div>
</template>
<script>
  import md5 from 'js-md5';  //md5加密
  import headTop from "../../components/header/head";
  import countDown from "../../components/countDown";
  import { XInput, Group, XButton} from 'vux';
  import { register,getImageCode } from '../../service/getData';
  import {customToast ,getImgCodeCommon } from '../../config/mUtils';
  export default {
    data(){
      return {
        mobile: '',//手机号码
        password: '',//手机密码
        mobileReg: /^0?1[3|4|5|7|8][0-9]\d{8}$/,//验证手机号
        smsCode:'',//验证码
        // imgCode:'', //手动输入的图片验证码
        // vercodeURL: '', //图片验证码
        showNotification: false,
        data:{},
        agreeCheck:false,
        isShowImgCode:false,
        passwordReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
        isEay:false,
        isTypeShow:true
      }
    },
    created(){
      this.openId = window.localStorage.getItem("openId");
      const registerDraft =JSON.parse(window.localStorage.getItem("registerDraft"));
      if(registerDraft) {
        this.mobile = registerDraft.mobile;

        this.password = registerDraft.password;
        this.smsCode = registerDraft.smsCode;
      }

    },
    components: {
      headTop,XInput, Group, XButton,countDown
    },
    computed: {

    },
    methods: {
      focusTestMobile(){
        if(this.mobile===''){
          this.$vux.toast.show({
            text: '请先输入手机号',
            type: 'text',
            width:'80%',
            position:'top:3rem',
            time:2000
          })
         return ;
        }
      },
      blurTestPassword(){
        if(!this.passwordReg.test(this.password)){
          this.$vux.toast.show({
            text: '密码必须是8-16位字母和数字',
            type: 'text',
            width:'80%',
            position:'top;2rem',
            time:2000
          })
        return ;
       }
      },
      getSmsCode(msg){
        this.smsCode = msg
      },
      toRegisterProtocol() {
        const draft = {
          mobile: this.mobile,
          password: this.password,
          smsCode:this.smsCode
        };
        localStorage.setItem('registerDraft',JSON.stringify(draft));
        this.$router.push('/registerServerAgreement');
      },
      isAgree() {
        this.agreeCheck = !this.agreeCheck;
      },
       registers() { //注册
        const password = md5(this.password).toUpperCase();
        register({ //注册接口
          loginName:this.mobile,
          password:password,
          smsCode:this.smsCode,
          openId:this.openId
        }).then((data) =>{
          if(data.error) {
            customToast(data);
            return ;
          }
          window.localStorage.removeItem("registerDraft");  //注册成功后清除草稿
          this.$router.push('/fillLimit')
        })
      },

      // refreshImgCode() {  //点击刷新验证码
      //   getImgCodeCommon(this.mobile).then(e =>{
      //     this.vercodeURL = e
      //   })
      // },
      // blurGetImgCode() {  //手机号input框失焦获取验证码
      //   if(!this.mobileReg.test(this.mobile)){
      //     this.$vux.toast.show({
      //       text: '请输入正确的手机号码',
      //       type: 'text',
      //       width:'80%',
      //       position:'top',
      //       time:1000
      //     })
      //     return ;
      //   }
      //   this.isShowImgCode = true;
      //   getImgCodeCommon(this.mobile).then(e =>{
      //     this.vercodeURL = e
      //   })

      // },
      blurTestPassword(){
        if(!this.passwordReg.test(this.password)){
          this.$vux.toast.show({
            text: '密码必须是8-16位字母和数字',
            type: 'text',
            width:'80%',
            position:'top:2rem',
            time:1000
          })
          return ;
        }
      },
      passwordEays(){
          this.isEay =! this.isEay;
          this.isTypeShow =! this.isTypeShow
        },
    }
}

</script>

<style lang="scss">
  @import '../../style/common';
  body{
    background: #fff;
  }
  .registerContainer{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-content:center;
    justify-content: center;
    background: #fff;
    font-family: 'PingFangSC-Regular';
    .logoPic{
      width:100%;
      height:2.9rem;

      display:block;
      margin-bottom:0.82rem;
    }
    .imgCode {
      width: 2rem;
      height: 1.15rem;
      position: absolute;
      right: 0;
      top: 0.05rem;
    }
    .user{
      display: flex;
      align-items: center;
      height:50px;
      width:100%;
      margin-left:0.4rem;
      border-top:1px solid #f3f3f3;
      span{
        margin-right:10px;
        color:#666;
        font-size:14px;
      }
      .icon-icon_mmayanj{
        position:absolute;
        right:0.18rem;
        top:1.75rem;
        font-size:10px;
      }
      .eay{
        color:#81E8E3;
      }
      .icon-icon_dlmm{
        color:#81E8E3;
        font-size:16px;
        margin-left:2px;
      }
      input{
        width:3.5rem;
        margin-left:0.7rem;
      }
    }

    .weui-cell__hd{
      display:flex;
      width:120px;
      justify-content:flex-start;
      align-items: center;
      font-size:14px;
      .iconfont{
        margin-right:10px;
        color:#6CD9D4;
      }
      .icon-icon_tpyz{
        font-size:12px;
      }
      .icon-icon_sjhm{
        font-size:19px;
      }

    }
    /*是否同意*/
    .agree{
      width:92%;
      padding-left:4%;
      margin-top:0.45rem;
      font-size:12px;
      text-align:left;
      .icon-btn_gx_1{
        color:#00BBCC;
      }
      .gray{
        color:#999;
      }
      .iconfont{
        font-size:15px;
        margin-right:5px;
      }
      .server{
        color:#00BBCC;
      }
    }
    .vux-x-input{
      height:1.2rem;
    }
    input{
      font-size: 14px;
    }

    .toLogin{
      width: 100%;
      padding:0;
      text-align: center;

      font-family: "PingFangSC-Regular";
      margin-top:0.45rem;
      a{
        font-size:12px;
        color:#00BBCC;
      }
    }

  }

</style>
