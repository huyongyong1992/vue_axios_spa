<template>
  <div>
    <div>问答</div>
    <group>
      <popup-picker :title="latestPerson" :data="latestPersonList" v-model="latestName" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :placeholder="relative">
      </popup-picker>
    </group>
  </div>
</template>

<script>
import { PopupPicker,Group } from 'vux' ;
  export default {
    data(){
      return{
        latestPerson: '直系亲属',
        relative: '请选择与本人关系',
        latestPersonList: [['父子', '母子', '爷爷', '奶奶', '外公', '外婆', '兄弟姐妹']],
        latestName:[]
      }
    },
    components:{
      PopupPicker,
      Group 
    },
    mounted(){
        
    },
    computed:{
          
    },

    methods:{
      onShow() {

      },
      onHide() {

      },
      onChange(e) {
        this.latestName = e
      } 
    },
  }

</script>

<style lang="scss" scoped>
 
  
</style>
