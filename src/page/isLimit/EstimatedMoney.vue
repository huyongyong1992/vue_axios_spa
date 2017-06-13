<template>
    <div class="YuGuEDu">
    <img src="../../images/bg01.png" class="YuGu_pic">
    <div class="YuGuEDu_content">
      <p class="content-text">您的预估额度为</p>
      <p class="content-money">{{EstimatedMoney}}</p>
    </div>
    <div>
    <button class="YuGu_btn" @click="click">立即激活额度</button>
    </div>
    </div>
</template>

<script>
import {getQuery} from '../../config/mUtils'
export default {
  data(){
      return{
          EstimatedMoney:''
      }
  },

  created(){
    this.EstimatedMoney = getQuery('money') *1.5;
    const openId = getQuery('openId');

    // this.accountId = window.localStorage.getItem('accountId');

  },

  components:{
      
  },

  computed:{
      
     
  },

  methods:{
    click() {
      this.$router.push('/login')
    }
  },
}

</script>

<style lang="scss">
body{
  background-color:#fff;
}
.YuGuEDu{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between; 
  position:relative;
  width:100%;
  height:15rem;
}
.YuGu_pic{
  width: 100%;
  height:auto；
  
}
.YuGuEDu_content{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around; 
  position:relative;
  width:5rem;
  height:5rem;
  background-image: linear-gradient(#00E6D3 0%, #00C5CC 99%);
  border-radius:5rem;
  


}
.content-text{
  opacity: 0.8;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 14px;
  text-align: center;


}
.content-money{
  font-family: PingFangSC-Medium;
  font-size: 42px;
  color: #FFFFFF;
  line-height: 42px;
  text-align: center; 
  margin-top:-2.5rem;
  

}
.YuGu_btn{
  height: 44px;
  text-align: center;
  font-size: 16px;
  border-radius: 22px;
  width:5.5rem;
  text-indent: 5px;
  text-decoration: none;
  background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
  color: #fff;
}
    

</style>