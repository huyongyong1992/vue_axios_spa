<template>
    <div class="parentRoute">
      <header>
        <x-button type="primary" @click.native="onClicked(1)">路由1</x-button>
        <x-button type="primary" @click.native="onClicked(2)">路由2</x-button>
      </header>
      
      <transition name="router-fade" mode="out-in">
        <router-view v-wechat-title="$route.meta.title"></router-view>
      </transition>
    </div>
    
</template>

<script>
  import { XButton } from 'vux'
  export default {
    data(){
      return{
        id:null
      }
    },
    created(){
    },
    components:{
      XButton
    },
    methods:{
      onClicked(e) {
        e === 1 ? this.$router.push('/childOneRoute') : this.$router.push('/childTwoRoute');
      }
    }
  }
</script>
<style lang="less">
  .parentRoute{
    font-size:18px;
    header{
      width:100%;
      display: flex;
    }
    .weui-btn{
      width:40%;
      margin:5%;
    }
  }
</style>


