<template>
  <div class="personalAuthentication">
    
    <group>
      <cell title="工作城市" :value="city" is-link @click.native="toSelectCity"></cell>

      <popup-picker
        title="教育程度"
        :data="edus"
        v-model="edu"
        ref="edu"
        show-name
        :columns="1"
        @on-change="onEduChange"
        placeholder="请选择教育程度">
      </popup-picker>

      <popup-picker
        title="婚姻状况"
        :data="marries"
        v-model="marry"
        :columns="1"
        show-name
        ref="marry"
        @on-change="onMarryChange"
        placeholder="请选择婚姻状况">
      </popup-picker>

      <popup-picker
        title="职业类别"
        :data="jobs"
        v-model="job"
        :columns="1"
        ref="job"
        show-name
        @on-change="onJobChange"
        placeholder="请选择职业">
      </popup-picker>

      <x-input
        title="月收入"
        placeholder="请输入月收入工资"
        :show-clear="true"
        required
        type="number"
        :max="5"
        text-align="right"
        v-model="cardSalary" >
        <span slot="right" style="padding-left:10px;">元</span>
      </x-input>
    </group>
    <div class="uploadImg">
      <p>请拍摄身份证照片</p>
      <div class="upload">
        <div  class='imgs' >
          <img :src="faceImg" v-if="faceImg">
          <img src="../../../images/idCardFace.png" v-else>
          <input @change='addFaceImg'  type="file" accept="image/*" capture="camera" >
        </div>
        <p :class="[faceImg  ? 'success' : '']">{{faceImg ? '上传成功' : '请拍摄身份证正面'}}</p>
      </div>
      <div class="upload">
        <div  class='imgs' >
          <img :src="backImg" v-if="backImg">
          <img src="../../../images/idCardBack.png" v-else>
          <input @change='addBackImg'  type="file" accept="image/*" capture="camera" >
        </div>
        <p :class="[backImg  ? 'success' : '']">{{backImg ? '上传成功' : '请拍摄身份证反面'}}</p>
      </div>
      <div class="upload">
        <div  class='imgs' >
          <img :src="handImg" v-if="handImg" >
          <img src="../../../images/idCardHand.png" v-else >
          <input @change='addHandImg'  type="file" accept="image/*" capture="camera" >
        </div>
        <p :class="[handImg  ? 'success' : '']">{{handImg ? '上传成功' : '请拍摄手持身份证照'}}</p>
      </div>
    </div>
<!-- 图片上传成功或显示 -->
    <div v-if="faceImg">
      <group>
        <cell  title="姓名"  is-link>
          <input slot="value" v-model="name"  class="idCardName" placeholder="请输入姓名">
        </cell>
        <cell  title="证件号" :value="cardNo"></cell>
        <cell  title="户籍地址"  is-link>
          <textarea slot="value" v-model="address"  class="idCardName" placeholder="请输入户籍地址"></textarea>
        </cell>
      </group>
    </div>
    <x-button  @click.native="onSubmit" :disabled="name === '' || city === '' || edu===[] || marry===[] || job===[] || faceImg==='' || backImg==='' || handImg==='' || cardSalary===''">下一步</x-button>
    <div>
      <confirm v-model="showComfirm"
        title="请核对您的基本信息"
        @on-confirm="onConfirm"
        cancel-text="修改">
          <div class="info"><span>姓名</span><span class="right">{{name}}</span></div>
          <div class="info"><span>身份证号</span><span class="right">{{cardNo}}</span></div>
          <div class="info"><span>工作城市</span><span class="right">{{city}}</span></div>
          <div class="info"><span>教育程度</span><span class="right">{{$refs.edu&&$refs.edu.getNameValues()}}</span></div>
          <div class="info"><span>婚姻状况</span><span class="right">{{$refs.marry&&$refs.marry.getNameValues()}}</span></div>
          <div class="info"><span>职业类别</span><span class="right">{{$refs.job&&$refs.job.getNameValues()}}</span></div>
          <div class="info"><span>进卡工资</span><span class="right">{{cardSalary}}</span></div>
          <div class="info"><span>户籍地址</span><span class="right">{{address}}</span></div>
      </confirm>
    </div>
  </div>
</template>

<script>
  import{ XButton,Group,PopupPicker,Cell,XInput,XHeader,Confirm } from 'vux';
  import {getQuery,customToast,getStorage,compressImg } from '../../../config/mUtils'
  import { getDictionaries,uploadFacePic,uploadBackPic,uploadHandPic,getIdCardInfo,getOrder,saveOrderInfo } from '../../../service/getData'

  import headerTop from '../../../components/header/head';
  export default {
    data() {
      return{
        city:'',
        edu:[],
        edus:[],
        marry: [],
        marries:[],
        job:[],
        jobs:[],
        cardSalary:'',
        orderId:'',
        showComfirm:false,
        name: '',
        cardNo: '',
        isShow:false,
        faceImg:'',
        backImg:'',
        handImg:'',
        address:'',
        result:''
      }
    },
    mounted() {
      this.$store.state.authTitle = '身份认证';
      //获取数据字典
      getDictionaries().then((data) =>{
        this.edus = data.data.education;
        this.marries = data.data.marriage;
        this.jobs = data.data.occupationalClass;
      })
     
      this.city = getQuery('city') || '请选择工作城市';
      // if(getQuery('city')) {  //如果是从城市选择页回来，则读取localStorage中的数据
      //   const personalDraft = JSON.parse(getStorage('personalDraft'));
      //   this.cardSalary = personalDraft.cardSalary
      //   this.edu = personalDraft.edu;
      //   this.marry = personalDraft.marry;
      //   this.job = personalDraft.job;
      //   return;   //从城市选择回来不再往下执行
      // }
      this.$vux.loading.show({
        text: '图片加载中...'
      })
      const accountId = window.localStorage.getItem('accountId');
      
      getOrder({  //根据accountId获取orderId
        accountId:accountId
      }).then((data) =>{
        
        if(data.error){
          customToast(data)
          return ;
        }
        this.city = data.data && data.data.workCity  || '请选择工作城市';   //获取上次填写的城市名
        this.edu[0] = data.data&& data.data.education || '';  //获取上次填写的教育程度
        console.log(this.edu)
        this.marry[0] = data.data && data.data.marriage || '';   //获取上次填写的婚姻状况
        this.job[0] = data.data && data.data.profession || '';   //获取上次填写的工作情况
        this.cardSalary = data.data && data.data.salary || '';   //获取上次填写的薪水
        // console.log(this.edu)
        this.orderId = data.data && data.data.orderId || '';
        window.localStorage.setItem('orderId',this.orderId);
        getIdCardInfo({ //获取身份证信息
          orderId:this.orderId
        }).then(data =>{
          this.$vux.loading.hide();
          this.faceImg = data.data && data.data.idcardImageObverseBase64;
          this.backImg = data.data && data.data.idcardImageReverseBase64;
          this.handImg = data.data && data.data.holdingIdcardBase64;
          this.name =  data.data &&data.data.custName;
          this.cardNo = data.data && data.data.idCardNo;
          this.address = data.data && data.data.houseAddress;
        })
      })

    },

    components:{
      XButton,Group,PopupPicker,Cell,XInput,XHeader,Confirm,headerTop
    },

    computed:{

    },

    methods:{
      toSelectCity() {
        const draft = {
          edu:this.edu,
          marry:this.marry,
          job:this.job,
          cardSalary:this.cardSalary
        }
        
        localStorage.setItem('personalDraft',JSON.stringify(draft));
        this.$router.push('/cityPicker?from=auth');
      },

      addFaceImg(event){ //上传身份证正面图片
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
         	const orderId = window.localStorage.getItem("orderId");
          that.$vux.loading.show({
            text: '上传中'
          })
          var img = new Image();
          img.src = reader.result;
          setTimeout(function() {
            let width = img.naturalWidth;
            let height = img.naturalHeight;
            that.result = compressImg(img,width,height)

          },500)
    
          uploadFacePic({
             idcardImageObverseBase64:this.result.split(",")[1],  //只需要，后面的信息
             orderId:orderId
           }).then((data) =>{
            that.$vux.loading.hide();
             //上传成功回调，响应身份证号，姓名
            if(data.error){
              that.$vux.loading.hide();
              customToast(data)
              return ;
            }
            that.cardNo = data.data.cardNo;
            that.name = data.data.name;
            that.address = data.data.address;
            that.faceImg = reader.result;
           })
        }
      },
      addBackImg(event){ //上传身份证反面图片
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
          const orderId = window.localStorage.getItem("orderId");
         	that.$vux.loading.show({
            text: '上传中'
          })
          var img = new Image();
          img.src = reader.result;
          setTimeout(function() {
            let width = img.naturalWidth;
            let height = img.naturalHeight;
            that.result = compressImg(img,width,height)
          },500)
          uploadBackPic({
            idcardImageReverseBase64:this.result.split(",")[1],
            orderId:orderId
          }).then((data) =>{
            //成功回调
            that.$vux.loading.hide();
            if(data.error){
              customToast(data)
              return ;
            }

            that.backImg = reader.result;
          })
        }
      },
      addHandImg(event){ //上传图片
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
          const orderId = window.localStorage.getItem("orderId");
         	that.$vux.loading.show({
            text: '上传中'
          });
          var img = new Image();
          img.src = reader.result;
          setTimeout(function() {
            let width = img.naturalWidth;
            let height = img.naturalHeight;
            that.result = compressImg(img,width,height)
          },500)
         
          uploadHandPic({
            facebase64:this.result.split(",")[1],
            orderId:orderId
          }).then((data) =>{
            that.$vux.loading.hide()
            if(data.error){
              customToast(data)
              return ;
            }
            that.handImg = reader.result;
          })

        }
      },
      onSubmit() {  //提交表单
        this.showComfirm = true;
      },
      onConfirm() { //确认信息
        const accountId = window.localStorage.getItem('accountId');
        const orderId = window.localStorage.getItem('orderId');
        saveOrderInfo({
          accountId:accountId,
          orderId: orderId,
          city:this.city,
          education:this.edu[0],
          marriage:this.marry[0],
          profession:this.job[0],
          salary:this.cardSalary,
          customerName:this.name,
          houseHoldAddress:this.address,
          idCard:this.cardNo
        }).then((data) =>{
          console.log(data)
          if(data.error) {
            customToast(data)
            return ;
          }
          this.showComfirm = false;
          // window.localStorage.removeItem('personalDraft')
          this.$router.push('/getLimit/mobileAuth')
        })

      },

      onEduChange(val) {
        this.edu[0] = val;
      },
      onMarryChange(val) {
        this.marry[0] =val;
        console.log(this.marry[0])
      },
      onJobChange(val) {
        this.job[0] = val;
      },

    },
  }

</script>

<style lang="scss">
  .weui-toast{
    width:40% ;
  }
  .personalAuthentication {
    
    .vux-cell-primary{
      white-space:nowrap ;
    }
    .vux-label{
      text-align:left !important;
    }

    .weui-cells{
      margin-top:0;
      font-size:14px;
    }
    .weui-label{
      text-align:left !important;
    }

    .idCardName{
      text-align: right;
      min-width: 5rem; 
    }

    /*图片上传*/
    .uploadImg{
      display:flex;
      margin-top:5px;
      flex-flow:row wrap;
      justify-content:space-around;
      background-color: #fff;
      p{
        width: 96%;
        padding-left:4%;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        line-height: 14px;
        margin: 0.2rem 0;
      }

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
          position: absolute;
          top:50%;
          left:-50%;
          transform:translate(50%,-50%);
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
    button{
      width: 56% !important;
      margin:0 22%;
      color:#fff;
      background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
      border-radius:0.6rem;
      height:1.2rem;
      margin-top:3.6%;
    }
    button[disabled]{
      background: #CFCFCF;
    }
    /*确认框样式*/
    .weui-dialog{
      top:50px;
      transform: translate(-50%,0)
    }
    .weui-dialog__btn_primary {
      color: #00BBCC;
      font-size: 14px;
    }
    .weui-dialog__btn_default{
      color:#999;
      font-size:14px;
    }
    .weui-dialog__hd{
      padding: 0.83rem 0;
    }
    .info{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom:0.55rem;
      span{
        display: block;
        min-width:70px;
        max-width:160px;
      }
      .right{
        text-align: right;
      }
    }
  }


</style>
