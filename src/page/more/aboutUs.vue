<template>
  <div class="aboutUs">
     <head-top headTitle="关于我们" linkUs="false" isBack="true"></head-top>
    <div class="content">
    <article class="title introduce">公司介绍</article>
    <div class="content-text">
      上海维信荟智金融科技有限公司（简称维信金科）前身成立于2006年，是国内最早的个人无抵押消费信贷专业企业之一。作为“智能金融”服务的先驱者，公司聚焦移动互联网，通过智能手机，为用户提供智能化、全自动化的个人消费金融服务。以金融科技重新定义金融服务，维信金科依托多年行业数据累积、经验沉淀，建立了领先业内的智能化“蜂鸟云风控系统”和多维度评分卡体系。公司以“开放”的态度，覆盖最广大的客户群体，凭借金融服务智能化的实现，打造消费金融领域“AlphaGo”，实现“让金融服务触手可及”的社会目标！
    </div>
    </div>

    <div class="content">
    <article class="title introduce">集团背景</article>
    <div class="content-text">
      维信金科全国下辖12个分部，服务网络遍布全国80多个省市，门店一百余家，累计发放贷款超过100亿元 管理贷款余额超过50亿元，每月新增贷款规模超过5亿元。雄厚的集团背景为维信金科的“智能金融战略”打下了坚实的基础。
    </div>
    </div>
    <div class="content">
    <article class="title introduce">愿景与使命</article>
    <div class="content-text">
      维信金科致力于成为一家令人尊敬的科技金融服务企业。企业使命——“让金融服务触手可及”
    </div>
    </div>

    <div class="content">
    <article class="title introduce">卓越风控</article>
    <div class="content-text">
      维信引入国际银行业及金融机构普遍使用的信贷决策审批系统，将国际先进的评级工具和技术手段与国内实际情况相结合，融合先进的分析技术、预测模型、自动处理业务规则和工作流程，实现了贷前、贷中、贷后全流程自动化、智能化审核。维信与中国银联、中国电信、中国移动、中国联通等公司签订了合作协议，在数据金融领域的风险控制方面进一步展开深入合作，为有效防范信贷风险提供了有力保障
    </div>
    </div>

    <div class="content">
    <article class="title introduce">创新驱动</article>
    <div class="content-text">
      维信自主开发了全流程核心业务系统（VBS），构建了系统化、自动化、智能化的信息系统，将外部大数据、反欺诈引擎、决策引擎和评分模型高效整合，成为数据金融革新的身体力行者。
      维信注重借助数据来量化和处置风险，近十年的数据积累，已经产生了很多具有统计学意义的人群信息分析数据。通过坚持建设和使用能有效甄别客户的偿还能力和偿付意愿的评分卡系统，使得维信的信贷资产不良率一直控制在业内领先水准。数据、算法、模型，已经深入维信的血脉，成为其数据金融的“基因”，也帮助维信更好地贯彻“让金融服务触手可及”的使命。
    </div>
    </div>


    <div class="content">
    <article class="title introduce">合作伙伴</article>
    <div class="content-text">
      维信金科与多家金融机构、行业协会保持长期紧密的合作关系。如：中国对外经济贸易信托有限公司、中国建设银行、中国工商银行、光大资本、银联商务、财富通等知名企业。
    </div>
    </div>

  </div>
</template>

<script>
import headTop  from '../../components/header/head';


export default {
  data(){ 
    return{
      

    }
  },

  mounted(){
      
  },

  components:{
    headTop 
  },

  computed:{
    // show: state => state.show
     
  },

  methods:{

  },
}

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .aboutUs{
    background:#fff;
    width:100%;
    height:auto;
  }
  .content{
    width:100%;
    height:auto;
    padding:15px;
    border-bottom: 1px solid #f3f3f3;
  }
  .title{
    height:0.2rem;
    font-size: 14px;
    text-align: left;
    margin-top:2px;
    color:#666;
    font-weight:500;
  }
  .content-text{
    font-size:12px;
    color:#999;
    margin-top:14px;
    line-height:20px;
  }

 
</style>
