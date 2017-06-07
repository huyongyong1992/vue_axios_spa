<template>
  	<div>
      完善信息<br/>
      <group>
        <popup-picker  
          title="工作城市" 
          :data="cities" 
          v-model="city" 
          @on-change="onCityChange" 
          placeholder="请选择城市">
        </popup-picker>

        <popup-picker  
          title="教育程度" 
          :data="edus" 
          v-model="edu" 
          @on-change="onEduChange" 
          placeholder="请选择教育程度">
        </popup-picker>

        <popup-picker  
          title="婚姻状况" 
          :data="marries" 
          v-model="marry" 
          @on-change="onMarryChange" 
          placeholder="请选择婚姻状况">
        </popup-picker>

        <popup-picker  
          title="所属行业" 
          :data="industries" 
          v-model="industry" 
          @on-change="onIndustryChange" 
          placeholder="请选择所属行业">
        </popup-picker>

        <popup-picker  
          title="职业类别" 
          :data="jobs" 
          v-model="job" 
          @on-change="onJobChange" 
          placeholder="请选择职业">
        </popup-picker>
     
        <x-input 
          title="进卡工资" 
          placeholder="请输入进卡工资" 
          :show-clear="true" 
          required 
          type="number" 
          text-align="right" 
          @on-change="onCardSalaryChange">
        </x-input>

        <x-input 
          title="现金收入" 
          placeholder="请输入现金收入" 
          :show-clear="true" 
          required 
          type="number" 
          text-align="right" 
          @on-change="onCashSalaryChange">
        </x-input>
      </group>
      <!-- <checklist options=""></checklist> -->
     
      <span>
        我已阅读并同意签署
        <router-link :to="'/calculateLimit/'">《个人信息授权书》</router-link>
      </span>
      <x-button @click.native="onSubmit">下一步</x-button>
      
      <div>
        <confirm v-model="showComfirm"
          title="请核对您的基本信息"
          @on-confirm="onConfirm"
          cancel-text="修改">
            <div class="info"><span>工作城市</span><span>{{city[0]}}</span></div>
            <div class="info"><span>教育程度</span><span>{{edu[0]}}</span></div>
            <div class="info"><span>婚姻状况</span><span>{{marry[0]}}</span></div>
            <div class="info"><span>所属行业</span><span>{{industry[0]}}</span></div>
            <div class="info"><span>职业类别</span><span>{{job[0]}}</span></div>
            <div class="info"><span>进卡工资</span><span>{{cardSalary}}</span></div>
            <div class="info"><span>现金收入</span><span>{{cashSalary}}</span></div>
        </confirm>
      </div>
    </div>
</template>

<script>
  import { Cell,XButton,Group,XInput,PopupPicker, TransferDomDirective as TransferDom,Confirm } from 'vux';
  export default {
    data(){
        return{
          cities:[['上海','南京']],
          city:[],
          edu:[],
          edus:[['硕士及以上','本科','大专','高中','中专','中专及以下']], 
          marry: [],
          marries:[['已婚','未婚','离异','其他']],
          industry:[],
          industries:[['批发/零售/贸易','通讯/IT/软件','房地产/建筑','住宿/餐饮','文化/体育/娱乐']],
          job:[],
          jobs:[['上班族','私营业主/企业老板']],
          cardSalary:'',
          cashSalary:'',
          showComfirm:false
        }
    },

  	mounted(){
      this.$store.state.steps = 2 ; 
    },

    components:{
      Cell,XButton,Group,XInput,PopupPicker,Confirm
    },

    computed:{
        
       
    },

    methods:{
      onSubmit() {  //提交表单
        if(!this.city[0]) {
          alert("请选择城市");
          return ;
        }
        if(!this.edu[0]) {
          alert("请选择教育程度");
          return ;
        }
        if(!this.marry[0]) {
          alert("请选择婚姻状况");
          return ;
        }
        if(!this.industry[0]) {
          alert("请选择行业");
          return ;
        }
        if(!this.job[0]) {
          alert("请选择职业");
          return ;
        }
        if(!this.cardSalary) {
          alert("请输入进卡工资");
          return ;
        }
        if(!this.cashSalary) {
          alert("请输入现金收入");
          return ;
        }
        this.showComfirm = true;
      },
      onConfirm() { //确认信息
        this.$router.push('/calculateLimit')
      },   
      onCityChange(val) {
        this.city[0] = val;
      },
      onEduChange(val) {
        this.edu[0] = val;
      },
      onMarryChange(val) {
        this.marry[0] =val;
      },
      onIndustryChange(val) {
        this.industry[0] = val;
      },
      onJobChange(val) {
        this.job[0] = val;
      },
      onCardSalaryChange(val) {
        this.cardSalary = val;
      },
      onCashSalaryChange(val) {
        this.cashSalary = val;
      }
    },
  }

</script>

<style  scoped>
  .check{
    background:#f00;
    width:20px;
    height:20px;
    /*padding:5px;*/
    border-radius:50%;
  }
  .checked{
    border:2px solid #ccc;
  }
  .info{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

</style>
