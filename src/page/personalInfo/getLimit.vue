<template>
  <div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>


</template>

<script>
  import headTop from '../../components/header/head'
  import { Step, StepItem,XInput } from 'vux';
  export default {
    data(){
      return{
        h:'he'
      }
    },

    created(){
      
    },

    components:{
       Step, StepItem ,headTop,XInput
    },

    computed:{
      // steps: state => state.steps,
      // 不应该使用箭头函数来定义计算属性函数,理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例.而计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
      steps: function() {
        return this.$store.state.steps
      }
    },

    methods:{    
      
    },
  }

</script>

<style lang="scss" >
  .vux-step{
    /*height:1rem;*/
    padding:0 10%;
  }
  .vux-step-item-main{
    font-size:0.4rem;
    background:none;
    
  }
  .vux-step-item-title{
    position:absolute;
    bottom:0;
    font-size:0.4rem !important;
  }
  
</style>
