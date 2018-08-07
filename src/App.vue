<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<!-- 自定义微信title -->
			<router-view v-wechat-title="$route.meta.title"></router-view>
		</transition>
    </div>
</template>

<script>

	export default {
		created() {
			// 开发环境配置vconsole
			if(process.env.NODE_ENV === 'development') {
				let VConsole = require('vconsole');
				let vConsole = new VConsole();
			}
		}
	}

</script>

<style lang="less">
  	@import './style/common';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
