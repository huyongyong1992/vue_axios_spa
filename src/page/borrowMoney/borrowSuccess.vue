<template>
<div>
 <head-top headTitle="维粒贷" linkUs="true"></head-top>
    <div class="borrowSuccess">
    <div></div>
    <div class="borrowSuccess_content">
    <span class="one" ><img src="../../images/icon_td_1.png"><br>急速体现</span>
    <span class="two"><img src="../../images/icon_td_3.png"><br>超低月息</span>
    <span class="tree"><img src="../../images/icon_td_2.png"><br>超高额度</span>
      <p class="content-text">您的可借额度为</p>
      <p class="content-money">{{limitMoney}}</p>
    </div>
    <div>
    <button class="borrowSuccess_btn" @click="click">立即借款</button>

    </div>
    <div ></div>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/header/head";
import { getCheckResult }from '../../service/getData';
import { customToast } from '../../config/mUtils' ;


export default {
    data(){
        return{
        limitMoney:'',
        openId:'',
        accountId:''
        }
    },

    created(){
        this.openId = window.localStorage.getItem('openId');
        this.accountId = window.localStorage.getItem("accountId");
        this.loanMoney()
    },

    components:{
       headTop 
    },

    computed:{
        
       
    },

    methods:{
      click() {
       this.$router.push('/waitingLink')
    },
      loanMoney(){
       getCheckResult({
        accountId:this.accountId,
      }).then((data)=>{
        if(data.error.error) {
          customToast(data);
          return ;
        }
        this.limitMoney =data.data.orderPreview.loanMoney;
      })
      }
    },
}

</script>

<style lang="scss">
body{
  background-color:#fff;
}
.borrowSuccess{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between; 
  position:relative;
  width:100%;
  height:15rem;
}
.borrowSuccess_pic{
  width: 100%;
  height:auto;
  
}
.borrowSuccess_content{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around; 
  position:relative;
  width:7rem;
  height:7rem;
  background-image: linear-gradient(#00E6D3 0%, #00C5CC 99%);
  border-radius:7rem;
  text-align: center;
  border:40px solid #f5f5f5;
  


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
.borrowSuccess_btn{
  height: 44px;
  text-align: center;
  font-size: 16px;
  border-radius: 22px;
  width:5.5rem;
  text-indent: 5px;
  text-decoration: none;
  background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
  color: #fff;
  margin-top:-1rem;
}
.one{
    position:absolute;
    left: 1.8rem;
    top: -2rem;
    font-size: 12px;
    color: #00CCC2;
    line-height: 12px;
    img{
        width:1.2rem;
        height:auto;
    }
}
.two{
    position:absolute;
    left: 5rem;
    top: 3rem;
    font-size: 12px;
    color: #00CCC2;
    line-height: 12px;
    img{
    width:1.3rem;
    height:auto;
}
}
.tree{
    position:absolute;
    left: -1.5rem;
    top: 3rem;
    font-size: 12px;
    color: #00CCC2;
    line-height: 12px;
    img{
    width:1.2rem;
    height:auto;
}
}

    

</style>






<!-- <template>
  <div class="borrowSuccess">
   <div class="isLimit">
      <p>您的预估额度为:</p>
      <p class="money">{{isHaveLimit}}</p>
    </div>
    <div class="middleDesc">
      <div>
        <img src="../../images/elmlogo.jpeg" />
        <p>急速提现</p>
      </div>
      <div>
        <img src="../../images/elmlogo.jpeg" />
        <p>超低月息</p>
      </div>
      <div>
        <img src="../../images/elmlogo.jpeg" />
        <p>超高额度</p>
      </div>
    </div>
   <router-link :to="'getLimit/personalAuthentication/'"><x-button type="primary">立即激活额度</x-button></router-link>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { reSet} from '../../service/getData';
  import { XButton } from 'vux'
  export default {
    data(){   //初始化
      return{
        data:{},
        count:0,
        login:{},
        limit:'',
        isHaveLimit:''
      }
    },

    created(){//DOM挂载之后执行
      this.getIt()
      
      
    },

    components:{//组件import后需要在这里挂载
      XButton
    },

    // computed:mapState({ //绑定store中的state
    //   data: state => state.data
       
    // }),

    methods:{
      async getIt() {
        await reSet({
          name:'yong'
        }).then((data) =>{
          this.isHaveLimit =data.limit
        })
       
      },
    

    },
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  button{
    padding:5px 10px;
  }
   .weui-btn{
    width:80%;
  } 
  .isLimit{
    text-align:center;
    width:100%;
    height: 300px;
    font-size: 20px;
    display:flex;
    justify-content:center;
    align-items:center;

    
    .money{
      color:#f00;
    }
  }
  img{
    width:40px;
  }
  .middleDesc{
    width:100%;
    height: 100px;
    display:flex;
    justify-content:space-around;
    align-content: flex-start;


  }

</style> -->