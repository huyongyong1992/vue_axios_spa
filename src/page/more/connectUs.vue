
 <template>
  <section class="connectUs">
    <head-top headTitle="联系客服"></head-top>
    <div class="content">
    <article class="title introduce">①客服电话</article>
    <div class="content-text">
    <a href="tel:4000523528">4000-523-538</a>
    <p>拨通后按"4"进入维粒贷在线业务申请</p>
    </div>
    </div>

    <div class="content">
    <article class="title introduce">②工作时间</article>
    <div class="content-text">
    每周一至周五09:00-17:30(法定节假日除外)
    </div>
    </div>
    <div class="content">
    <article class="title introduce">③服务范围</article>
    <div class="content-text">
     解决客户在线上申请遇到的问题
    </div>
    </div>

    
  </section>
</template>
<script>
import headTop  from '../../components/header/head';


export default {
  data(){ 
    return{
      

    }
  },

  mounted(){
      
  },

  components:{
    headTop 
  },

  computed:{
    // show: state => state.show
     
  },

  methods:{

  },
}

</script>
<style lang="scss">
  bady{
   background:#fff;
  }


  .title{
    height:0.2rem;
    font-size: 14px;
    text-align: left;
    margin-top:2px;
    color:#666;
    font-weight:600;
  }

  .content-text{
    font-size:12px;
    color:#999;
    margin-top:30px;
    margin-bottom: 14px;
    text-align: left;
    margin-left:0.4rem;
    a{
      color:#00CCC2;
      font-size:18px;
      margin:30px 0px 20px 0px;
      display:block;
      text-align: center;
    }
    p{
      text-align:left;
      width:7rem;
      color:#999;
      font-size:12px;

    }
  }
   .content{
    width:100%;
    height:auto;
    padding:15px;
    border-bottom:#ddd solid 1px;
  }

</style>