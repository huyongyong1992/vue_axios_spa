<template>
<!--基于VUX X-INPUT封装,所以使用时请包裹在group标签中-->
  <x-input title="发送验证码" class="weui-vcode" @on-change="smsCodeChange" placeholder="请输入短信验证码" v-model="smsCode">
    <span slot="label" class="iconfont icon-icon_dxyz" v-if="isImgShow"></span>
    <span slot="label" class="sendCode">发送验证码</span>
    <button slot="right" @click='btnClick' :disabled='isDisabled' :class=" [btn ? 'grayBtn' : 'btn','btn']">{{value}}</button>
  </x-input>
</template>

<script>
  import { XInput,Group } from 'vux';
  import { getSmsCode } from '../service/getData';
  import { customToast } from '../config/mUtils'
  export default {
    data(){
        return{
          time: this.startNo, //初始化time为props中的startNo
          value:'获取',
          isDisabled:false,
          data:{},
          smsCode:this.defaultVal,
          btn:false
        }
    },

    created(){
      this.smsCode = this.defaultVal
    },
    props:[
      'startNo',  //父组件必须传初始计数值
      'defaultVal', //保存草稿后，默认值
      'phoneNo',   //父组件传过来的电话号码
      'isImgShow',   //父组件传过来的是否显示左边图片,不传默认为false
      'imgCode' //图形验证码
    ],  
    components:{
      XInput,Group
    },

    computed:{ 
    },

    methods:{
      btnClick() {  //点击开启倒计时
        getSmsCode({
          mobile:this.phoneNo,
          verifyCode:this.imgCode
        }).then(data =>{
          if(data.error.error){
            customToast(data);
            return ;
          }
        })
        this.countDown();
        
      },
      smsCodeChange(val) {
        this.smsCode = val;
        this.$emit('sendSmsCode',this.smsCode); //向父组件传递输入的验证码
      },
      countDown() {
        const that = this;
        let timer = setInterval(function(){
          that.time -=1;
          that.value = that.time + 's后重发'; //更改显示内容
          that.btn = true;   //字的颜色变灰
          that.isDisabled = true;   //倒计时中不允许再次点击
          if(that.time == 0) {
            clearInterval(timer); //清除定时器
            that.time = that.startNo; //重设
            that.value = '重新发送';
            that.btn = false;
            that.isDisabled = false;
          }
        },1000)
       
      },
      
    },
  }
</script>

<style lang="scss">
    .weui-cell__hd{
      display: flex;
    }
    .btn{
      color:#00BBCC;
      font-family: PingFangSC-Regular;
      background-color: #fff;
      border:none;
    }
    .icon-icon_dxyz{
      font-size:14px;
    }
    .grayBtn{
      color:#B3B3B3;
    }
    .weui-cells{
      margin-top:0;
    }
    

</style>
