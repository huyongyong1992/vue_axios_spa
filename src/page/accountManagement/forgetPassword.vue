<template>
    <div class="forgetPasswordContainer">
       <head-top headTitle="找回密码"></head-top>
     <group>
      <x-input  name="mobile" placeholder="请填写注册手机号码" keyboard="number" is-type="china-mobile" v-model="mobile"  >
        <span slot="label"  class="iconfont icon-icon_sjhm"></span>
        <span slot="label">手机号码</span>
      </x-input>
      <div class="user">
        <span class="iconfont icon-icon_dlmm"></span>
        <span>设置密码</span>
        <input  placeholder="请输入登录密码"  type="password"  v-model="password" v-if="isTypeShow"  @blur="blurTestPassword"  @focus="focusTestMobile" >
        <input  placeholder="请输入登录密码"  type="text"  v-model="password" v-else  @blur="blurTestPassword"  @focus="focusTestMobile">
        <span :class=" [isEay ? 'iconfont icon-icon_mmayanj eay' : 'iconfont icon-icon_mmayanj']" @click="passwordEays"  v-model="isEay" ></span>
      </div>

      <!--<x-input title="图片验证码" class="weui-cell_vcode" v-model="imgCode" placeholder="请输入图形验证码">
        <span slot="label" class="iconfont icon-icon_tpyz"></span>
        <img slot="right" class="imgCode" :src="vercodeURL"  @click="refreshImgCode" v-if="isShowImgCode"/>
        <span slot="label">图片验证码</span>
      </x-input>-->

      <count-down :startNo="startNo" :phoneNo="mobile"  isImgShow="true" :imgCode="imgCode" imgCode="false" @sendSmsCode="getSmsCode"></count-down>
    </group>
     <button class="forgetPassword_btn" :disabled="mobile==='' || password==='' || smsCode==='' || !mobileReg.test(mobile)|| !passwordReg.test(password)"  @click="onSubmit">下一步</button>

    </div>
</template>

<script>
    import { XInput, Group, XButton } from 'vux';
    import md5 from 'js-md5';  //md5加密
    import countDown from "../../components/countDown";
    import headTop from "../../components/header/head";
    import { getImageCode, findPassword } from '../../service/getData';
    import { customToast, getImgCodeCommon } from '../../config/mUtils';
    export default {
      data(){
        return {
          mobile:'',
          imgCode: '',
          password:'',
          password_again:'',
          smsCode:'',
          startNo:60,
          vercodeURL:'',
          mobileReg: /^0?1[3|4|5|7|8][0-9]\d{8}$/ ,//验证手机号
          isShowImgCode:false,
          isEay:false,
          isTypeShow:true,
          passwordReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/

        }
      },
      created(){

      },
      components: {
       XInput,XButton,Group,countDown,headTop
      },
      computed: {

      },
      methods: {
        getSmsCode(msg) { //接收从倒计时组件传回来的值
          this.smsCode = msg
        },
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
        // blurGetImgCode() {  //失去焦点后获取图片验证码
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
        //   getImgCodeCommon(this.mobile).then(data =>{
        //     this.vercodeURL = data
        //   })
        // },

        // refreshImgCode() {  //点击刷新验证码
        //   getImgCodeCommon(this.mobile).then(data =>{
        //     this.vercodeURL = data
        //   })
        // },

         onSubmit(){ //下一步
           const password = md5(this.password).toUpperCase(); //md5加密
           findPassword({
              password:password,
              mobile:this.mobile,
              smsCode:this. smsCode,
            }).then((data) =>{
              if(data.error) {
                customToast(data);
                return ;
              }
              this.$router.push('/resetSuccess')
            })
          },
          passwordEays(){
            this.isEay =! this.isEay;
            this.isTypeShow =! this.isTypeShow
          },
      }
    }

</script>

<style lang="scss">
  @import '../../style/mixin';


.forgetPasswordContainer{
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
  .imgCode {
    width: 2rem;
    height: 1.15rem;
    position: absolute;
    right: 0;
    top: 0.05rem;
  }
  .vux-x-input{
    height:1.2rem;
  }
  input{
    font-size: 14px;
  }
  .forgetPassword_btn {
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

  .forgetPassword_btn[disabled] {
    background: #CFCFCF;
    color: #FFF;
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
      font-size:10px;
      position:absolute;
      right:0.18rem;
      top:1.75rem;

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
      width:3rem;
      margin-left:0.7rem;
    }
  }

}

</style>
