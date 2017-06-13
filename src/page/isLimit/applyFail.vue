
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
        const redirectUrl = encodeURI("http://beauty-dev.vdanbao.com/wechat/wld/api/page/product/weilidai/redirectTo/apply");
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxca056aeb5eea7277&redirect_uri="+redirectUrl+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"

      },
    }

  }

</script>

