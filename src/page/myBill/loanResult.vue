<template>
  <div class="loanResult">
    <div v-if="status===1" class="loanSuccess" >
      <header-top headTitle="借款成功"></header-top>
      <img src="../../images/bg_jkcg@3x.png" class="loanSuccess_pic"/>
      <p class="loanSuccessTitle">恭喜你借款成功！</p>
      <span class="loanSuccessText">稍后，我们会电话跟您确认借款信息，请您注意接听放款通知电话！</span>
    </div>
    <div v-else="status===2" class="loanFail">
      <header-top headTitle="借款失败"></header-top>
      <img src="../../images/bg_jksb@3x.png" class="loanFail_pic"/>
      <p class="loanFail_text">
        很抱歉，您的微粒贷使用情况不符合我司放款要求，暂时无法为您放款，您可去正常使用微粒贷，保持良好信用，再来借款。
      </p>
      <p class="Que">维立贷借款资格？</p>
      <span class="Ans">您必须具备腾讯微粒贷额度，且已使用并且正常还款一期，方能申请维立贷。</span>
    </div>
  </div>
</template>

<script>
  import headerTop from '../../components/header/head';
  export default {
    data(){
      return{
        status:2,

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
body{
  background: #fff;
  .loanResult{
    .loanFail{
      width:100%;
      display:flex;
      flex-direction:column;
      align-items: center;
      .loanFail_pic{
        width:80%;
        height:200px;
        margin-top:1.5rem;
        align-self:center;
      }
      .loanFail_text{
        width:70%;
        height:auto;
        font-size:14px;
        text-align:left;
        padding:0 15px;
        margin: 40px 0;
        color: #666666;
        letter-spacing: 0;
        line-height: 25px;
      }
      .Que{
        width:70%;
        text-align:left;
        padding:0 15px;
        font-size:12px;
        font-weight:600;
        color:#00bbcc;
        text-align:left;
      }
      .Ans{
        width:70%;
        font-size:14px;
        padding-top:0.2rem;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        letter-spacing: 0;
        line-height: 25px;
      }
    }
    .loanSuccess{
      width:100%;
      display:flex;
      flex-direction:column;
      align-items: center;
      .loanSuccess_pic{
        width:80%;
        height:200px;
        margin-top:20px;
      }
      .loanSuccessTitle{
        padding:0 15px;
        margin:1rem 0 0.5rem 0;
        font-weight:600;
        font-size: 16px;
        color: #666666;
        letter-spacing: 0;
        line-height: 16px;
      }
      .loanSuccessText{
        width:60%;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        letter-spacing: 0;
        line-height: 25px;
      }
  }
  }
}


</style>
