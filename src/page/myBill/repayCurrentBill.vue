<template>
	<div class="repayCurrentBill">
    <head-top headTitle="还款" isShowBack linkUs="true"></head-top>
    <section>
      <p>还款金额</p>
      <div class="container">
        <div class="top" @click="isShowDetail">
          <span></span>
          <span>{{repayMoney}}</span>
          <img src="../../images/btn_zk_0.png" v-if="showDetail" class="topLeft">
          <img src="../../images/icon_et.png" v-else class="topRight">
        </div>
        <div v-if="showDetail" class="bottom">
          <div>
            <span class="left">剩余本金总计</span>
            <span>{{originMoney}}</span>
          </div>
          <div>
            <span class="left">本月未记利息</span>
            <span>{{interest}}</span>
          </div>
          <div>
            <span class="left">清贷手续费</span>
            <span>{{handlingCharge}}</span>
          </div>
          <div>
            <span class="left">逾期费用</span>
            <span>{{overdueMoney}}</span>
          </div>
        </div>
      </div>
     </section>
      <!--选择还款方式-->
    <div class="payType">
      <p>选择还款方式</p>
      <group>
        <cell @click.native="selectPayType(0)">
          <img src="../../images/icon_yinl@3x.png" slot="icon">
          <div slot="child" class="cont">
            <div class="top">银联在线支付</div>
            <div class="bottom">通过银联支付页面进行还款</div>
          </div>
          <span :class="`iconfont  ${defaultType === 0 ? 'icon-btn_gx_1' : 'icon-btn_gx_'}`"></span>
        </cell>
        <cell @click.native="selectPayType(1)">
          <span  class="iconfont icon-icon_ka" slot="icon"></span>
          <div slot="child" class="cont">
            <div class="top">自动还款</div>
            <div class="bottom">到期将自动从您的还款卡扣款</div>
          </div>
          <span :class="`iconfont  ${defaultType === 1 ? 'icon-btn_gx_1' : 'icon-btn_gx_'}`"></span>
        </cell>
      </group>
    </div>
    <w-button @click="onShowConfirm">立即还款</w-button>
    <div class="confirm">
      <confirm
        v-model="isConfirmShow"
        title="还款确认"
        cancel-text='残忍拒绝'
        confirm-text='继续申请'
        :content="`您正发起一笔${repayMoney}元的扣款，点击确定后将立即从您绑定的${bankName}(尾号${bankNo})中发起扣款，请确保余额充足。`"
        @on-confirm="onConfirm">
      </confirm>
    </div>

    <alert :title="alertTitle" :button-text="btnText" :content='alertContent' v-model="isAlertShow"></alert>
  </div>
</template>

<script>
import headTop from "../../components/header/head";
import right from '../../images/btn_zk_0.png';
import down from '../../images/icon_et.png'
import {  Group,Confirm,Alert,Cell } from 'vux';
import wButton from "../../components/wButton"
export default {
 data () {
    return {
      alertTitle:'银联付款结果确认',
      btnText:'关闭',
      alertContent:'银联交易结果处理中...',
      isAlertShow:false,

      defaultType:0,  //选中的银行卡支付类型

      originMoney:7410, //本金
      interest:30,  //利息
      overdueMoney:30,  //逾期费用
      handlingCharge:30,  //手续费
      showDetail: false,  //是否显示还款金额详情
      isConfirmShow:false,

      repayMoney:7000,
      bankName:'建设银行',
      bankNo:3309
    }
  },

	mounted(){

  },

  components:{
    headTop,
    Cell,
    Group,
    Confirm,
    wButton,
    Alert
  },
  methods: {
    selectPayType(val) {
      this.defaultType = val;
    },
    isShowDetail() {
      this.showDetail = !this.showDetail;
      console.log(this.showDetail)
    },
    onShowConfirm() {
      this.isConfirmShow = true;
    },
    onConfirm() {
      this.isAlertShow = true;
    },

  }
}

</script>

<style lang="scss">
  @import '../../style/mixin';
  .repayCurrentBill{
    section{
      background:#fff;
      padding-top:0.8rem;
      padding-bottom:20px;
      p{
        text-align:center;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #666666;
        line-height: 14px;
      }
      .container{
        width:92%;
        margin:20px 4% 0;
        border:1px solid #E1E1E1;
        border-radius:4px;
        .top{
          height:54px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          span{
            font-size:20px;
          }
          .topRight{
            height:16px;
            width:8px;
            // color:#999;
            margin-right:0.4rem;
          }
          .topLeft{
            width:16px;
            height:8px;
            // color:#999;
            margin-right:0.4rem;
          }
        }
        .bottom{
          border-top:1px solid #ccc;
          padding:0.4rem;
          div{
            display:flex;
            justify-content:space-between;
            font-family: PingFangSC-Regular;
            font-size:14px;
            line-height:14px;
            margin-top:6px;
            margin-bottom:14px;
            .left{
              color:#666;
            }
          }
        }
      }
    }
    // confirm样式
    .confirm{
      .weui-dialog__bd{
        div{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999999;
          line-height: 18px;
        }
      }
      .weui-dialog__btn{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
      }
      .weui-dialog__btn_primary{
        color: #00BBCC;
      }
      .weui-dialog__hd{
        .weui-dialog__title{
          color:#666;
        }
      }
    }

    // alert样式
    .weui-dialog__btn_primary{
      font-size:14px;
      color:#00bbcc;
    }
    a{
      text-decoration:none;
    }
    .weui-dialog__hd{
      margin-bottom:10px;
      .weui-dialog__title{
        font-size:14px;
        font-family: PingFangSC-Regular;
        color: #999999;
        line-height: 14px;
      }
    }
    .weui-dialog__bd{
      div{
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #666666;
        line-height: 16px;
      }
    }
    //还款方式
    .payType{
      p{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        line-height: 14px;
        padding:0.4rem;
      }
      .weui-cells{
        margin-top:0;
        .weui-cell{
          height:55px;
          .icon-icon_ka{
            color:#DE3131;
          }
          img{
            width:25px;
          }
          .icon-btn_gx_1{
            color: #00CCC2;
          }
          .cont{
            position: absolute;
            left:1.6rem;
            .top{
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #333333;
              line-height: 14px;
            }
            .bottom{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #999999;
              line-height: 12px;
            }
          }
        }
      }
    }

  }
</style>
