<template>
  <div class="footer-container" v-if="!fullScreen">
    <footerbar></footerbar>
  </div>
</template>

<script>
  import Footerbar from '../components/Footerbar'
  export default {
    name: 'BocnetFooter',
    data() {
      return {
        fullScreen: false  // 默认不全屏
      };
    },
    components: {
      'Footerbar': Footerbar
    },
    beforeMount() {
      if(this.$route.meta.fullScreen) {
        this.fullScreen = true;
      }else{
        this.fullScreen = false;
      }
    },
    watch: {
      $route: function() {
        if(this.$route.meta.fullScreen) {
          this.fullScreen = true;
        }else{
          this.fullScreen = false;
        }
      }
    }
  }

</script>

<style>
.footer-container{

}
</style>
