<template>
  <div class="uploadDebt">
    <header-top headTitle="上传借据"></header-top>
    <p class="uploadTitle">上传您的微粒贷借据后即可借款</p>
    <div class="in-uploadDedt">
        <div  class='upload-pic' >
          <img :src="DebtImg" v-if="DebtImg"  class="successPic">
          <img src="../../images/icon_jiahao2@3x.png"  class="debt-pic" v-else>
          <input @change='addDebtImg'  type="file" accept="image/*" capture="camera" >
        </div>
        <w-button @click="toBorrowMoney" style="margin:0.6rem 0 1rem 0;" :disabled="DebtImg=== ''">下一步，立即借款</w-button>
    </div>

    <div class="explain">
      <h2 class="explainTitle">上传说明</h2>
      <p class="explainText">1、微信用户，打开微信→我→钱包→微粒贷→借款记录→借款借据，截图保存，上传即可</p>
      <img class="explainPic" src="../../images/pic_scsm@3x.png">
      <p class="explainText">2、QQ用户，打开QQ→我→QQ钱包→资金理财→微粒贷→借款记录→借款借据，截图保存，上传即可</p>
      <img class="explainPic" src="../../images/pic_scsm2@3x.png">
    </div>

  </div>
</template>

<script>
import headerTop from '../../components/header/head';
import wButton from '../../components/wButton';
import { uploadDebt } from '../../service/getData'
import {customToast,getStorage,compressImg } from '../../config/mUtils';
import {Divider} from 'vux'
export default {
  data(){
    return{
      DebtImg:'',
      disabled:true,
    }
  },

  mounted(){

  },

  components:{
    headerTop,wButton,Divider
  },

  computed:{
  },

  methods:{
    addDebtImg(event){ //上传借据照片
      var imgFile=event.target.files[0];
      //判断类型是不是图片
      if(!/image\/\w+/.test(imgFile.type)){
        alert("请确保文件为图像类型");
        return false;
      }
      var reader =new FileReader();
      reader.readAsDataURL(imgFile);
      var that=this;
      reader.onloadend=function(){  //文件读取结束的时候上传到服务器
        // const orderId = window.localStorage.getItem("orderId");
        that.$vux.loading.show({
          text: '上传中'
        })
        var img = new Image();
        img.src = reader.result;
        let width = document.querySelector(".upload-pic img").offsetWidth;
        let height = document.querySelector(".upload-pic img").offsetHeight;
        var result = compressImg(img,width,height); //压缩后的图片base64码
        //调用上传接口
        uploadDebt({
          orderId:69,
          wechatIouBase64:reader.result.split(",")[1]
        }).then((data) =>{
          if(data.error) {
            that.$vux.loading.hide();
            customToast(data) ;
            return ;
          }

          that.$vux.loading.hide();
          that.DebtImg = reader.result;
        })
      }
    },
    toBorrowMoney(){
      this.$router.push('../gatheringAccount')
    }
  },

  }
</script>

<style lang="scss" scoped>
.uploadDebt{
  .uploadTitle{
    font-size:14px;
    height:1.2rem;
    line-height:1.2rem;
    padding: 0 0.5rem;
    color: #333333;

  }
  .in-uploadDedt{
    display:flex;
    flex-direction:column;
    align-items: center;
    align-content:center;
    background: #fff;
    .upload-pic{
      width: 8.4rem;
      height: 4.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border:#00ccc2 dashed 2px;
      border-radius: 0.2rem;
      margin-top:0.8rem;
      overflow: hidden;
      input{
        position: absolute;
        top: 100px;
        left: 0px;
        width: 100%;
        height: 30%;
        z-index: 11;
        opacity: 0;
      }
      .successPic{
        width:100%;
      }
    }
    p{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
      line-height: 12px;
      width: 100%;
      text-align: center;
    }

  }
  .explain{
    display:flex;
    flex-direction:column;

    padding:0 4%;
    background:#fff;
    margin-top:0.2rem;
    .explainTitle{
      font-size:14px;
      text-align: left;
      height:40px;

      font-weight:600;
      color: #00CCC2;
      letter-spacing: 0;
      line-height: 40px;
    }
    .explainPic{
      width:100%;
      height:auto;
    }
    .explainText{
      margin:20px 0;
      width:9rem;
      font-size:12px;
      text-align:left;
      color: #999999;
      letter-spacing: 0;
      line-height: 19px;
    }
  }
}
</style>
