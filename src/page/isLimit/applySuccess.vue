
<template>
<div>
<group :title="value1 + ''">
      <datetime-range :title="'78787'" start-date="2017-01-01" end-date="2017-02-02" :format="'daterange-format'" v-model="value1" @on-change="onChange"></datetime-range>
</group>
<button-tab>
  <button-tab-item @on-item-click="tabOnclick" selected>你好</button-tab-item>
  <button-tab-item>hello</button-tab-item>
</button-tab>
<group>
  <calendar v-model="demo1" :title="'时间'" disable-future></calendar>
</group>
<card :header="{title:'我的钱包'}">
  <div slot="content" class="card-demo-flex">
  <div class="Money">
    <span>1130</span><br>京豆
  </div>
  <div class="Money">
    <span>120</span><br>京东卡
  </div>
  <div class="Money">
    <span>10</span><br>卡卷
  </div>
 </div>
</card>
<group>
  <cell title="cell" value="hello" is-link>
  </cell>
  <cell-box is-link link="https://vux.li/#/zh-CN/demos">
    xjsxisxjis
  </cell-box>
</group>
<!--<check-icon :value="demo2">Do you agree? ({{ demo2 }})</check-icon>
      <br>
      <br>
<check-icon :value="demo3" type="plain">Do you agree?({{ demo3 }})</check-icon>
<check>
</check>-->
<group title="auto countdown">
  <cell title="15s" v-model="value">
    <countdown slot="value" v-model="time1" @on-finish="finish" v-show="show"></countdown>
  </cell>
</group>

  <group>
  <datetime v-model="value2" @on-change="change" :title="'dgsygdsy'"></datetime>
</group>
<div style="padding:15px;">
  <x-button type="primary" plain @click.native="showPlugin">{{ 'Used as a plugin(Hide in 2s)' }}</x-button>
</div>
<flow>
  <flow-state state="1" title="已付款" is-done></flow-state>
  <flow-line is-done></flow-line>

  <flow-state state="2" title="已发货" is-done></flow-state>
  <flow-line tip="进行中"></flow-line>

  <flow-state state="3" title="待收货"></flow-state>
  <flow-line></flow-line>

  <flow-state state="4" title="完成"></flow-state>
</flow>
<flow orientation="vertical" style="height:200px;">
  <flow-state state="1" title="已付款" is-done></flow-state>
  <flow-line is-done :line-span="15"></flow-line>

  <flow-state state="2" title="已发货" is-done></flow-state>
  <flow-line :line-span="30"></flow-line>

  <flow-state state="3" title="待收货"></flow-state>
  <flow-line :line-span="45"></flow-line>

  <flow-state state="4" title="完成"></flow-state>
</flow>
<group-title>rows = 2</group-title>
<grid :rows="2">
  <grid-item :label="'Grid'" v-for="i in 2" :key="i">
    <img slot="icon" src="#">
  </grid-item>
</grid>

<div id="app">
            <ul class="x-title" >
                <li v-for="(item, index) in items" v-on:click="tab(index)" :class="{active: activeIndex === index}">{{item.title}}</li>
              </ul>
              <div class="x-content">
              <span v-if="items.page">a</span><span v-else>b</span>
              </div>
 </div>
<div v-for="(value, key,index) in object">
{{index }}. {{ key }} : {{ value }}
</div>


</div>
</template>

<script>
import { Group, DatetimeRange,ButtonTab,ButtonTabItem,Calendar,Card,
         Cell,CellBox,Countdown,Datetime,XButton,Flow,FlowState,FlowLine,Grid, GridItem, GroupTitle} from 'vux';
import { CheckIcon } from 'vux';

export default {
    data(){
        return{
           value1: ['2017-01-15', '03', '05'],
           demo1:"TODAY",
           demo2: false,
           demo3: true,
           show:true,
           value:'',
           time1: 15,
           value2: '2015-11-12',
           activeIndex: 1,
           items: [
                  {title: '产品介绍1',page:0},
                  {title: '产品介绍2',page:1},
                    ],

            object: {
              firstName: 'John',
              lastName: 'Doe',
              age: 30
            }
        }
    },

    created(){

      },

    components:{
      Group,DatetimeRange,ButtonTab,ButtonTabItem,Calendar,Card,Cell,CellBox,CheckIcon,Countdown,Datetime
      ,XButton,Flow,FlowState,FlowLine,Grid, GridItem, GroupTitle
    },

    computed:{


    },

    methods:{
      onChange (val) {
      console.log('change', val)
    },
      tabOnclick(){
      console.log("124");
    },
    finish (index) {
      this.show = false
      this.value = 'completed'
      console.log('current index', index)
    },
    change(){
      console.log('change', value)
    },
     showPlugin () {
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD HH',
        value: '2017-05-20 18',
        onConfirm (val) {
          console.log('plugin confirm', val)
        },
        onShow () {
          console.log('plugin show')
        },
        onHide () {
          console.log('plugin hide')
        }
      })
      setTimeout(() => {
        this.$vux.datetime.hide()
      }, 2000)
    },

    tab: function(index){
                          this.activeIndex = index;
                          this.items.page = index-1;
                      }
    },
}

</script>

<style lang="scss">
.card-demo-flex{
  display:flex;
}
.card-demo-flex>div{
  flex: 1;
  text-align: center;
  font-size: 12px;
}
 .x-title .active{
                color: #f00;
            }




</style>
