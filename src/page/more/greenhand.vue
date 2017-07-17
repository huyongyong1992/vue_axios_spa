<template>
	<div>
    <!--<head-slot title="你好啊召唤师" isShowBack>
      <a slot="right" href="tel:400523538">
        <span class="iconfont icon-btn_kf"></span>
      </a>
    </head-slot>-->
    <head-slot title="你好啊召唤师" isShowBack>
      
    </head-slot>
    <upload @sendImgInfo="getImgInfo"  :isSuccess="isSuccess" text="请拍摄身份证反面"></upload>

    <w-button @click="clicked" :disabled="isOk">你好</w-button>
  </div>
</template>

<script>
  import { uploadBackPic } from '../../service/getData';
  import { getQuery,customToast } from '../../config/mUtils';
  import upload from '../../components/upload';
  import headSlot from '../../components/header/headSlot';
  import wButton from '../../components/wButton'
  export default {
    data(){
      return{
        imgBase64:'',
        faceImg:'http://inews.gtimg.com/newsapp_bt/0/1663614302/1000',
        isSuccess:false,
        isOk:false
      }
    },

  	mounted(){  
      
    },

    components:{
      upload,headSlot,wButton
    },

    computed:{
        
       
    },

    methods:{
      getImgInfo(val) {
        const orderId = window.localStorage.getItem("orderId");
        // console.log(val)
        uploadBackPic({
          idcardImageReverseBase64:val.split(",")[1],
          orderId:orderId
        }).then((data) =>{
          this.$vux.loading.hide();
          if(data.error) {
            customToast(data);
            this.isSuccess = false;
            return;
          }
          this.isSuccess = true;
        })
      },
      clicked() {
        alert("我被点击了")
      }
     
    },
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

</style>
