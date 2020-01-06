<template>
  <div class="page-container">
    <div class="page-container-background" v-if="!fullScreen">
      <div class="page-container__main container" >
        <router-view></router-view>
      </div>
    </div>
    <router-view v-if="fullScreen"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'BocnetContent',
    data() {
      return {
        fullScreen: false  // 默认不全屏
      };
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

<style lang="stylus" rel="stylesheet/stylus">
.page-container{

}
.page-container-background{
  background-image: url("../assets/img/bg.png");
  background-attachment: fixed ;
  background-position: center;
  min-height: 700px;
}
.page-container__main{
  width: 1002px;
  padding: 0px;
}

</style>
