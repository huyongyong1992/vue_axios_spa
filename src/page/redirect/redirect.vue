<template>
  <div class="redirect">
    <x-button type="primary" @click.native="onRouteClick">动态路由</x-button>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import { mock } from '../../service/getData'
  export default {
    data(){
      return{

      }
    },
    created(){
      mock({
        type:1
      }).then(data => {
        console.log(data)
      })
    },
    components:{
      XButton
    },
    methods:{
      onRouteClick() {
        let id = parseInt(Math.random()*1000)
        this.$router.push(`/activeRoute/${id}`)
      }
    }
  }
</script>
<style lang="less">

</style>


