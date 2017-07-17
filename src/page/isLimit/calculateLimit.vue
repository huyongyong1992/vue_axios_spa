<template>
    <div>
      <head-top :headTitle="title" linkUs="true" style="width:100%;"></head-top>
    <!-- 计算额度等待页 -->
    <section v-if="page===1" class="calulateLimit">
      <div class="calulateLimit">
       <img src="../../images/img_ddyz.png" class="calulateLimit_pic">
       <p class="content">维粒贷正在验证您的信息~<br>
        这可能需要<em style="color:#f00;">10-15</em>分钟时间，请您耐心等待~
        计算完成后我们会短信通知您哒~
       </p>
       <button class="refresh_btn" @click="loading" :disabled="isDisabled">刷新一下</button>
      </div>
    </section>
    <!-- 授信通过页 -->
    <section v-if="page===2">
      <div class="applySuccess">
        <img src="../../images/img_tg.png" class="applySuccess_pic">
        <p class="Success_content">恭喜您！您的可借额度为</p>
        <em class="sc">{{isMoney}}</em><!-- 接口 -->
        <router-link :to="'/uploadDebt'">
          <button class="Success_btn">立即借款</button>
        </router-link>
      </div>
  
    </section>
    <!-- 授信拒绝(信用不通过) -->
    <section v-if="page===3">
      <div class="applyFail">
         <img src="../../images/img_jj.png" class="applyFail_pic">
         <p class="Fail_content">很抱歉，根据您的信用情况，维粒贷暂时无法为您激活额度，30天后您可以再次尝试~</p>
      </div>
    </section>
    
   </div>
</template>
<script>
import headTop from "../../components/header/head";
import { loanMoney} from "../../service/getData";
import { removeStore,customToast } from '../../config/mUtils' ;
export default {
  data(){
    return{
      isDisabled:false,
      page: 1,
      accountId:'',
      isMoney:'',
      title:'计算额度'
    }
  },

  created(){
    const orderId = window.localStorage.getItem("orderId");
    //预审结果
    loanMoney({
      orderId:orderId,
    }).then((data)=>{
      if(data.error) {
        customToast(data);
        return ;
      }
      if(data.data.loanMoney !==0 && data.data.applyStep === 600) { //授信通过
        this.page = 2;
        this.isMoney = data.data.loanMoney;
        this.title = '授信通过'
      }else if(data.data.applyStep === 500){  //审核中
        this.page = 1;
        this.title = '计算额度'
      }else{
        this.page = 3;
        this.title = '授信拒绝'
      }
      
    })
  },

  components:{
      headTop
  },

  methods:{
    loading(){
      this.$vux.loading.show({
        text:'查询中...'
      });
      this.isDisabled = true;
      setTimeout(() => {
        this.$vux.loading.hide();
        this.isDisabled = false;
       //刷新请求
        loanMoney({
          orderId:this.orderId,
        }).then((data)=>{
          if(data.error) {
            customToast(data);
            return ;
          }
          if(data.data.loanMoney) { //授信通过
            this.page = 2;
            this.isMoney = data.data.loanMoney
          }else{  //授信不通过
            this.page = 1;
          }
        })
      }, 5000);
    }
    
   
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
