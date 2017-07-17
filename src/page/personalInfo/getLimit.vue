<template>
  <div>
    <header-top linkUs="true" :headTitle="headTitle"></header-top>
    <div class="getLimitStep">
      <flow>
        <flow-state state="1" title="实名认证" :is-done ="steps>=0"></flow-state>
        <flow-line :is-done ="steps>=1"></flow-line>

        <flow-state state="2" title="手机认证" :is-done="steps >=1"></flow-state>
        <flow-line :is-done ="steps>=2"></flow-line>


        <flow-state state="3" title="银行卡认证" :is-done ="steps>=2"></flow-state>
      </flow>
    </div>

    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>


</template>

<script>
  import headerTop from '../../components/header/head';
  import { Flow,FlowState,FlowLine } from 'vux';
  export default {
    data(){
      return{
        
      }
    },
    components:{
      headerTop,Flow,FlowState,FlowLine
    },
    computed:{
      // steps: state => state.steps,
      // 不应该使用箭头函数来定义计算属性函数,理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例.而计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
      steps: function() {
        return this.$store.state.steps
      },
      headTitle:function(){
        return this.$store.state.authTitle
      }
    },

    methods:{

    },
  }

</script>

<style lang="scss" >
.getLimitStep{
  background: #fff;
  width:100%;
  height:3rem;
  .weui-wepay-flow__li_done .weui-wepay-flow__state {
      background-color:#00ccc2 ;
  }
  .weui-wepay-flow__li .weui-wepay-flow__state {
      position: absolute ;
      left: 0 ;
      top: 0 ;
      width: 1rem ;
      height: 1rem;
      font-size: 16px;
      line-height: 0.8rem;
      text-align: center ;
      color: #FFF ;
      border-radius: 0.5rem ;
      box-sizing: border-box ;
      border:4px solid #f3f3f3 ;
  }
  .weui-wepay-flow__title-bottom {
    top: 1rem;
    left: 50% ;
    -webkit-transform: translate(-50%, 0) ;
    transform: translate(-50%, 0);
    margin:10px 0px 0px 10px ;
    font-size:12px ;
  }
  .weui-wepay-flow, .weui-wepay-flow-auto {
    padding: 20px 60px 40px 40px;
  }
  .weui-wepay-flow__line {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    background-color: #E2E2E2;
    height: 3px;
    position: relative;
    margin-top: 0.5rem;
  }
  .weui-wepay-flow__process {
    display: none;
    background-color: #00ccc2;
    height: 3px;
    position: relative;
  }
}
</style>
