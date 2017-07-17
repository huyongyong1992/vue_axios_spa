<template>
    <div class="mobileAuth">
      <p class="mobileAuthTitle"><span class="Gt">!</span>为了验证您的身份，需要验证您的手机实名信息，您将会收到运营商发送的通话详单通知哦！</p>
      <group>
        <x-input
          title="手机号码"
          name="mobile"
          placeholder="请输入手机号码"
          keyboard="number"
          is-type="china-mobile"
          type="tel"
          :max="11"
          v-model="mobile"
          class="tel"

        >
          <span slot="label">手机号码</span>
        </x-input>
        <x-input title="服务密码"  placeholder="请输入手机运营商服务密码" v-model="servicePassword"  >
          <span slot="label">服务密码</span>
        </x-input>
      </group>
      <p class="forgetPassword" >
        <a @click="showForgetPlugin">忘记密码</a>
      </p>
      <w-button @click="fogetSeviceBtn"  :disabled="mobile===''|| servicePassword==='' || !mobileReg.test(mobile)">下一步</w-button>
      <div v-transfer-dom class="diaLog">
        <x-dialog v-model="showHide" class="mobileAuth-dialog">
          <div class="mobileAuth-dialog-content" style="height:80px; width:100%;">
            <h2 class="mobileAuth-dialog-title" style="font-size: 14px;color: #999999;line-height: 50px; height:50px;">请输入运营商发送的短信验证码</h2>
            <input  placeholder="请输入手机验证码"  type="text" v-model="carrieroperator">
            <button slot="right" @click="btnClick" :disabled="isDisabled" :class=" [btn ? 'grayBtn' : 'btn']" style="background:#fff;" >{{value}}</button>
          </div>
          <div @click="showHide=false" class="close-dialog">
            <button style="height：50px;line-height:50px; color:#00bbcc; background:#fff; width:100%; " :disabled="carrieroperator==''" @click="sub">提交</button>
          </div>
        </x-dialog>
      </div>
    </div>
</template>
<script>
 import { XInput, Group, XButton,Alert,XDialog,TransferDomDirective as TransferDom,Confirm} from 'vux';
 import { mobileInit,mobileLogin,mobileCheckSms,mobileSendSms,mobileId,getOrder } from '../../../service/getData';
 import {customToast ,getImgCodeCommon } from '../../../config/mUtils';
 import headTop from "../../../components/header/head";
 import wButton from "../../../components/wButton";
    export default {
      data(){
        return {
          mobile:'',
          servicePassword:'',
          mobileReg: /^0?1[3|4|5|7|8][0-9]\d{8}$/,//验证手机号
          show:false,
          startNo:60,
          value:'获取',
          isDisabled:false,
          smsCode:this.defaultVal,
          btn:false,
          time: 60,
          showHide:false,
          carrieroperator:'',
          types:'',
          // 手机初始化参数
          token:'',
          identityCard:'',
          website:'',
          name:'',
          nextStep:'',
          orderId:''
        }
      },
      created(){
        this.$store.state.steps = 1;
        this.$store.state.authTitle = '手机认证'
        this.smsCode = this.defaultVal;
      },
      directives: {
        TransferDom
      },
      components: {
        headTop, XInput, Group, XButton,wButton,Alert,XDialog,Confirm
      },
      computed: {

      },
      methods: {

        fogetSeviceBtn(){
           //先获取用户信息，然后手机初始化
          const accountId = window.localStorage.getItem('accountId');
            getOrder({
              accountId:accountId
            }).then((data) =>{
              this.orderId = data.data.orderId;
              this.name = data.data.customerName;
              this.identityCard =data.data.idcard;
              mobileInit({  //手机初始化
                name:this.name,
                mobile:this.mobile,
                identityCard:this.identityCard
              }).then((data) => {
                if(data.error) {
                  customToast(data);
                  return ;
                }
                this.token = data.data.Token;
                this.website = data.data.Website;
                this.nextStep = data.data.nextProCode;
                // if(data.data.StatusDescription.indexOf('联通') > -1) {
                //   this.types = 2;
                // }else if(data.data.StatusDescription.indexOf('移动') > -1) {
                //   this.types = 1;
                // }else{
                //   this.types =3;
                // }
                //根据初始化响应参数决定继续执行那个步骤
                if(this.nextStep === 'Login') {
                  this.$vux.loading.show({
                    text:'登录中...'
                  });
                  mobileLogin({
                    identityCard:this.identityCard,
                    name:this.name,
                    mobile:this.mobile,
                    password:this.servicePassword,
                    token:this.token,
                    website:this.website,
                    smscode: "",
                    vercode: "",
                  }).then((data) => {
                    if(data.error) {
                      this.$vux.loading.hide();
                      customToast(data);
                      return ;
                    }
                    this.$vux.loading.hide();
                    const mobileIds = data.data.Result ? JSON.parse(data.data.Result).Id : '';  //如果可以取到mobileId
                    if(data.data && data.data.nextProCode === 'Query') {  //如果nextProCode为Query，则登录成功，去银行卡认证
                      mobileId({
                        mobile:this.mobile,
                        mobileId:mobileIds,
                        orderId:this.orderId
                      })
                      this.$router.push('/getLimit/savingCard')
                      return ;
                    }else {                                       //没取到mobileId,显示输入验证码dialog
                      this.showHide= true;
                    }

                  })
                }

              })

            })


        },
        showForgetPlugin () { // 忘记密码
          if(this.types===1){
            this.$vux.alert.show({
              title: '移动用户重置密码',
              content: '中国移动用户可编辑短信 CZMM 发送至 10086  即可重置运营商服务密码。'
            })
          }else if(this.types===2){
            this.$vux.alert.show({
              title: '联通用户重置密码',
              content: '中国联通用户可编辑短信 CZMM 发送至 10086  即可重置运营商服务密码。'
            })
          }else{
            this.$vux.alert.show({
              title: '电信用户重置密码',
              content: '中国电信用户可编辑短信 MMCZ 发送至 10001  即可重置运营商服务密码。'
            })
          }

        },
        btnClick() {
          mobileSendSms({
            identityCard:this.identityCard,
            mobile:this.mobile,
            password:this.servicePassword,
            name:this.name,
            token:this.token,
            website:this.website
          }).then((data) =>{
            if(data.error){
              customToast(data);
              return ;
            }
            this.countDown();
          })
        },
        countDown() {   //倒计时
          const that = this;
          this.isDisabled = true;
          let timer = setInterval(function(){
            that.time -=1;
            console.log( that.time);
            that.value = that.time + 's后重发'; //更改显示内容;
            that.btn = true;   //字的颜色变灰
            if(that.time == 0) {
              clearInterval(timer); //清除定时器
              that.time = 60; //重设
              that.value = '重新发送';
              that.btn = false;
              that.isDisabled = false;
            }
          },1000)
        },
        sub(){    //提交
          mobileCheckSms({
            token:this.token,
            website:this.website,
            mobile:this.mobile,
            smscode:this.carrieroperator,
            vercode:'',

          }).then((data) => {
            if(data.error) {
              customToast(data);
              return ;
            }
            const mobileIds = data.data.Result ? JSON.parse(data.data.Result).Id : '';  //如果可以取到mobileId
            if(data.data && data.data.nextProCode === 'Query') {  //如果nextProCode为Query，则登录成功，去银行卡认证
              mobileId({
                mobile:this.mobile,
                mobileId:mobileIds,
                orderId:this.orderId
              }).then((data) =>{
                if(data.data.applyStep ===240) {
                  this.$router.push('/getLimit/savingCard')
                }
              })
            }

          })
        }
      }
    }

</script>

<style lang="scss" >
 body{
    background: #f3f3f3;
    .mobileAuth{
      width:100%;
      height:100%;
      display:flex;
      flex-direction:column;
      align-content:center;
      justify-content: center;
      font-family: 'PingFangSC-Regular';
      .mobileAuthTitle{
        width:9rem;
        font-size:12px;
        margin: 0.5rem 0.5rem 0.2rem 0.5rem;
        color:#bbb;

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
      .vux-x-input{
        height:1.2rem;
      }
      input{
        font-size: 14px;
      }
      .forgetPassword{

          padding:0 4%;
          text-align: right;
          font-family: "PingFangSC-Regular";
          margin-top:0.45rem;
          // margin-left:4rem;
          a{
            font-size:12px;
            color:#00BBCC;
          }
      }
      .Gt{
        width:0.5rem;
        display:inline-block;
        font-weight:600;
        color:#00bbcc;
        border:1px solid #00bbcc;
        border-radius: 0.45rem;
        text-align: center;

      }
      .mobileAuth-dialog{
        width:4rem;
        height:200px;
        background:#000;
        .close-dialog{
            background:#000;
        }
      }
    }
    .weui-dialog{
      width:70%;
      .btn{
        color:#00BBCC;
        font-family: PingFangSC-Regular;
        background-color: #fff;
        margin-top:10px;
      }
      .grayBtn{
        color:#B3B3B3 !important;
      }
    }
  }

</style>
