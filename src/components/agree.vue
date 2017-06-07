<template>
	<div class="agree" >
		<div @click="isChecked">
			<img src="../images/activity.png" v-if="checked" />
			<img src="../images/add_address.png" v-else/>
		</div>
		<span>我已阅读并签署</span>
		<span class="blue">《个人信息授权书》</span>
	</div>
</template>

<script>
  export default {
  	data(){
      return{
				checked:true
      }
    },
    mounted(){
       
    },
    props: [],
    computed: {
       
    },
    methods: {
      isChecked() {
				this.checked = !this.checked;
				this.$emit('sendChecked',this.checked);
			}
    }

  }

</script>

<style lang="scss">
  .agree{
		width: 96%;
		padding-left:4%;
		margin-top:10px;
		display: flex;
		.blue{
			color:#4DB8FF;
			font-family: PingFangSC-Regular;
			font-size: 12px;
		}
		img{
			width:0.4rem;
		}
	}
   
</style>
