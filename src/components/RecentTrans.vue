<template lang="html">
  <div class="recent-trans">
    <div class="recent-trans__line">
      <div class="recent-trans__detail clearfix">
        <div class="clearfix">
          <span class="recent-trans__detailleft">
            [{{transactiontype}}]
          </span>
          <span class="recent-trans__detailright">{{transaction}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'RecentTrans',
    // 组合其它组件
    extends: {},
    // 组件属性、变量
    props: {
      transactiontype: {
        type: String,
        default: '[跨行转账]'
      },
      transaction: {
        type: String,
        default: '活期转账5000元'
      }
    },
    // 变量
    data() {
      return {

      }
    },
    computed: {
    },
    // 使用其它组件
    components: {},
    // 方法
    watch: {},
    methods: {},
    // 生命周期函数
    beforeCreate() {},
    mounted() {}
};
</script>

<style scoped>
  .recent-trans{
  }

  .recent-trans__line{
    border-bottom: 1px solid #dadada;
    padding: 5px;
  }
  .recent-trans__detail{
    padding: 5px;
  }
  .recent-trans__detailleft{
    padding: 5px;
  }
  .recent-trans__detailright{
      float: right;
  }
</style>
