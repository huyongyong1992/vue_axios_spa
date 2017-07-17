<template>
    <div class="customerManager">
     <!--  我的客户经理 -->
      <headTop headTitle="客户经理"></headTop>
      <div class="customerManager-content" style="width:80%; background:#fff;margin-left: 10%;margin-top:10%; border-radius: 10px; box-shadow: 1px 0px 6px -2px">
      <article class="userinfo">
        <img src="../../images/man_agency.png" width="80" height="80">
        <p class="center mt-5" >{{saleName}}</p>
      </article>
      <article class="stores">
       <h2 class="title">{{storeName}}</h2>
       <ul class="store-content">
        <li class="line-bottom">
         <label>联系方式：</label>
         <p class="textMobile" >{{saleMobile}}</p>
        </li>
        <li class="line-bottom">
         <label>门店地址：</label>
         <p class="address">{{storeAddress}}</p>
        </li>
       </ul>
      </article>
      </div>
      <button class="connectCheckBtn"><a :href="`tel:${saleMobile}`">联系客户经理</a></button>
    </div>
</template>
<script>
import headTop from "../../components/header/head";
import { checkManager} from '../../service/getData';
import {errorHandler} from '../../config/mUtils';
import { customToast } from '../../config/mUtils' ;

export default {
  data(){
    return{
      // headUrl:'../../images/dot1.png',
      saleName:'',
      storeName:'',
      saleMobile:'',
      storeAddress:'',
      accountId:'',
      data:{}

    }
  },

  mounted(){

  },
  created(){
    this.accountId = window.localStorage.getItem('accountId');
    this.getcustormAll()

  },

  components:{
      headTop
  },

  computed:{


  },

  methods:{
    getcustormAll(){
      checkManager({
        accountId:this.accountId
      }).then((data)=>{
        if(data.error){
          customToast(data);
          return;
        }
        console.log(data)
       if(data.error){
        customToast(data);
        return ;
       }
       this.saleName = data.data.saleName;
       this.storeName = data.data.storeName;
       this.saleMobile = data.data.saleMobile;
       this.storeAddress = data.data.storeAddress;
        
      })
    }
  },
}

</script>

<style lang="scss" scoped>
   .customerManager {
      text-align:center;
      .userinfo {
        text-align: center;
        img{
          border-radius: 50%;
          width:1.81rem;
          height:1.81rem;
          margin-top:1.81rem;
        }
        p{
          padding-top: 8px;
        }
      }
      .stores {
        overflow: hidden;
        text-align:center;
        margin:2.13rem 0px 0.27rem 0px;
        font-size: 16px;
        color: #333333;
        line-height: 16px;
        
        ul {
          padding: 18px 0 18px 12px;
          display:flex;
          flex-direction:column;
          align-items: flex-start;
        }
        li {
          position: relative;
          overflow: hidden;
          padding: 12px 12px 0;
          font-size: 14px;
          color: #666666;
          line-height: 14px;
        }
        label {
          width: 90px;
          float: left;
          color: #999;
          line-height:22px;
        }
        .title{
          border-bottom:1px solid #ddd;
          padding-bottom: 10px;
        }
      }
      .tel {
        display: inline-block;
        text-decoration: none;
        font-size: 22px;
        color: #EC5F2B;
      }
      .textMobile {
        font-size: 14px;
        color: #333333;
        line-height: 22px;
        float: left;
      }
      .address {
        width: -webkit-calc(100% - 100px);
        float: left;
        line-height: 20px;
        font-size: 14px;
        color: #333333;
        line-height: 22px;
        text-align:left;
      }
    }


  .mt-pecent-25 {
    margin-top: 25%;
  }

  .padding-10 {
    padding: 0 10%;
  }

  .percent-100 {
    width: 100%;
  }
  .connectCheckBtn{
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    border-radius: 22px;
    width:5rem;
    text-indent: 5px;
    text-decoration: none;
    background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
    color: #fff;
    position: relative;
    a{
      color:#fff;
      text-decoration: none;
    }
  }

</style>

