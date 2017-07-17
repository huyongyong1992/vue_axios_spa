<template>
	<div class="agree" >
		<span :class="[agreeCheck ? 'icon-btn_gx_1' : 'icon-btn_gx_', 'iconfont']" @click="isChecked"></span>
		<span>我已阅读并签署</span>
		<span class="blue" @click="onLink">{{text}}</span>
	</div>
</template>

<script>
  export default {
  	data(){
      return{
				agreeCheck:false
      }
    },
    mounted(){

    },
    props: ['text'],
    computed: {

    },
    methods: {
      isChecked() {
				this.agreeCheck = !this.agreeCheck;
				this.$emit('click',this.agreeCheck);
			},
			onLink() {
				this.$emit('link')
			}
    }

  }

</script>

<style lang="scss" scoped>
  .agree{
		width: 96%;
		padding-left:4%;
		margin-top:10px;
		display: flex;
		.iconfont{
			font-size:14px;
			margin-right:5px;
		}
		.icon-btn_gx_1{
			color:#00BBCC;
		}
		.blue{
			color:#00BBCC;
			font-family: PingFangSC-Regular;
			font-size: 12px;
      // margin-top: 3px;
		}

	}

</style>
