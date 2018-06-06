<template>
    <div class="redirect">
      <x-button type="primary" @click.native="onRouteClick">动态路由</x-button>

      <x-button type="primary" @click.native="onChildrenClick">子路由</x-button>
    </div>
</template>

<script>
  import { XButton } from 'vux'
  export default {
    data(){
      return{

      }
    },
    created(){
        
    },
    components:{
      XButton
    },
    methods:{
      onRouteClick() {
        let id = parseInt(Math.random()*1000)
        this.$router.push(`/activeRoute/${id}`)
      },
      onChildrenClick() {
        this.$router.push('/childOneRoute')
      }
    }
  }
</script>
<style lang="less">

</style>


