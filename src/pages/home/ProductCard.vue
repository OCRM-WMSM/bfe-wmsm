<template lang="html">
  <div class="product-card">
      <bfe-card>
        <div slot="header" class="product-card__header clearfix">
            <span class="product-card__headerleft"><a href="javascript:;" @click='tabToggle(tab01Text);'>理财</a></span>
            <span><a href="javascript:;" @click='tabToggle(tab02Text);'>基金</a></span>
            <span><a href="javascript:;" @click='tabToggle(tab03Text);'>保险</a></span>
          <a class="product-card__headerright">更多<i class="glyphicon glyphicon-menu-right"></i></a>
        </div>
        <div class="bottom">
          <component :is='currentView' transition="fade" transtion-mode="out-in" keep-alive></component>
        </div>
      </bfe-card>
  </div>
</template>

<script type="text/javascript">
  import MoreFundcard from '@components/MoreFundcard'
  import MoreFinacial from '@components/MoreFinacial'
  import MoreInsurancecard from '@components/MoreInsurancecard'

  export default {
    name: 'ProductCard',
    // 组合其它组件
    extends: {},
    // 组件属性、变量
    props: {

    },
    // 变量
    data() {
      return {
        tab01Text: 'MoreFinacial',
        tab02Text: 'MoreFundcard',
        tab03Text: 'MoreInsurancecard',
        currentView: 'MoreFinacial'
      }

    },
    computed: {},
    // 使用其它组件
    components: {
      'MoreFundcard': MoreFundcard,
      'MoreFinacial': MoreFinacial,
      'MoreInsurancecard': MoreInsurancecard
    },
    // 方法
    watch: {},
    methods: {
      tabToggle: function(tabText) {
        this.currentView = tabText
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
.product-card{
  min-height: 254px;
}
.product-card__header{
  padding: 0px
}
.product-card__headerright{
    float: right;
}
.product-card__header a{

  display: inline-block;
  text-decoration: none;
  cursor: pointer;
}
.col-sm-6{

}
.product-card__body{

}
.product-card__card{
  width: 100%;
  display: inline;
}
.fade-transition{
  transition: opacity .3s ease;
}
.fade-enter,
.fade-leave{
  opacity: 0;
}

</style>
