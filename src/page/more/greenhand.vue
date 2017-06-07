<template>
	<div>
    新手指引页<br/>
    <div>{{data.title}}</div>

    <up-load></up-load>
  </div>
</template>

<script>
  import { getOrderList } from '../../service/getData';
  import { getQuery } from '../../config/mUtils';
  import UpLoad from '../../components/upLoad';
  export default {
    data(){
      return{
        data:{}
      }
    },

  	mounted(){  
      this.getMsg();
    },

    components:{
      UpLoad
    },

    computed:{
        
       
    },

    methods:{
      async getMsg() {
        // const id = this.$route.query;
        const id = getQuery('name');
        console.log(id)
        this.data = await getOrderList({
          id:id,
          name: id
        });
      }
     
    },
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

</style>
