<template>
    <div class="registerContainer">
      <!--   我是注册页面 -->
      <head-top headTitle="注册"></head-top>
      <img  class="logoPic" src="../../images/login_bg_top.png">
      <group>
        <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" type="tel" :max="11"  v-model="mobile" class="tel" @on-blur="blurGetImgCode">
          <span slot="label"  class="iconfont icon-icon_sjhm"></span>
          <span slot="label">手机号码</span>
        </x-input>
    
        <x-input title="设置密码" type="password" placeholder="请设置8-12位数字和字母组合" v-model="password"  >
          <span slot="label" class="iconfont icon-icon_dlmm"></span>
          <span slot="label">设置密码</span>
        </x-input>

        <x-input title="图片验证码" class="weui-cell_vcode" v-model="imgCode" placeholder="请输入图片验证码">
          <img slot="right" class="imgCode" :src="vercodeURL"  @click="refreshImgCode" v-if="isShowImgCode"/>
          <span slot="label" class="iconfont icon-icon_tpyz"></span>
          <span slot="label">图片验证码</span>
        </x-input>
        
        <!--倒计时-->
        <count-down :startNo="startNo" :phoneNo="mobile" @sendSmsCode = "getSmsCode" isImgShow="true" :imgCode="imgCode" ></count-down>  
      </group>
      <div class="agree">
        <span :class="[agreeCheck ? 'icon-btn_gx_1' : 'icon-btn_gx_', 'iconfont']" @click="isAgree"></span>
        <span class="gray">同意并签署</span>
        
        <router-link :to="'/registerServerAgreement'"> 
          <span class="server">《维粒贷注册服务协议》</span>
        </router-link>
      </div>
      <button class="subBtn" :disabled="mobile===''|| password===''|| imgCode===''|| smsCode===''|| !mobileReg.test(mobile) || !agreeCheck" @click="registers">立即注册</button>
      <p class="toLogin">
        <router-link :to="'/login'">
          已经注册，去登录
        </router-link>
      </p>
    </div>
</template>
<script>
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
        imgCode:'', //手动输入的图片验证码
        vercodeURL: '', //图片验证码
        showNotification: false,
        startNo:60,
        data:{},
        agreeCheck:false,
        isShowImgCode:false
      }
    },
    created(){
      
    },
    components: {
      headTop,XInput, Group, XButton,countDown
    },
    computed: {

    },
    methods: {
      getSmsCode(msg){
        this.smsCode = msg
      },
      isAgree() {
        this.agreeCheck = !this.agreeCheck;
      },
       registers() { //注册
         register({ //注册接口
          loginName:this.mobile,
          password:this.password,
          smsCode:this.smsCode,
          openId:'12321321'          
        }).then((data) =>{
          if(data.error.error) {
            customToast(data);
            return ;
          }
          
          this.$router.push('/borrowMoney')
        })
      },

      refreshImgCode() {  //点击刷新验证码
        getImgCodeCommon(this.mobile).then(e =>{
          this.vercodeURL = e
        })
      },
      blurGetImgCode() {  //手机号input框失焦获取验证码
        if(!this.mobileReg.test(this.mobile)){
          this.$vux.toast.show({
            text: '请输入正确的手机号码',
            type: 'text',
            width:'80%',
            position:'top',
            time:1000
          })
          return ;
        }
        this.isShowImgCode = true;
        getImgCodeCommon(this.mobile).then(e =>{
          this.vercodeURL = e
        })
        
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
