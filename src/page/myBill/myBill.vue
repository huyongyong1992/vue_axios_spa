<template>
	<div class="myBill">
    <head-slot title="我的账单" isShowBack>
      <router-link slot="right" :to="'/borrowRecord'">
        借款记录
      </router-link>
    </head-slot>
    <div v-if="isHaveBill">
      <article>
        <group>
          <cell title="本期应还金额" :value="pay">
            
            <p slot="child" class="yuqi">{{isOverdue ? '逾期' : ''}}</p>
          </cell>
          <cell title="还款日" :value="!isOverdue ? day : `${day}(逾期${isOverdue}天)`"></cell>
        </group>
      </article>
      <section>
        <router-link :to="'/repayPlan'" >还款计划</router-link>
      </section>

      <footer>
        <router-link :to="'/repayCurrentBill'" class="nowBill">还本期账单</router-link>
        <router-link :to="'/repayAllBill'" class="allBill">结清所有账单</router-link>
      </footer>
      
    </div>
    <div class="noBill" v-else>
      <img src="../../images/Group_10.png">
      <p>暂无账单</p>
    </div>
	</div>
	
</template>
<script>

  import headSlot from "../../components/header/headSlot";
  // import wButton from "../../components/wButton";
  import { Cell,Group } from 'vux';
  export default {
    data(){
      return{
        isHaveBill:true,
        isOverdue:5,
        pay:1234.657,
        day:'5月28日'
      }
    },
    mounted(){

    },
    components:{
      headSlot,Cell,Group
    },
    methods:{
      
    },
  }

</script>

<style lang="scss">
  
  .myBill{
    article{
      .weui-cells{
        margin-top:0px;
      }
      .yuqi{
        position:absolute;
        left:130px;
        font-size:12px;
        padding:1px 5px;
        background-color: #FF7272;
        border-radius: 4px;
        color:#fff;
      }
    }
    section{
      padding-right:4%;
      text-align: right;
      margin-top:0.55rem;
      a{
        color:#00BBCC;
      }
    }
    .noBill{
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      img{
        margin-top:1.34rem;
        width:80%;
      }
      p{
        font-size:14px;
        line-height: 25px;
        margin-top:1rem;
        color: #666666;
      }
    }
    footer{
      display: flex;
      padding:0 4%;
      margin-top:1.5rem;
      justify-content: space-between;
      a{
        width:44%;
        height:48px;
        display: block;
        font-size:16px;
        line-height: 48px;
        text-align: center;
        border-radius: 24px;
      }
      .nowBill{ 
        border: 1px solid #00BBCC;
        
        color:#00BBCC;
      }
      .allBill{
        background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
        color: #fff;
      }
    }
  }
  
</style>
