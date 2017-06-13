<template>
 <div>
  <head-top headTitle="常见问题" linkUs="true" isBack="true"></head-top>
	<div class="generalQuestion" >
      <group class="content">
      <cell :title="('维粒贷如何获取额度？')" is-link :border-intent="false" :arrow-direction="showContent ? 'up' : 'down'" @click.native="showContent = !showContent" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
      </cell>
      <template v-if="showContent">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">如果是新用户使用维粒贷，只要在微信公众号点击进入维粒贷，按照提示和要求提交资料就能获得额度啦。
        </span>
        </cell-box>
      </template>
      <cell :title="('只有具备腾讯微粒贷条件的人才能申请维粒贷吗？')" is-link :border-intent="false" :arrow-direction="showContent1 ? 'up' : 'down'" @click.native="showContent1 = !showContent1" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
      </cell>
      <template v-if="showContent1">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">是的。您只有在腾讯QQ或者微信有微粒贷额度，已经使用而且正常还款一期后才能申请我司的维粒贷。
        </span>
        </cell-box>
      </template>
       <cell :title="('维粒贷申请资料有哪些？')" is-link :border-intent="false" :arrow-direction="showContent2 ? 'up' : 'down'"  @click.native="showContent2 = !showContent2" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
       </cell>
      <template v-if="showContent2">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">
        维粒贷网上申请资料有：腾讯微粒贷额度、身份证、信用卡或储蓄卡。
        </span>
        </cell-box>
      </template>
       <cell :title="('维粒贷额度申请需要多久？')" is-link :border-intent="false" :arrow-direction="showContent3 ? 'up' : 'down'" @click.native="showContent3 = !showContent3" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
       </cell>
      <template v-if="showContent3">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">
        线上额度申请，15分钟即可出额度。
        </span>
        </cell-box>
      </template>
        <cell :title="('维粒贷的审批额度？')" is-link :border-intent="false" :arrow-direction="showContent4 ? 'up' : 'down'" @click.native="showContent4 = !showContent4" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
        </cell>
      <template v-if="showContent4">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">
        维粒贷的贷款最高额度为15万，最终审批额度将根据您的实际情况决定。
        </span>
        </cell-box>
      </template>
        <cell :title="('维粒贷如何提取现金？')" is-link :border-intent="false" :arrow-direction="showContent5 ? 'up' : 'down'" @click.native="showContent5 = !showContent5" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
        </cell>
      <template v-if="showContent5">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">
        您在维粒贷公众号按照提示和要求提交资料获得额度后，我们的客户经理会主动联系您，协助您完成借款操作。
        </span>
        </cell-box>
      </template>
      <cell :title="('签约后多久可以放款？')" is-link :border-intent="false" :arrow-direction="showContent5 ? 'up' : 'down'" @click.native="showContent5 = !showContent5" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
      </cell>
      <template v-if="showContent5">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">
        最快当天放款。
        </span>
        </cell-box>
      </template>
      <cell :title="('贷款申请期数？')" is-link :border-intent="false" :arrow-direction="showContent6 ? 'up' : 'down'" @click.native="showContent6 = !showContent6" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
      </cell>
      <template v-if="showContent6">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">
        工薪人士可分12期、24期、36期。
        私营业主、企业老板可分12期、24期。
        </span>
        </cell-box>
      </template>
      <cell :title="('短信通知签名有问题是什么意思？')" is-link :border-intent="false" :arrow-direction="showContent7 ? 'up' : 'down'" @click.native="showContent7 = !showContent7" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
      </cell>
      <template v-if="showContent7">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">
        您的个人信息授权书签名，需要用正楷签署，要字迹清晰，如果审核后短信通知您签名不清晰或不是您本人姓名，请再次登录维粒贷微信公众号，根据提示重新签署您的名字。
        </span>
        </cell-box>
      </template>
      <cell :title="('我为什么被拒绝了？')" is-link :border-intent="false" :arrow-direction="showContent8 ? 'up' : 'down'" @click.native="showContent8 = !showContent8" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
      </cell>
      <template v-if="showContent8">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">
        您所在的城市暂无我司线下门店或您的综合评分暂不满足贷款条件。您可尝试我司豆豆钱纯线上申请，10分钟极速申请，提现。
        </span>
        </cell-box>
      </template>
      <cell :title="('如何还款？')" is-link :border-intent="false" :arrow-direction="showContent9 ? 'up' : 'down'" @click.native="showContent9 = !showContent9" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
      </cell>
      <template v-if="showContent9">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">
        按照您签约时约定的还款期限和还款日期还款，不要忘记每月按时还款哦！
        </span>
        </cell-box>
      </template>
      <cell :title="('维粒贷费率如何？')" is-link :border-intent="false" :arrow-direction="showContent10 ? 'up' : 'down'" @click.native="showContent10 = !showContent10" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
      </cell>
      <template v-if="showContent10">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">
        履约保证金：借款金额的5%，如您正常按期还款，在还款完成后会返到您的银行卡。综合费率：借款金额的1.5~2.3%，根据您的个人信用状况来定。
        </span>
        </cell-box>
      </template>
      <cell :title="('什么是履约保证金？')" is-link :border-intent="false" :arrow-direction="showContent11 ? 'up' : 'down'" @click.native="showContent11 = !showContent11" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
      </cell>
      <template v-if="showContent11">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">
        履约保证金是您的信用保证金，如果您按照合同约定的还款期限和还款日期正常还款，在您还完所有贷款后，履约保证金将返还给您。
        </span>
        </cell-box>
      </template>
      <cell :title="('可以提前还清所有借款吗？')" is-link :border-intent="false" :arrow-direction="showContent12 ? 'up' : 'down'" @click.native="showContent12 = !showContent12" class="content-title">
        <span slot="icon" width="20" style="display:block;margin-right:5px; color:#00CCC2;" class="iconfont icon-icon_que"></span>
      </cell>
      <template v-if="showContent12">
        <cell-box :border-intent="false" class="sub-item">
        <span class="content-text">
        可以随时还清所有借款。但请注意，如果提前结清借款，履约保证金将不退还。
        </span>
        </cell-box>
      </template>
      </group>
    
   <!--  <router-link :to="'qa'">常见问题</router-link>
    <router-link :to="'suggestion'">吐槽维粒贷</router-link> -->
  
<!--     <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition> -->
  </div>
 </div>
</template>

<script>
import headTop from "../../components/header/head";
import { Cell, CellBox, CellFormPreview, Group } from 'vux'
export default {
  data(){
    return{
     
      showContent: true,
      showContent1: false,
      showContent2: false,
      showContent3: false,
      showContent4: false,
      showContent5: false,
      showContent6: true,
      showContent7: false,
      showContent8: false,
      showContent9: false,
      showContent10: false,
      showContent11: false,
      showContent12: false,
      showContent13: false,
    }
  },

	mounted(){
      
  },

  components:{
      headTop,Cell, CellBox, CellFormPreview, Group
  },

  computed:{
      
     
  },

  methods:{
      
  },
}

</script>

<style lang="scss">
 bady{
   background:#fff;
  }
.generalQuestion{
  background:#fff;
  width:100%;
  height:auto;

}
.content{
  margin-top:-11px;
  padding-left: 15px;
  padding-right: 15px;
  width:10rem;
  color:#666;
  z-index: -1;
  
}
.content-title{
  color: #666;
  font-size:14px;
  font-weight:500;
  text-align: left;
}
.content-text{
  color:#999;
  font-size:12px;
  width:8rem;
  text-align: left;
  display:flex;
  margin-left: 0.5rem;
}
</style>
