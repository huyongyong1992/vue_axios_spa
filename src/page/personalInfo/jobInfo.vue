<template>
	<div>
    工作信息
    <input v-model="phoneNo" />
    <count-down :startNo="startNo" :phoneNo="phoneNo"></count-down>
    <div>{{phoneNo}}</div>
    <x-button @click.native="test">haha</x-button>
  </div>
</template>

<script>
  import countDown from '../../components/countDown';
  import { getOrderList } from '../../service/getData';
  import {errorHandler } from '../../config/mUtils';
  import { XButton } from 'vux';
  export default {
    data(){
      return{
        phoneNo:'',
        startNo:60
      }
    },

  	mounted(){
      this.getMsg();

    },

    components:{
      countDown,XButton
     
    },

    computed:{ 
    },

    methods:{
      async getMsg() {
        await getOrderList({
          id:10,
          name: 10
        }).then((data) =>{
          this.data = data;
          // console.log(data)
          // console.log(this.data)
        }).catch(errorHandler)
      },
      test(){
        this.$vux.loading.show({
         text: 'Loading'
        })
        
      }
    },
   
  }
</script>

<style lang="scss" scoped>
  img{
    width:60%;
  }

</style>
