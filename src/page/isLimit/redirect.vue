<template>
    <div class="firstContainer">
      <img class="success_pic" src="../../images/img_qred@3x.png">
      <article >请确认您有微粒贷额度，<br/>并已使用且正常还款至少一期哦！
      </article>
      <footer class="footer">
      <button class="checkNoBtn" @click="toLogin">我没有</button>
      <button class="checkYesBtn" @click="Yes">我有且已使用</button>
      </footer>
      <p class="tips">温馨提示：如您没有微粒贷额度，我们将为您推荐其他产品。</p>
    </div>
</template>

<script>
  import { getQuery,customToast } from '../../config/mUtils';
  import { getOpenId ,searchLimit,getToken} from '../../service/getData';

  export default {
    data(){
      return{

      }
    },
    created(){

      // this.redirect();
    },

    components:{

    },
    methods:{
      toLogin() {
        this.$router.push('/login')
      },
      Yes(){

        const openId = getQuery('open_id');
        window.localStorage.setItem('openId',openId);
        //判断是否需要登录
        getToken({
           thirdAccount:openId,
           thirdType:'weixin'
        }).then((data)=>{
          if(data.error){
            customToast(data);
            return ;
          }
          //查询是否有额度，如果有，则跳转borrowMoney页，否则跳转填写额度页
          searchLimit({
            openId:openId
          }).then((data)=>{
            if(data.error){
              customToast(data);
              return ;
            }
            if(data.data && data.data.wldMoney){
              
              this.$router.push('/borrowMoney')
            }
            else{
              this.$router.push('/fillLimit')
            }
          })
        })
        
      },
      redirect(){
        const code = getQuery('code');
        getOpenId({
          appid:'wxca056aeb5eea7277',
          secret:'ca02f835e372398ffecaf424b8e42105',
          code:code,
          grant_type:'authorization_code'
        }).then(data =>{
          console.log(data)
        })
      }

    },
  }
</script>
<style lang="scss">
   @import '../../style/mixin';
  body{
    background-color:#fff;
    text-align:center;
  }
  .firstContainer{
    text-align:center;
    article{
      font-size:0.4rem;
      text-align:center;
      width:60%;
      margin-left:20%;
      margin-top:20px;
      margin-bottom: 50px;

    }
    .footer{
    margin-top:0.62rem;
    display: flex;
    justify-content: center;

    }
  .checkNoBtn{
    display: block;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    background-color: #fff;
    border:1px solid #00bbcc;
    border-radius: 22px;
    width: 3.7rem;
    margin-right:10px;
  }
    .checkYesBtn{
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    border-radius: 22px;
    width:3.7rem;
    text-indent: 5px;
    text-decoration: none;
    background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
    color: #fff;
   }
    .success_pic{
      width:80%;
      margin-top:2.56rem;
      margin-bottom:1.28rem;
    }
    .tips{
    font-size: 12px;
    color: #96BDC2;
      letter-spacing: 0;
    line-height: 12px;
    margin-top:20px;
    }
  }
</style>


