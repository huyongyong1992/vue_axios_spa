<template>
	<div class="branchSearch">
    <header>
      <span class="iconfont icon-btn_back" @click="goBack"></span>
      <span class="title">服务网点</span>
      <div class="headRight" @click="chooseCity">
        <!--<span class="iconfont icon-btn_zk_1"></span>-->
        <img src="../../images/btn_zk.png" >
        <span>{{city}}</span>
        
      </div>
    </header>
    <section>
      <div class="netDot" v-for="dot in dotList">
        <span class="iconfont icon-icon_gps"></span>
        <span>{{dot}}</span>
      </div>
      <p v-if="!dotList">对不起，您所选的城市暂无网点</p>
    </section>
  </div>
</template>

<script>
  
  import {branchSearch} from 'src/service/getData';
  import { getQuery } from '../../config/mUtils';
  export default {
    data(){
      return{
        city:'',  
        dotList:[]
      }
    },

  	created(){ 
      this.getCity();
    },
    components:{
        
    },

  

    methods:{
      goBack() {
        history.go(-1)
      },
      getCity() {
        const isCity =getQuery('city') || '';
        if(isCity) {
          this.city = getQuery('city') || '';
          this.getCityNet();
        }else{
          const that = this;
          navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            
            var point = new BMap.Point(lon, lat);  // 创建坐标点
            // 根据坐标得到地址描述
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(point, function (result) {
              that.city = result.addressComponents.city.substr(0,2);  //把城市后面第三个字后截掉
              that.getCityNet();  //调取城市网点
            });
          });
        }
      },
      getCityNet() {  //调取城市网点
        branchSearch({
          city:this.city
        }).then((data) =>{
          this.dotList = data.data;
        })
      },
      chooseCity() {
        this.$router.push('/cityPicker?from=branch')
      }
     
    },
  }

</script>

<style lang="scss">
body{
  background-color: #fff;
}
.branchSearch{
  header{
    display: flex;
    height:1.28rem;
    width:100%;
    background-color: #00CCC2;
    padding:0 4%;
    justify-content: space-between;
    align-items: center;
    .icon-btn_back{
      color:#fff;
      font-size:16px;
    }
    .title{
      font-size:16px;
      color:#fff;
    }
    .headRight{
      span{
        font-size:14px;
        color:#fff;
      }
    }
  }
  section{
    width:100%;
    padding-left:4%;
    background-color: #fff;
    .netDot{
      width: 100%;
      padding:12px 0.4rem 12px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f3f3f3;
      span{
        font-size:14px;
        line-height:21px;
      }
      .iconfont{
        font-size:16px;
        color: #00BBCC;
        margin-right:6px;
      }
    }
    p{
      text-align: center;
    }
  }
}
</style>
