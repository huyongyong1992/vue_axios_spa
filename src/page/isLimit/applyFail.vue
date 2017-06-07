
<script>
  export default {
    data(){
      return{
         
      }
    },

    created(){
      this.getMsg()   
    },

    components:{
  
    },

    computed:{
        
       
    },

    methods:{
      getMsg() {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxca056aeb5eea7277&redirect_uri=http://beauty-dev.vdanbao.com/elm/#/redirect&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
        
      },
    }

  }

</script>

