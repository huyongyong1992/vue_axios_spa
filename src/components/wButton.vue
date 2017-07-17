<template>
  <button class="wld-btn" :disabled="disabled" @click="onClick">
    <slot>{{ text }}</slot>
  </button>
</template>
<script>
  export default {
    props: {
      disabled:Boolean,
      text:String
    },
    methods: {
      onClick() {
        !this.disabled && this.$emit('click');
      }
    }

  }
</script>
<style lang="scss" scoped>
  .wld-btn{
    display: block;
    height: 1.2rem;
    font-size: 16px;
    border-radius: 0.6rem;
    width: 56%;
    background: linear-gradient(to right, #00E6E2 0%, #00CDD4  100%);
    color: #fff;
    margin-top: 1.49rem;
    margin-left:22%;
  }
  .wld-btn[disabled] {
    background: #CFCFCF;
    color: #FFF;
  }
</style>
