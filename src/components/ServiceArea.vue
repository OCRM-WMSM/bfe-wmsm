<template lang="html">
  <div class="service-area">
    <bfe-card>
      <div slot="header" class="service-area__header">
        <span class="service-area__headerleft text-center">专区服务</span>
      </div>
      <div class="service-area__body">
        <div class="service-area__item" v-for="service in serviceImgs">
          <img class="img-responsive" :src="service.img" :href="service.href" @click="chooseService"/>
        </div>
      </div>
    </bfe-card>
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
        serviceImgs: [
          {
            img: './static/img/service-1.png',
            href: 'service1'
          },
          {
            img: './static/img/service-2.png',
            href: 'service2'
          },
          {
            img: './static/img/service-3.png',
            href: 'service3'
          }
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
      chooseService(event) {
        var toRoute = event.target.attributes.href.value;
        this.$router.push(toRoute);
      }
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
.service-area{

}

.service-area__item{
  margin-top: 8px;
  margin-bottom: 8px;
  cursor: pointer;
}

</style>
