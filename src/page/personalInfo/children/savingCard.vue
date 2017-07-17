<template>
    <div class="savingCard">
      <!--<header-top linkUs="true" headTitle="获取额度"></header-top>-->
      <p>请提供一张本人储蓄卡</p>
      <group>
        <x-input
          title="储蓄卡卡号"
          placeholder="请输入储蓄卡号"
          :show-clear="true"
          required
          type="number"
          text-align="left"
          v-model="cardNo">
        </x-input>

        <popup-picker
          title="发卡银行"
          :data="banks"
          v-model="bank"
          @on-change="onBankChange"
          show-name
          :columns="1"
          placeholder="请选择发卡银行">
        </popup-picker>

        <x-input
          title="预留手机号"
          placeholder="请输入该卡预留手机号"
          :show-clear="true"
          required
          type="number"
          text-align="left"
          v-model="mobile">
        </x-input>

        <!--<x-input title="图片验证码" v-model="imgCode" placeholder="请输入图片验证码">
          <img slot="right" class="imgCode" :src="vercodeURL"  @click="refreshImgCode" v-if="isShowImgCode"/>
          <span slot="label">图片验证码</span>
        </x-input>-->
        <count-down :startNo="60" @sendSmsCode = "getSmsCode" :defaultVal="smsCode" :phoneNo="mobile" imgCode="false"></count-down>
      </group>
      <div class="agree" @click="linkToSign">
        <span :class="[agreeCheck ? 'icon-btn_gx_1' : 'icon-btn_gx_', 'iconfont']" ></span>
        <span class="gray">我已阅读并同意签署</span>
        <a>
          <span class="server">《个人信息授权书》</span>
        </a>
      </div>
      <button @click="onSubmit" class="subBtn" :disabled="cardNo===''|| mobile===''|| smsCode===''|| !mobileReg.test(mobile) || !agreeCheck || bank === []">下一步</button>

      <router-link :to="'/getLimit/bankCardAuthentication'" class="toSavingCard">使用信用卡</router-link>
    </div>
</template>

<script>
  import{ XButton,XInput,Group,PopupPicker,Cell  } from 'vux';
  import{ getImageCode,getBankList,bankCardVerify,getOrder } from '../../../service/getData';
  import { getQuery,getStorage,getImgCodeCommon,customToast } from '../../../config/mUtils' ;
  import countDown from '../../../components/countDown';
  import headerTop from '../../../components/header/head';
  // import { mapState  } from 'vuex';
  export default {
    data(){
      return{
        cardNo:'',
        mobile:'',
        smsCode:'',
        data:{},
        agreeCheck:false,
        banks:[],
        bank:[],
        // isShowImgCode:false,
        imgCode:'',
        mobileReg:/^0?1[3|4|5|7|8][0-9]\d{8}$/,
        // vercodeURL:'',  //图片验证码地址
        faceCompareScore:'',
        name:'',
        idCard:'',
      }
    },

    created(){
      this.$store.state.steps =2;
      this.$store.state.authTitle = '银行卡认证'
      getBankList().then((data) =>{ //获取银行列表
        this.banks = data.data;
      })
      // 判断是否从电子签名页回来的，如果是，则把用户之前填写后保存的信息展示出来
      // const from =getQuery('from');
     
      getOrder({
        accountId:getStorage("accountId")
      }).then(data =>{
        if(data.error) {
          customToast(data);
          return ;
        }
        
        if(data.data&&data.data.applyStep === 500) {
          
          this.agreeCheck = true;
        }
        this.name = data.data.customerName;
        this.idCard = data.data.idcard;
      });
      if(getStorage('savingCardDraft')) {
        const savingCardDraft = JSON.parse(getStorage('savingCardDraft'));  //读取草稿
        this.cardNo = savingCardDraft.cardNo;
        this.mobile = savingCardDraft.mobile;
        this.smsCode = savingCardDraft.smsCode;
        this.bank = savingCardDraft.bank;
      
      }
    },

    components:{
      XInput,Group,countDown,headerTop,PopupPicker,Cell
    },

    methods:{
      //保存用户填写的草稿信息
      saveDraft() {
        const draft = {
          cardNo:this.cardNo,
          mobile:this.mobile,
          smsCode:this.smsCode,
          // imgCode:this.imgCode,
          bank:this.bank,
          // vercodeURL:this.vercodeURL
        }
        localStorage.setItem('savingCardDraft',JSON.stringify(draft))
      },
      //跳转前，先把用户信息存起来
      linkToSign() {
        // if(this.agreeCheck) {
        //   this.$vux.toast.show({
        //     text: '您已签过，无需再签',
        //     type:'warn'
        //   });
        //   return ;
        // }
        const orderId = getStorage('orderId');
        const accountId = getStorage('accountId');
        const token = getStorage('accessToken');
        this.saveDraft();
        window.location.href = 'http://beauty-dev.vdanbao.com/web/app/wld/wechat_sign.html?orderId=' + orderId + '&accountId=' + accountId + '&token=' + token + '&idcard=' + this.idCard + '&name=' + this.name;
      },

      getSmsCode(msg){
        this.smsCode = msg;
      },

      onBankChange(val){
        this.bank[0] = val;
        console.log(val)
      },
      onSubmit() {
        const orderId = window.localStorage.getItem('orderId')
        bankCardVerify({
          orderId:orderId,
          bankCardNo : this.cardNo,
          bankCardType : 0,
          bankName : this.bank[0],
          inputSMSCode :this.smsCode ,
          mobile :this.mobile,
        }).then(data =>{
          if(data.error) {
            customToast(data);
            return ;
          }
          this.$router.push('/calculateLimit')
        })     
      },
     
    },
  }

</script>

<style lang="scss" >
  @import '../../../style/common';
  .savingCard{
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
      font-size:14px;
    }
    .weui-cell__hd{
      width:100px;
    }
    .weui-cell {
      font-size: 14px;
    }
    .vux-popup-picker-select{
      text-align: left !important;
    }
    .weui-label{
      width:105px !important;
       text-align:left;
    }
    p{
      padding:0;
      height:45px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      line-height: 45px;
      padding-left:0.4rem;
    }
    .toSavingCard{
      display:block;
      color:#00CDD4;
      font-family: "PingFangSC-Regular";
      width:100%;
      height:1rem;
      line-height:1rem;
      text-align:center;
    }
    .weui-btn{
      width:80%;
      margin-top:0.4rem;
    }
    .weui-cells{
      margin-top:0;
    }
    .imgCode {
      width: 2rem;
      height: 1.05rem;
      position: absolute;
      right: 0;
      top: 0.05rem;
    }
   .sendCode{
    text-align:left;
   }

  }


</style>
