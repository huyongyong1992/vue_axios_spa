<template>
	<div>
    <div>
      <router-link :to="'/fillLimit/'">已有额度,立即取现</router-link><br />
      <router-link :to="'/getLimit/personalAuthentication'">没有额度,立即获取额度</router-link>
      <router-link :to="'/myBill/'">我的账单</router-link><br/>

      <router-link :to="'/recommendGift/'">推荐有礼</router-link>

      <ul>
        <li>
          <button @click='clicked'>新手指引</button>
          <!-- <router-link :to="'/greenhand/'">新手指引</router-link> -->
        </li>
        <li>
          <router-link :to="'/connectUs/'">联系我们</router-link>          
        </li>
        <li>
          <router-link :to="'/aboutUs/'">关于微粒贷</router-link>
        </li>
        <li>
          <router-link :to="'/branchSearch/'">网点查询</router-link>
        </li>
        <li>
          <router-link :to="'/generalQuestion/qa'">常见问题</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      name:'young'
    }
  },

	mounted(){
        
  },

  components:{
      
  },

  computed:{
      
     
  },

  methods:{
    clicked(){
      // alert('别点我');
      const id = this.$store.state.steps ;
      this.name = 'yong';
      this.$router.push('/greenhand?id='+id+'&name='+this.name)
    }
  },
}

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  div{
    font-size:0.5rem;
    li{
      a{
        color:#f00;
      }
     
    }
  }
  button{
    padding: 5px 10px;
    background:#f00;
    color:#fff;
    border-radius:10px;
  }
</style>
