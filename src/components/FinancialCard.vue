<template lang="html">
  <div class="boc-card">
    <bfe-card :body-style="{ padding: '12px'}">
      <div class="boc-card__img">
        <span>
          {{ productName }}
        </span>
        <span class="boc-card__imgright">
          <img :src="Pic"/>
        </span>
      </div>
      <div class="boc-card__detail clearfix">
        <div class ="boc-card__list">
          <span class="boc-card__detailleft">
            预计年化收益率
          </span>
          <span class="boc-card__detailmiddle">
            产品期限
          </span>
          <span class="boc-card__detailright">
            起购金额
          </span>
        </div>
        <div class="clearfix">
          <span class="boc-card__rate">
            {{rate}}%
          </span>
          <span class="boc-card__date">
            {{financialdate}}
          </span>
          <span class="boc-card__amout">
            {{financialamount}}万
          </span>

        </div>
      </div>
    </bfe-card>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'FinancialCard',
    // 组合其它组件
    extends: {},
    // 组件属性、变量
    props: {
      financialamount: {
        type: String,
        default: '0'
      },
      Pic: {
        type: String,
        default: './static/img/recommend.png'
      },
      productName: {
        type: String,
        default: '中银日积月累-日计划'
      },
      financialdate: {
        type: String,
        default: '无'
      },
      rate: {
        type: String,
        default: '2.36'
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
  .boc-card{
    max-width: 340px;
    max-height: 140px;
    min-width: 340px;
    min-height: 120px;
    margin-left: 5%;
    margin-top: 2%
  }
  .boc-card__list{
    background-color: #ffffff
  }
  .boc-card__imgright{
    float: right;
  }
  .boc-card__img{
    width: 100%;
    display: block;
  }
  .boc-card__rate{
      font-size: 20px;
      padding: 5%;
      color: #ba2a3e;
  }
  .boc-card__date{
    margin-left: 25%
  }
  .boc-card__detail{
    font-weight: bold;
    padding: 5px;
  }
  .boc-card__amout{
    margin-top: 2%;
    font-size: 15px;
    float: right;
  }
  .boc-card__detailmiddle{
    padding: 10%;
    font-weight: bold;
  }
  .boc-card__detailright{
    float: right;
    font-weight: bold;
  }
</style>
