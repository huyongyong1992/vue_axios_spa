<template>
  <div class="upload">
    <div  class='imgs' >
      <img :src="(isSuccess ? showImg : '' )|| deaultImg" v-if="isSuccess" class="img"/>
      <img src="../images/idCardBack.png"  class="img" v-else/>
      <!--实在没办法了，用该标签中转，将其z-index设为-1，使其不可见-->
      <img :src="results"  id="img" />

      <input @change='addImg'  type="file" accept="image/*" capture="camera" />
    </div>
    <p :class="[isSuccess  ? 'success' : '']">{{isSuccess ? '上传成功' : text}}</p>
    
  </div>
</template>

<script>
  import { compressImg } from '../config/mUtils';
  export default {
    data(){
      return{
        showImg:'',
        results:''
      }
    },
    props:[
      "deaultImg", //之前传过的图片,
      "isSuccess", //传图片服务端响应结果,需要在接口响应中设置true or false 
      "text"      //未上传图片时最下面显示的文本
    ],
  	created(){  
      
    },
    components:{
      
    },
    watch:{
      isSuccess(cur,old) {  //监听isSuccess的变化，如果成功，则显示上传的图片
        if(cur) this.showImg = this.results 
      }
    },
    methods:{
      addImg(event) {
        var imgFile=event.target.files[0];
        //判断类型是不是图片 
        if(!/image\/\w+/.test(imgFile.type)){     
          alert("请确保文件为图像类型");   
          return ;   
        } 
        var reader =new FileReader();
        reader.readAsDataURL(imgFile);
        const that = this;
        reader.onloadend=function(){  //文件读取结束的时候上传到服务器
          that.results = reader.result;
          that.$vux.loading.show({
            text: '上传中'
          })
          var img = document.querySelector("#img");
          img.src = reader.result;
          var width = img.width;
          var height = img.height;
          var result = compressImg(img,width,height);
          
          that.$emit('sendImgInfo',result);   //将上传的图片以base64形式传给父组件
        }   
      }
     
    },
  }
</script>

<style lang="scss">
  .upload{
    width: 40%;
    height: auto;
    padding-bottom: 0.24rem;
    p{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
      line-height: 12px;
      width: 100%;
      text-align: center;
    }
    .success{
      color:#5FCC28;
    }
    input{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: 11; 
      opacity: 0;   
    }
    .imgs{
      width: 100%;
      height:98px ;
      margin-right: 0.3%;
      position: relative;
      overflow: hidden;
      img{
        width: 100%;
        height:100%;
        position: absolute;
        top:50%;
        left:-50%;
        transform:translate(50%,-50%);
      }
      #img{
        z-index:-1;
      }
      .img{
        display: block;
      }
      span{
        position: absolute;
        width: 20px;
        height: 20px;
        right: 5px;
        /*top:3px;*/
      }
    }
    
  }
</style>