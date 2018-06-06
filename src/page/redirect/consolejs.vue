<template>
    <div class="consolejs">
      
    </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    created(){
      
      // this.customeAutoComplete('aha')
      let Console = require('console.js');
      const cnsl = new Console({ hotkey: 192 })

      cnsl.register('addbots', addBots)
      cnsl.register('god', godMode)

      function addBots(num) {
          // TODO: Add some bots.
          // Then tell player:
          return num + ' bots added.'
      }

      function godMode() {
          // TODO: give player invulnerability.
          cnsl.log('good')
          return 'You feel like a god.'
      }
    },

    components:{

    },
    methods:{
      
    }
  }
</script>
<style lang="less">

</style>


