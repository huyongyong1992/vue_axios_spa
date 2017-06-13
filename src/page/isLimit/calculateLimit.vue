<template>
    <div>
    <!-- 计算额度等待页 -->
    <section v-if="page==1" class="calulateLimit">
      <head-top headTitle="计算额度" linkUs="true" style="width:100%;"></head-top>
      <div class="calulateLimit">
       <img src="../../images/img_ddyz.png" class="calulateLimit_pic">
       <p class="content">维粒贷正在验证您的信息~<br>
       这可能需要<em style="color:#f00;">10-15</em>分钟时间，请您耐心等待~
       计算完成后我们会短信通知您哒~</p>
       <button class="refresh_btn" @click="loading" :disabled="isDisabled">刷新一下</button>
      </div>
    </section>
    <!-- 授信通过页 -->
    <section v-if="page==2">
     <div>
      <head-top headTitle="授信成功" linkUs="true"></head-top>
      <div class="applySuccess">
       <img src="../../images/img_tg.png" class="applySuccess_pic">
       <p class="Success_content">恭喜您！您的可借额度为</p>
       <em class="sc">{{isMoney}}</em><!-- 接口 -->
       <router-link :to="'/borrowSuccess?from=success+limitM=this.isMoney'">
           <button class="Success_btn">立即借款</button>
       </router-link>
      </div>
     </div>
    </section>
    <!-- 授信拒绝(信用不通过) -->
    <section v-if="page==-3">
     <div>
      <head-top headTitle="授信拒绝" linkUs="true"></head-top>
      <div class="applyFail">
         <img src="../../images/img_jj.png" class="applyFail_pic">
         <p class="Fail_content">很抱歉，根据您的信用情况，维粒贷暂时无法为您激活额度，30天后您可以再次尝试~</p>
      </div>
    </div>
    </section>
    <!-- 授信拒绝(签名不通过) -->
    <!-- <section v-if="page==4">
     <div>
      <head-top headTitle="授信拒绝" linkUs="true"></head-top>
      <div class="applyFail">
       <img src="../../images/img_jj.png" class="applyFail_pic">
       <p class="Fail_content">
       很抱歉，您的个人信息授权书签名不清晰，请使用正楷再次签名！</p>
      </div>
      <button class="Fail_btn" @click="Resign">重新签名</button>
     </div>
    </section> -->
   </div>
</template>
<script>
import headTop from "../../components/header/head";
import { getCheckResult} from "../../service/getData";
import { removeStore } from '../../config/mUtils' ;
import { customToast } from '../../config/mUtils' ;
export default {
    data(){
      return{
        isDisabled:false,
        page: 1,
        accountId:'',
        isMoney:''

      }
    },

  created(){
       
        this.accountId = window.localStorage.getItem("accountId");
        this.requeStatus() //预审结果
    },

    components:{
       headTop 
    },

    computed:{
        
       
    },

  methods:{
    loading(){
      this.$vux.loading.show({
      text:'loading'
    });
      this.isDisabled = true;
      setTimeout(() => {
       this.$vux.loading.hide();
       this.isDisabled = false;
       //刷新请求
      getCheckResult({
        accountId:this.accountId,
      }).then((data)=>{
        if(data.error.error) {
          customToast(data);
           return ;
        }
        this.page = data.data.orderStatus;
        this.isMoney = data.data.orderPreview.loanMoney;
        if(this.page===2){
          this.removeStore("savingCardDraft");
          this.removeStore("bankCardDraft");
        }
      })
      }, 5000);

  },
    requeStatus(){
      getCheckResult({
        accountId:this.accountId,
      }).then((data)=>{
        if(data.error.error) {
          customToast(data);
          return ;
        }
        this.page = data.data.orderStatus;
        this.isMoney = data.data.orderPreview.loanMoney;
      })
    },
    //重新签名
    // Resign(){
    //   this.$route.push('/')
    // },
  }
}

</script>

<style lang="scss">
 body{
  background-color: #fff;
 }
.calulateLimit_pic{
  margin-top:1rem;
  width:80%;
  height:auto;
  text-align:center; 
  position:relative;
}

.calulateLimit{
  width:100%;
  height:15rem;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around; 
  position:relative;
}
.content{
  width:7.3rem;
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
.refresh_btn{
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
.refresh_btn[disabled]{
  background:#f3f3f3;
  color: #fff;
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
.Success_content{
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


.applyFail_pic{
  margin-top:1rem;
  width:80%;
  height:auto;
  text-align:center; 
  position:relative;
}

.applyFail{
  width:100%;
  height:10rem;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around; 
  position:relative;
}
.Fail_content{
  width:6rem;
  height:auto;
  text-align:left;
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
  margin-top:-1.5rem;
  
}
.Fail_btn{
  height: 44px;
  text-align: center;
  font-size: 16px;
  border-radius: 22px;
  width:5.5rem;
  text-indent: 5px;
  text-decoration: none;
  background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
  color: #fff;
   margin-left: 2rem;
   margin-top:1.5rem;
}



</style>
