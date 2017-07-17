<template>
<!-- linkUs 不传则不显示右边图片 -->
  <div class="head_top">
    <header id='head_top'>
      <span v-if="isShowBack"></span>
      <span @click="goBack" class="iconfont icon-btn_back" v-else></span>
      <div class="head-Title">{{title}}</div>

      <slot name="right">
        <a>{{rightText}}</a>
      </slot>
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
    props: ['linkUs','title','isShowBack','rightText'],
    computed: {

    },
    methods: {
      goBack() {
        history.go(-1);
      }
    }

  }

</script>

<style lang="scss" scoped>
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
    a{
      text-decoration: none;
      color:#fff;
      font-size:14px;
    }
    head-Title{
      text-align:center;
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
