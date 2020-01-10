<template>
  <div class="page-container">
    <div class="page-container-background" v-if="!fullScreen">
      <div class="page-container__main container" >
        <div class="row" style="margin-top:10px;margin-bottom:10px;">
          <bfe-breadcrumb separator=">" style="font-size:16px">
            <bfe-breadcrumb-item :to="{ path: '/' }" >首页</bfe-breadcrumb-item>
            <bfe-breadcrumb-item>活动管理</bfe-breadcrumb-item>
            <bfe-breadcrumb-item>活动详情</bfe-breadcrumb-item>
          </bfe-breadcrumb>
         </div>
         <div class="row">
           <router-view></router-view>
        </div>
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
        fullScreen: true  // 默认不全屏
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
