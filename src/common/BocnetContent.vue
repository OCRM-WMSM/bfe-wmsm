<template>
  <div class="page-container">
    <div class="page-container-background" v-if="!fullScreen">
      <div class="page-container__main row">
        <div class="page-container__header">
          <bfe-breadcrumb separator=">" style="font-size:16px">
            <bfe-breadcrumb-item :to="{ path: '/' }" >首页</bfe-breadcrumb-item>
            <bfe-breadcrumb-item>活动管理</bfe-breadcrumb-item>
            <bfe-breadcrumb-item>活动详情</bfe-breadcrumb-item>
          </bfe-breadcrumb>
         </div>
         <div class="page-container__content">
           <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BocnetContent'
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
.page-container{

}
.page-container-background{
  background-image: url("../assets/img/bg.png");
  background-attachment: fixed ;
  background-position: center;
  min-height: 780px;
}
.page-container__main{
  width: 100%;
  padding: 0px;
}
.page-container__header{
  margin-top:10px;
  margin-left:3%
}
.page-container__content{
  margin-top:10px;
  margin-left:3%;
  margin-right:2%
}

</style>
