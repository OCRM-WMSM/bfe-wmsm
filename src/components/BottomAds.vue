<template lang="html">
  <div class="bottom-ads clearfix">
    <div>
      <div v-for="img in adsImgs" class="col-sm-3">
        <img class="bottom-ads__img img-responsive center-block" :src="img" />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'BottomAds',
    // 组合其它组件
    extends: {},
    // 组件属性、变量
    props: {
    },
    // 变量
    data() {
      return {
        adsImgs: [
          './static/img/ad1.png',
          './static/img/ad2.png',
          './static/img/ad3.png',
          './static/img/ad4.png'
        ]
      }
    },
    computed: {

    },
    // 使用其它组件
    components: {
    },
    // 方法
    watch: {},
    methods: {

    },
    // 生命周期函数
    beforeCreate() {},
    mounted() {
    },
    beforeMounted() {

    }
};
</script>

<style scoped>
.bottom-ads{
  margin-top: 16px;
  margin-bottom: 16px;
}
.bottom-ads__img{
  margin-left: 7px;
  margin-right: 7px;
}

</style>
