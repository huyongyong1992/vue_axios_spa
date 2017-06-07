<template>
	<div>
    我的账单页<br/>
    <router-link :to="'/borrowRecord/'">借款记录</router-link><br />
    <router-link :to="'/repayPlan/'">还款计划</router-link><br />
    <router-link :to="'/repayCurrentBill/'">还本期账单</router-link>
    <router-link :to="'/repayAllBill/'">结清所有账单</router-link>
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

  components:{
      
  },

  computed:{
      
     
  },

  methods:{
      
  },
}

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

</style>
