<template>
<!-- linkUs 不传则不显示右边图片 -->
  <div class="head_top">
    <header id='head_top'> 
        <span @click="goBack" class="iconfont icon-btn_back"></span>
        <div>{{headTitle}}</div>
        <div v-if='linkUs'>
          <a href="tel:13265821397">
            <span class="iconfont icon-btn_kf"></span>
          </a>
        </div>
        <div v-else></div>
    </header>
    <div class="null"></div>
  </div>
</template>

<script>
  export default {
  	data(){
      return{

      }
    },
    mounted(){
       
    },
    props: ['linkUs', 'headTitle'],
    computed: {
       
    },
    methods: {
      goBack() {
        history.go(-1);
      }
    }

  }

</script>

<style lang="scss">
  @import '../../style/mixin';

  #head_top{
    padding:0 4%;
    width: 100%;
    height:1.28rem;
    background-color:#00CCC2;
    display:flex;
    font-size:16px;
    justify-content:space-between;
    align-items:center;
    position:fixed;
    top:0;
    left:0;
    z-index: 111;
    .icon-btn_back{
      color:#fff;
      font-size:16px;
    }
    div{
      height:1.28rem;
      display: flex;
      align-items: center;
      color:#fff;
      font-size:16px;
      span{
        font-size:16px;
        color:#fff;
      }
    }
    
  }
  .null{
    height:1.28rem;
    width: 100%;
  } 
</style>
