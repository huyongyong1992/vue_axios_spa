<template>
  <div class="cityPicker">
    <header-top headTitle="城市选择"></header-top>
    <search placeholder="搜索" position='absolute' top="1.28rem" @on-change="getResult" @result-click="resultClick" :results="results" v-model="value"></search>
    <div class="item">
      <div class="title">所在城市</div>
      <div class="content" @click="getLocation">
        <span class="iconfont icon-icon_gps"></span>
        <span>GPS定位</span>
      </div>
      <div class="content" v-if="location" @click="onSelectCity(location)">
        {{location}}
      </div>
    </div>
    
    <div class="cityList" v-for="cityList in city">
      <div class="title" :id="cityList.letter">{{cityList.letter}}</div>
      <group>
        <cell-box class="content" v-for="thisCity in cityList.list" @click.native="onSelectCity(thisCity)">
          {{thisCity}}
        </cell-box>
      </group>
    </div>
    <div class="rightLetter">
      <a v-for="cityLetter in letter" href="javascript:void(0)" @click="goAnchor(cityLetter)" >{{cityLetter}}</a>
    </div>
  </div>
</template>

<script>
  import city from '../../plugins/city';
  import { Search,Group,CellBox  } from 'vux';
  import { getQuery } from '../../config/mUtils'
  import headerTop from '../../components/header/head';
  export default {
    data(){
      return {
        city:[],
        letter:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        results:[],
        value:'',
        searchCityList:[],
        from:'',
        location:''
      }
    },
    created(){
      this.city = city;
      this.from = getQuery('from');		//判断是从哪个页面进来的
      this.city.map((data) =>{	//将所有城市名放进一个数组里，用来搜索
        this.searchCityList = this.searchCityList.concat(data.list);
      })
      this.getLocation()
      
    },
    components: {
      headerTop,Search,Group,CellBox 
    },
    computed: {
        
    },
    methods: {
      getLocation() {
        const that = this;
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          var point = new BMap.Point(lon, lat);  // 创建坐标点
          // 根据坐标得到地址描述
          var myGeo = new BMap.Geocoder();
          myGeo.getLocation(point, function (result) {
            that.location = result.addressComponents.city;  //获取当前城市
          });
         });
      },
      goAnchor(cityLetter) {
        var anchor = document.getElementById(cityLetter)		
        document.body.scrollTop = anchor.offsetTop -44
      },
      onSelectCity(e) {
        if(this.from === 'auth'){
          this.$router.push('/getLimit/personalAuthentication?city='+e)
        }else{
          this.$router.push('/branchSearch?city='+e)
        }
        
      },
      resultClick(e) {
        if(this.from === 'auth') {
          this.$router.push('/getLimit/personalAuthentication?city='+e.title)
        }else{
          this.$router.push('/branchSearch?city='+e.title)
        }
        
      },
      getResult(val) {
        this.results = val ? this.getFilter(this.value) : [];
      },
      getFilter(val) {
        let rs =[];
        let list = this.searchCityList;
      
        for(let i=0;i<list.length;i++) {
          if(list[i].indexOf(val) >-1) {
            
            rs.push({
              title:list[i]
            })
          }	
        }
        return rs;
      }
    }
  }

</script>

<style lang="scss" >
  .cityPicker{
    .vux-search-box{
      width: 100%;
      position: absolute !important;
      top:1.28rem;
      background-color: #E1E1E1;
    }
    .weui-search-bar__label{
      line-height:24px;
      
    }
    .title{
      height:0.853rem;
      line-height:0.853rem;
      background-color: #f3f3f3;
      color:#999;
      width:100%;
      padding:0 4%;
    }
    .item{
      margin-top:1.28rem;
      width:100%;
      
      .content{
        height:1.28rem;
        display: flex;
        align-items:center;
        background-color: #fff;
        width:100%;
        padding:0 4%;
        font-size:16px;
        border-bottom:1px solid #f3f3f3;
        span{
          color:#00BBCC;
          font-size:14px;
        }
        .iconfont{
          font-size:21px;
          margin-right:0.27rem;
        }
      }
    }
    .cityList{
      .weui-cells{
        margin: 0;
      }
    }
    /*右边字母*/ 
    .rightLetter{
      position: fixed;
      top:2.56rem;
      right:0;
      width:0.6rem;
      height: 15rem;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: space-between;
      a{
        text-align: center;
      }
    }
  }
</style>
