<template>
	<div class="repayPlan">
    <head-top headTitle="还款计划" isShowBack ></head-top>
    <section>
      <div class="title">
        <span style="width:30%;display:block;text-align:left;">借款金额</span><span class="center">借款期限</span><span style="width:30%;display:block;text-align:right;">还款日期</span>
      </div>
      <div class="title">
        <span style="width:30%;display:block;text-align:left;">{{billMoney}}</span><span class="center">{{billTime}}</span><span style="width:30%;display:block;text-align:right;">{{repayDay}}</span>
      </div>
    </section>

    <article >
      我们将会在还款日当天凌晨 24:00从您绑定的还款银行卡中扣款，请确保银行卡余额充足
    </article>

    <group>
      <cell v-for="item in list" :title="item.label" :value="item.value">
        <p slot="child"  v-if="item.isRepay ===0" class="repayState" :class="`${item.isRepay ===0 ? 'repayed' : ''}`">已还</p>
        <p slot="child"  v-if="item.isRepay ===1" class="repayState" :class="`${item.isRepay ===1 ? 'yuqi' : ''}`">逾期</p>
      </cell>
    </group>

  </div>
</template>

<script>
import headTop from "../../components/header/head";
import { Group,Cell } from 'vux';
export default {
  data(){
      return{
        billMoney:50000,
        billTime:"12个月",
        repayDay:'每月28号',
        list: [{
        label: '2015-05-08',
        value: 724.21,
        monthPay:54.21,
        isRepay:0
        },{
        label: '2015-05-08',
        value: 724.21,
        monthPay:54.21,
        isRepay:1
       },{
        label: '2015-05-08',
        value: 924.21 ,
        monthPay:54.21,
        isRepay:2,
       },{
        label: '2015-05-08',
        value: 324.21,
        monthPay:24.21,
        isRepay:1
       },{
        label: '2015-05-08',
        value: 724.21,
        monthPay:54.21,
        isRepay:0
       }]
      }
  },

	mounted(){

  },
  components:{
    headTop,
    Group,
    Cell
  },

  methods:{

  },
}

</script>

<style lang="scss" >
  @import '../../style/mixin';
  body{
     background: #fff;
  }
  .repayPlan{
    text-align: center;
    background: #fff;
    section{
      width:100%;
      height:109px;
      background-image: url('../../images/login_bg_top.png');
      background-size: 100% 109px;
      .title{
        width:92%;
        margin:0 4%;
        display: flex;
        // justify-content: space-between;
        span{
          color:#fff;
          font-size:14px;
          line-height: 14px;
          font-family: 'PingFangSC-Medium';
          margin:17px 0 8px;
        }
        .center{
          display: block;
          width:40%;
          text-align: center;
        }
      }
    }
    article{
      margin:0.8rem 0;
      padding:0 4%;
      text-align: left;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #999999;

    }
    .weui-cells{
      margin-top:0;
      .vux-label{
        text-align: left;
      }
      .repayState{
        position: absolute;
        left:130px;
        color:#fff;
        font-size:12px;
        border-radius: 4px;
        padding:2px 4px;
      }
      .repayed{
        background: #B8E986;
      }
      .yuqi{
        background: #FF7272;
      }
    }
    .weui-cells:before{
      border:none;
    }
    .weui-cells:after{
      border:none;
    }

  }

</style>
