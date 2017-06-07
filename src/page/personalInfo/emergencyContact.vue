<template>
	<div>
    紧急联系人<br/>
    <div>您当前所在的位置是: {{address || '家里蹲'}}</div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        address:''
      }
    },

  	mounted(){
      if(navigator.geolocation){
        // this.address = '家里蹲';
        var getOptions = {
          enableHighAccuracy:true, //是否使用高精度设备,如GPS 
          timeout:5000, //超时时间
          maximumAge:Infinity  //使用设置时间内的缓存数据，单位毫秒,默认为0，即始终请求新数据;如设为Infinity，则始终使用缓存数据  
        };
        function getSuccess(position){
          if(position.address){  
            //通过address，可以获得国家、省份、城市  
            // console.log(position.address.country);  
            // console.log(position.address.province);  
            // console.log(position.address.city);  
            this.address = position.address.city;
          }  
        };
        function getError(error) {
          switch(error.code){  
            case error.TIMEOUT:  
              console.log('超时');  
              break;  
            case error.PERMISSION_DENIED:  
              console.log('用户拒绝提供地理位置');  
              break;  
            case error.POSITION_UNAVAILABLE:  
              console.log('地理位置不可用');  
              break;  
            default:  
              break;  
          }  
        };
        // navigator.geolocation.getCurrentPosition(getSuccess, getError, getOptions);
        var watcher_id = navigator.geolocation.watchPosition(getSuccess, getError, getOptions);
        navigator.geolocation.clearWatch(watcher_id);
      }

    },

    components:{
        
    },

    computed:{
        
    },

    methods:{
      
    },
  }
</script>

<style lang="scss" scoped>
    

</style>
