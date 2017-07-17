<template>
	<div class="borrowRecord">
    <head-top headTitle="借款记录" linkUs="true"></head-top>
    <div v-if="data.length === 0" class="noBill">
      <img src="../../images/noBillRecord.png">
      <p>暂无借款记录</p>
    </div>
    <div v-else class="container">
      <div class="title noBorder">
        <span >借款时间</span><span >借款信息</span><span >当前状态</span>
      </div>
      <div class="title" v-for="info in data" @click="onGetDetail(info.status)">
        <span >{{info.time}}</span>
        <span >{{info.info}}</span>
        <span>{{info.status}}
          <a v-if="info.status==='还款中' || info.status==='已逾期'" class="iconfont icon-icon_et "></a>
          <a v-else></a>
        </span>
      </div>
    </div>
   
  </div>
</template>

<script>
import headTop from '../../components/header/head';

export default {
  data(){
      return{
        data:[{
          time:'2017-02-03',
          info:'2000',
          status:'已逾期'
        },{
          time:'2017-02-03',
          info:'2000',
          status:'已结清'
        },{
          time:'2017-02-03',
          info:'2000',
          status:'还款中'
        }]
      }
  },
  components:{
    headTop
  },

	mounted(){

  },
  computed:{


  },

  methods:{
    onGetDetail(e) {
      if(e === '还款中' ||e === '已逾期') {
        this.$router.push('/repayPlan')
      }
    }
  },
}

</script>

<style lang="scss" scoped>
  .borrowRecord{
    .container{
      background:#fff;
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
    
    .title{
      display: flex;
      padding-right:4%;
      width:96%;
      margin-left:4%;
      font-size:14px;
      border-top:1px solid #f3f3f3;
      justify-content: space-between;
      height:45px;
      line-height:45px;
      
      span{
        display: flex;
        color:#666;
        a{
          width:16px;
          font-size:12px;
          display: block;
        }
      }
    }
    .noBorder{
      border:none !important;
      span{
        color:#333;
      }
      
    }
  }

</style>
