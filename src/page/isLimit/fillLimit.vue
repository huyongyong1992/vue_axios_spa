<template>
	<div class="fillLimit">
  <img src="../../images/bg01.png" class="fillLimit_headPic">
    <p>请填写您的微粒贷额度</p>
    <!--输入限制，最多7位-->
    <input type="number" name="limit-number" class="limit-number"  v-model="limit" oninput="if(value.length>5)value=value.slice(0,7)" placeholder="请输入500到300000之间的数额"   />
    <button class="limit_btn"  :disabled="limit<500 || limit>300000 || isDisabled" @click="loading">测算我的维粒贷额度</button> 
    <!-- <button class="limit_btn" @click="loading" :disabled="isDisabled">测算我的维粒贷额度</button> -->
  </div>
</template>

<script>
import { saveLimit } from '../../service/getData';
import { customToast } from '../../config/mUtils' ;
export default {
  data(){
    return{
      limit:'',
      isDisabled:false
      
    }
  },

  created(){
  this.openId = window.localStorage.getItem('openId');
  },

	mounted(){
      
  },

  components:{
     
  },

  computed:{
      
     
  },

  methods:{ 
    loading() {       //测算维粒贷额度
      this.$vux.loading.show({
        text:'测算中'
      });
      this.isDisabled = true;
      saveLimit({      //保存微粒贷额度
        openId: this.openId,
        loanmoney:this.limit
      }).then((data)=>{
        if(data.error.error){
          customToast(data);
          return ;
        }
        console.log(data);
        setTimeout(() => { 
          this.$vux.loading.hide();
          this.isDisabled = false;
          this.$router.push('/EstimatedMoney?money='+this.limit); // 微粒贷额度传到测算结果页面
        }, 5000);
      })
    },
  },
}

</script>

<style lang="scss">
  body{
    background-color:#fff;
  }
  .fillLimit{
    text-align:center;
    .fillLimit_headPic{
      width:100%;
      height:auto;
    }
    p{
      width: 100%;
      padding:0;
      font-size:14px;
      color:#666;
      font-family:'PingFangSC-Regular';
      text-align: center;
      padding-top:1.1rem;
    }
    .limit-number{
      width:80%;
      color:#666;
      font-size:12px;
      border-radius:35px;
    }

    input{
      width: 92%;
      margin:0 4%;
      text-align: center;
      height:1.4rem;
      border-radius: 4px;
      font-size:20px;
      margin-top:0.55rem;
      border:1px solid #E1E1E1;
    }
      .limit_btn{
      height: 44px;
      text-align: center;
      font-size: 16px;
      border-radius: 22px;
      width:5.5rem;
      text-indent: 5px;
      text-decoration: none;
      background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
      color: #fff;
      margin-top:2.8rem;
}
.limit_btn[disabled]{
  background:#f3f3f3;
  color: #fff;
}
 }
 
</style>
