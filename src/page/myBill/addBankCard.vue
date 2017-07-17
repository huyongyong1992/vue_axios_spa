<template>
  <div class="billsavingCard">
      <header-top headTitle="添加银行卡"></header-top>
      <p>请提供一张本人储蓄卡作为收款卡，该卡同时作为还款卡</p>
      <group>
          <x-input
          title="姓名"
          placeholder='请输入该持卡人姓名'
          @on-change = 'onNameChange'
          :show-clear="true"
          required
          type="text"
          text-align="left"
          v-model="name">
        </x-input>
        <x-input
          title="身份证号"
          placeholder='请输入有效证件号'
          @on-change = 'onIdCardChange'
          :show-clear="true"
          required
          type="text"
          text-align="left"
          v-model="idCard">
        </x-input>

        <x-input
          title="储蓄卡卡号"
          placeholder="请输入储蓄卡号"
          :show-clear="true"
          required
          type="number"
          text-align="left"
          @on-change="onCardNoChange"
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
          v-model="mobile"
         >
        </x-input>
        <count-down :startNo="60" @sendSmsCode = "getSmsCode" :defaultVal="smsCode" :phoneNo="mobile" imgCode="false"></count-down>
      </group>
      <div class="agree" >
        <span :class="[agreeCheck ? 'icon-btn_gx_1' : 'icon-btn_gx_', 'iconfont']" @click="isAgree"></span>
        <span class="gray">我已阅读并同意签署</span>
        <a >
          <span class="server" @click="linkToSign">《银行卡代扣协议》</span>
        </a>
      </div>
      <button @click="onSubmit" class="subBtn"  :disabled="cardNo===''|| mobile===''|| smsCode===''|| !mobileReg.test(mobile) || bank === [] || idCard === '' ">提交资料</button>
    </div>
</template>

<script>
  import{ XButton,XInput,Group,PopupPicker,Cell  } from 'vux';
  import{ getBankList,bankCardVerify,getOrder } from '../../service/getData';
  import { getQuery,getStorage,customToast } from '../../config/mUtils' ;
  import countDown from '../../components/countDown';
  import headerTop from '../../components/header/head';
  // import Agree from '../../components/agree';
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
        mobileReg:/^0?1[3|4|5|7|8][0-9]\d{8}$/,
        name:'',
        idCard:'',
        startNo:60
      }
    },

    created(){
      getBankList().then((data) =>{ //获取银行列表
        this.banks = data.data;
        console.log(this.banks)
      });
      const addCardDraft = window.localStorage.getItem("addCardDraft") || '';
      if(addCardDraft) {//如果存在草稿,则读取草稿内容
        const draft = JSON.parse(addCardDraft)
        // console.log(draft)
        this.name = draft.name;
        this.cardNo = draft.cardNo;
        this.mobile = draft.mobile;
        this.smsCode = draft.smsCode;
        this.bank = draft.bank;
        this.idCard = draft.idCard;
        // console.log(draft.bank)
      }
    },
    components:{
      XInput,Group,countDown,headerTop,PopupPicker,Cell
    },

    methods:{
      //保存用户填写的草稿信息
      saveDraft() {
        const draft = {
          name:this.name,
          cardNo:this.cardNo,
          mobile:this.mobile,
          idCard:this.idCard,
          smsCode:this.smsCode,
          bank:this.bank,
        }
        localStorage.setItem('addCardDraft',JSON.stringify(draft))
      },

      getSmsCode(msg){
        this.smsCode = msg;
        this.saveDraft();
      },
      isAgree() {
        this.agreeCheck = !this.agreeCheck;
      },
      linkToSign() {
        this.$router.push('/registerServerAgreement')
      },
      onBankChange(val){
        this.bank = val;
        this.saveDraft();
      },
      onCardNoChange() {
        this.saveDraft();
      },
      onNameChange() {
        this.saveDraft();
      },
      onIdCardChange() {
        this.saveDraft();
      },
      onSubmit() {
        const orderId = window.localStorage.getItem('orderId')
        bankCardVerify({
          orderId:orderId,
          name:this.name,
          idCard:this.idCard,
          bankCardNo : this.cardNo,
          bankCardType :"0",
          bankName : this.bank[0],
          inputSMSCode :this.smsCode ,
          mobile :this.mobile,
        }).then(data =>{
          if(data.error) {
            customToast(data);
            return ;
          }
          localStorage.removeItem('addCardDraft');  //确认后清除草稿
          const channel = getQuery('from');
          if(channel === 'myBankList') {
            this.$router.push('/myBankList');
          }else{
            this.$router.push('/gatheringAccount');
          }

        })

      },
    },
  }

</script>
<style lang="scss" >
  @import '../../style/common';
  .billsavingCard{
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
      height:48px;
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
    .weui-btn{
      width:80%;
      margin-top:0.4rem;
    }
    .weui-cells{
      margin-top:0;
    }
   .sendCode{
    text-align:left;
   }

  }


</style>
