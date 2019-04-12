<template>
	<div id="app">
		<router-view v-wechat-title="$route.meta.title" />
	</div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            vConsole: ''
        };
    },
    created() {
        if (process.env.NODE_ENV === 'test') {
            let VConsole = require('vconsole');
            this.vConsole = new VConsole();
        }
    }

};
</script>

<style lang="less">
#app {
    font-family: Helvetica, Arial, sans-serif;
    min-height: 100vh;
}
</style>
