<template>
  <div class="aboutUs">
     <head-top headTitle="关于我们" ></head-top>
    <div class="content">
      看看就好
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
