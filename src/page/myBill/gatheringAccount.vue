<template>
  <div class="gatheringAccount" >
    <header-top headTitle="借款" linkUs="true"></header-top>
    <group>
      <x-input title='￥' placeholder="请输入借款金额，最低1000" v-model="money" :max= "6" @on-change="onJudgeMoney" :min="4"></x-input>
      <popup-picker :data="list" title="借款期限" placeholder="请选择借款时间" v-model="listValue" @on-change="onTimeChange" ></popup-picker>

      <cell title='每月还款'  :value="`￥${shouldRepay}`">
        <p slot="child" class="iconfont icon-CombinedShape" @click="onCheckDetail"></p>
      </cell>
      <cell title='手续费'  :value="`￥${handingCharge}`"></cell>
      <cell title='还款计划'  value="查看" is-link @click.native="toRepayPlan"></cell>

      <cell title="收款账户" :value="bankName" is-link @click.native="onShowCardList" ></cell>
    </group>

    <div v-if="isBankShow" class="mask" @click="onHideMask">
      <div class="maskCont" @click.stop="tocard">
        <p>请选择银行卡</p>
        <div v-for="bank in bankList" @click="onSelectBank(bank.name)" class="bankList">
          <div class="left">
            <img :src="bank.imgUrl">
            <div class="leftRight">
              <div>{{bank.name}}</div>
              <div>{{bank.variety}}</div>
            </div>
          </div>
          <span class="iconfont icon-icon_et"></span>
        </div>
        <div @click="onAddBankCard" class="addBankCard">
          <div class="left">
            <img src="../../images/icon_jiahao2@3x.png">
            <div>添加银行卡</div>
          </div>
          <span class="iconfont icon-icon_et"></span>
        </div>
      </div>
    </div>
    <confirm
      v-model="isConfirmShow"
      title="请核对您的借款信息"
      cancel-text	="修改"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
      <p><span>借款金额</span><span>{{money}}</span></p>
      <p><span>借款期限</span><span>{{listValue[0]}}</span></p>
      <p><span>每月还款</span><span>{{shouldRepay}}</span></p>
      <p><span>手续费</span><span>{{handingCharge}}</span></p>
      <p><span>每月还款日</span><span>{{repayDay}}日</span></p>
      <p><span>收款账户</span><span>{{bankName}}</span></p>
    </confirm>

    <agree @click="onClicked" @link="link" text=" 《维立贷借款协议》"></agree>
    <w-button @click="onConfirmBorrow" :disabled="bankName===''|| money===''|| listValue==='' || !checked">确认借款</w-button>

    <div class="alert">
      <alert title="借款说明" button-text="知道了" v-model="isShowInterest">
        <div slot="default">
          <p><strong>1、费率说明：</strong></p>
          <p>手续费：借款金额的3%，最低100元，放款时从借款中扣除；</p>
          <p>月利息：七天内还款免息，超过七天按放贷额的0.5%</p>
          <p>月服务费：七天内还款免服务费，超过七天按放贷额的0.25%-2.39%</p>
          <p><strong>2、逾期罚息：</strong></p>
          <p>逾期本金*0.2%/日；违约金：50元（放贷额度&lt;=5000）；100元（放贷额度>5000）</p>
          <p><strong>3、提前清贷：</strong></p>
          <p>可随时提前清贷，七天内还款，免提前清贷手续费，否则按剩余本金3%计算，最低150元</p>
        </div>
      </alert>

      </alert>
    </div>
  </div>
</template>

<script>
  import headerTop from '../../components/header/head';
  import WButton from '../../components/wButton';
  import Agree from '../../components/agree';
  import { Group,XInput,PopupPicker,Cell,Confirm,Alert } from 'vux';
  export default {
    data(){
      return{
        checked:false,
        list:[['3期']],
        listValue:[],
        repayDay:28,
        money:'',
        bankName:'请选择银行卡',
        isBankShow:false,
        isConfirmShow:false,
        isShowInterest:false,
        imgUrl:'http://p3.wmpic.me/article/2017/06/19/1497856535_MbkTClVK.jpg',
        bankList:[{
          "name":'建设银行',
          'variety':'尾号3309储蓄卡',
          'number':'3309',
          'imgUrl':'http://p3.wmpic.me/article/2017/06/19/1497856535_MbkTClVK.jpg'
        },{
          "name":'工商银行',
          'variety':'尾号3309储蓄卡',
          'number':'3309',
          'imgUrl':'http://p3.wmpic.me/article/2017/06/19/1497856535_MbkTClVK.jpg'
        }],
        shouldRepay:1234,
        handingCharge:500
      }
    },

    mounted(){

    },

    components:{
      headerTop,Group,XInput,PopupPicker,Cell,WButton,Confirm,Agree,Alert
    },
    methods:{
      link() {
        this.$router.push('/registerServerAgreement')
      },
      onJudgeMoney(val) { //低于3000只能选择3期
        if(val >= 3000) {
          this.list = [['3期','6期','9期','12期']];
        }else{
          this.list = [['3期']];
        }
      },
      onCheckDetail(){  //利息详情
        this.isShowInterest = true;
      },
      onClicked(val) {
        this.checked = val;
        console.log(val)
      },
      onTimeChange(val) {
        this.listValue[0] = val;
        console.log(this.listValue[0])
      },
      toRepayPlan() {
        this.$router.push('/repayPlan');
      },
      onShowCardList() {
        this.isBankShow = true
      },
      onHideMask() {
        this.isBankShow = false;
      },
      tocard() {
      },
      onAddBankCard() {
        this.$router.push('/addBankCard');
      },
      onConfirmBorrow() {
        this.isConfirmShow = true;
      },
      onConfirm() {
         this.$router.push('/loanResult')
      },
      onCancel() {
        this.isConfirmShow = false;
      },
      onSelectBank(bankName){
        this.bankName = bankName;
        this.isBankShow = false
      }
    },

  }
</script>

<style lang="scss">
  .gatheringAccount{

    .icon-CombinedShape{
      color: #F9C44D;
      margin-left:5px;
      font-size:14px;
    }
    .weui-cells{
      margin:0;
    }
    .mask{
      position: fixed;
      width:100%;
      height:100%;
      background: rgba(0,0,0,0.3);
      top:0;
      z-index: 112;
      display: flex;
      justify-content: center;
      align-items: center;
      .maskCont{
        width:80%;
        // margin-left:10%;
        padding-top:20px ;
        // margin-top:30%;
        background: #fff;
        border-radius: 4px;
        p{
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
          line-height: 14px;
        }
      }
    }
    .weui-dialog__bd{
      margin-top:0.64rem;
      p{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom:0.53rem;
      }
    }
    .weui-dialog__btn_default{
      color:#999;
      font-size:14px;
    }
    .weui-dialog__btn_primary{
      color:#00bbcc;
      font-size:14px;
    }
    .bankList{
      display: flex;
      padding:0 4% 5px;
      justify-content: space-between;
      align-items: center;
      margin-top:0.4rem;
      border-bottom:1px solid #f3f3f3;
      .left{
        display: flex;
        div{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
          line-height: 14px;
          margin-bottom:5px;
        }
        img{
          width:30px;
          height:30px;
          margin-right:0.4rem;
        }
      }
      .iconfont{
        font-size:12px;
        color: #999;
      }
    }
    .addBankCard{
      display: flex;
      padding:0 4%;
      align-items:center;
      height:45px;
      justify-content: space-between;
      .left{
        display: flex;
        align-items:center;
        div{
          color:#ccc;
        }
        img{
          width:26px;
          height:26px;
          margin-right:0.4rem;
        }
      }

      .iconfont{
        font-size:12px;
        color:#999;
      }
    }

    // alert
    .alert{
      p{
        margin-bottom:0px ;
        text-align:left;
        font-size:14px;
        line-height:20px;
        font-family: PingFangSC-Regular;
        color:#3f3f3f ;
        strong{
          color:#666;
        }
      }

    }
    .weui-input{
      // text-align: right;
    }
  }


</style>
