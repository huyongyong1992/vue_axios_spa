<template>
  <div class="repaymentSuccess">
      <header-top headTitle="还款成功"></header-top>
      <img src="../../images/img_tg@3x.png" class="repaymentSuccess_pic">
      <p class="repaymentSuccessTitle">棒棒哒！本期账单已经还清了~</p>
  </div>
</template>

<script>
  import headerTop from '../../components/header/head';
  export default {
    data(){
      return{


      }
    },

    mounted(){

    },
    components:{
      headerTop
    },

    computed:{
    },

    methods:{

    },

  }
</script>

<style lang="scss">
  .repaymentSuccess{
    width:100%;
    display:flex;
    flex-direction:column;
    align-items: center;
    .repaymentSuccess_pic{
      width:80%;
      height:200px;
      margin-top:50px;
    }
    .repaymentSuccessTitle{
      padding:0 15px;
      margin:50px 0;
      font-size:14px;
      font-weight:600;
      color:#666;
    }
 }



</style>
