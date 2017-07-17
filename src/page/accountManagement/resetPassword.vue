<template>
    <div class="resetPasswordContainer">
       <!--  重置密码页面<br /> -->
        <head-top headTitle="重置密码"></head-top>

        <group>
          <x-input type="password" placeholder="请重新设置登录密码" v-model="password" @on-blur="blurTestPassword">
            <span slot="label"  class="iconfont icon-icon_dlmm"></span>
            <span slot="label">登录密码</span>
          </x-input>

          <x-input title="确认密码" type="password" placeholder="再次输入登录密码" v-model="password_again" :equal-with="password">
            <span slot="label"  class="iconfont icon-icon_qrmm"></span>
            <span slot="label">确认密码</span>
          </x-input>
        </group>

        <button class="reset_btn " @click="onConfirm" :disabled="password===''|| password_again==='' || !passwordReg.test(password) || password !=password_again"> 确认 </button>

    </div>
</template>

<script>
    import headTop from "../../components/header/head";
    import { resetPassword } from '../../service/getData';
    import {customToast,getQuery} from '../../config/mUtils';
    import { XInput, Group, XButton } from 'vux'
    export default {
        data(){
          return {
            password_again:'',
            password:'',
            passwordReg:/[0-9A-Za-z]{8,12}/
          }
        },
        created(){
          this.mobile = getQuery('mobile')
        },
        components: {
           headTop,XInput, Group, XButton
        },
        computed: {

        },
       methods: {
            onConfirm() {
              resetPassword({
              password:this.password,
              mobile:this.mobile
            }).then((data) =>{
              if(data.error) {
                customToast(data);
                return
              }
              this.$router.push('/resetSuccess')
            })
          },
            blurTestPassword(){
              if(!this.passwordReg.test(this.password)){
              this.$vux.toast.show({
                text: '密码必须是6-16位字母和数字',
                type: 'text',
                width:'80%',
                position:'top',
                time:1000
              })
              return ;
            }
          },
        }
    }

</script>

<style lang="scss">

.resetPasswordContainer{
  .weui-cells{
    margin-top:0;
  }
  .weui-cell__hd{
    display:flex;
    justify-content:flex-start;
    align-items: center;
    font-size:14px;
    .iconfont{
      margin-right:10px;
      color:#6CD9D4;
    }
    .icon-icon_tpyz{
      font-size:12px;
    }
    .icon-icon_sjhm{
      font-size:19px;
    }
  }
  .vux-x-input{
    height:1.2rem;
  }
  input{
    font-size: 14px;
    margin-left:0.4rem;
  }
  .reset_btn{
    display: block;
    height: 1.2rem;
    font-size: 16px;
    border-radius: 0.6rem;
    width: 56%;
    background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
    color: #fff;
    margin-top: 1.49rem;
    margin-left:22%;
  }

.reset_btn[disabled] {
  background-color: #CFCFCF;
  color: #FFF;
}
}
</style>
