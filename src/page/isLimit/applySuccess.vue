
<template>

    <div>
    <head-top headTitle="授信成功" linkUs="true"></head-top>
    <div class="applySuccess">
    
       <img src="../../images/img_tg.png" class="applySuccess_pic">
       <p class="content">恭喜您！您的可借额度为</p>
       <em class="sc">60000</em><!-- 接口 -->
       <router-link :to="'/borrowSuccess?from=success'">
           <button class="Success_btn">立即借款</button>
       </router-link>
    </div>
    </div>
</template>

<script>
import headTop from "../../components/header/head";
export default {
    data(){
        return{
            
        }
    },

	mounted(){
        
    },

    components:{
       headTop 
    },

    computed:{
        
       
    },

    methods:{
        
    },
}

</script>

<style lang="scss">
 body{
  background-color: #fff;
 }
.applySuccess_pic{
  margin-top:1rem;
  width:80%;
  height:auto;
  text-align:center; 
  position:relative;
}

.applySuccess{
  width:100%;
  height:15rem;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around; 
  position:relative;
}
.content{
  width:10rem;
  height:auto;
  text-align:center;
  color:#000;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  position:relative;
 
  }
.sc{
  
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #FFA94D;
  letter-spacing: 0;
  line-height: 24px;
  margin-top:-1.8rem;
  
}
.Success_btn{
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
