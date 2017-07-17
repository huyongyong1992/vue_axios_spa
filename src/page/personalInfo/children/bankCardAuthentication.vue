<template>
  <div class="bankCardAuthentication">
    <!--<header-top linkUs="true" headTitle="获取额度"></header-top>-->
    <p>请提供一张本人信用卡</p>
    <group>
      <x-input
        title="信用卡卡号"
        placeholder="请输入信用卡号"
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
        show-name
        :columns="1"
        @on-change="onBankChange"
        placeholder="请选择发卡银行">
      </popup-picker>

      <x-input
        title="预留手机号"
        placeholder="请输入该卡预留手机号"
        :show-clear="true"
        required
        type="number"
        text-align="left"
        v-model="mobile"
      >
      </x-input>

      <!--<x-input title="图片验证码" v-model="imgCode" placeholder="请输入图片验证码">
        <img slot="right" class="imgCode" :src="vercodeURL"  @click="refreshImgCode" v-if="isShowImgCode"/>

        <span slot="label">图片验证码</span>
      </x-input>-->
      <count-down :startNo="60" @sendSmsCode = "getSmsCode" :defaultVal="smsCode" :phoneNo="mobile" imgCode="false"></count-down>
    </group>
    <div class="agree" @click="linkToSign">
      <span :class="[agreeCheck ? 'icon-btn_gx_1' : 'icon-btn_gx_', 'iconfont']"></span>
      <span class="gray">我已阅读并同意签署</span>
      <a >
        <span class="server">《个人信息授权书》</span>
      </a>
    </div>
    <button @click="onSubmit" class="subBtn" :disabled="cardNo===''|| mobile==='' || smsCode===''|| !mobileReg.test(mobile) || !agreeCheck || bank === []">下一步</button>

    <router-link :to="'/getLimit/savingCard'" class="toSavingCard">我没有信用卡,去使用储蓄卡</router-link>
  </div>
</template>

<script>
  import { getBankList,bankCardVerify,getOrder } from '../../../service/getData';
  import headerTop from '../../../components/header/head';
  import countDown from '../../../components/countDown';
  import { getStorage,getQuery,getImgCodeCommon,customToast } from '../../../config/mUtils'
  import{ XInput,Group,PopupPicker } from 'vux';

  // import { mapState  } from 'vuex'
  export default {
    data(){
      return{
        cardNo:'',
        mobile:'',
        smsCode:'',
        agreeCheck:false,
        banks:[],
        bank:[],
        // isShowImgCode:false,     //图片验证码右边图片
        imgCode:'',
        mobileReg:/^0?1[3|4|5|7|8][0-9]\d{8}$/,
        // vercodeURL:'',  //图片验证码地址
        name:'',
        idCard:'',
      }
    },
    // computed:mapState({
    //   idCard: state => state.idCard,  //获取store中的身份证号
    //   idName: state => state.idName,  //获取store中的姓名
    // }),

    components:{

      XInput,Group,countDown,headerTop,PopupPicker
    },

    created () {
      this.$store.state.steps =2;
      this.$store.state.authTitle = '银行卡认证';
      getBankList().then((data) =>{
        this.banks = data.data;
      })
      // const from = getQuery('from');
      // if(from) {
      //   this.agreeCheck = true;
      // }
      getOrder({
        accountId:getStorage("accountId")
      }).then((data) =>{
        if(data.data&&data.data.applyStep === 500) {
          this.agreeCheck = true;
        }
        this.name = data.data.customerName;
        this.idCard = data.data.idcard;
      });
      if(getStorage('bankCardDraft')) {
        const bankCardDraft = JSON.parse(getStorage('bankCardDraft'));  //读取草稿
        this.cardNo = bankCardDraft.cardNo;
        this.mobile = bankCardDraft.mobile;
        this.smsCode = bankCardDraft.smsCode;
        // this.imgCode = bankCardDraft.imgCode;
        this.bank = bankCardDraft.bank;
        // this.vercodeURL = bankCardDraft.vercodeURL;
        // this.isShowImgCode = true;
      }

    },
    computed:{
      steps: function() {
        return this.$store.state.steps
      }
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
        localStorage.setItem('bankCardDraft',JSON.stringify(draft))
      },
      linkToSign() {
        if(this.agreeCheck) {
          this.$vux.toast.show({
            text: '您已签过，无需再签',
            type:'warn'
          });
          return ;
        }
        const orderId = getStorage('orderId');
        const accountId = getStorage('accountId');
        const token = getStorage('accessToken');
        this.saveDraft();
        window.location.href = 'http://beauty-dev.vdanbao.com/web/app/wld/wechat_sign.html?orderId=' + orderId + '&accountId=' + accountId + '&token=' + token + '&idcard=' + this.idCard + '&name=' + this.name;
      
      },

      getSmsCode(msg){
        this.smsCode = msg

      },
      onBankChange(val){  //传银行code
        this.bank[0] = val;
      },
      onSubmit() {  //提交认证
        const orderId = window.localStorage.getItem('orderId');
        bankCardVerify({
          orderId:orderId,
          bankCardNo : this.cardNo,
          bankCardType :"1",
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
      //       time:100000
      //     })
      //     return ;
      //   }
      //   // this.isShowImgCode = true;
      //   // getImgCodeCommon(this.mobile).then(e =>{
      //   //   this.vercodeURL = e
      //   // })
      // },

    },
  }

</script>

<style lang="scss">
  @import '../../../style/common';
  .weui-toast{
    width:50% !important;
  }
  .bankCardAuthentication{
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
    p{
      padding:0;
      height:45px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      line-height: 45px;
      padding-left:0.4rem;
      text-align:left;
    }
    .weui-label{
      width:105px !important;
      text-align:left !important;
    }
    .toSavingCard{
      display:block;
      width:100%;
      height:1rem;
      line-height:1rem;
      text-align:center;
      color:#00CDD4;
      font-family: "PingFangSC-Regular";
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
      height: 1.15rem;
      position: absolute;
      right: 0;
      top: 0.05rem;
    }
  }


</style>
