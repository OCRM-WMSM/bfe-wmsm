<template lang="html">
  <div class="exchange-quotation">
    <div class="exchange-quotation__line">
      <div class="exchange-quotation__detail clearfix">
        <div class="clearfix">
          <span class="exchange-quotation__detailleft">
            {{currency}}
          </span>
          <span class="exchange-quotation__detailmiddle">
            {{buyamount}}<img class="pic" :src="buyPic"/>
          </span>
          <span class="exchange-quotation__detailright">
            {{saleamount}}<img :src="salePic"/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'ExchangeQuotationCard',
    // 组合其它组件
    extends: {},
    // 组件属性、变量
    props: {
      currency: {
        type: String,
        default: '美元'
      },
      buyamount: {
        type: String,
        default: '689.5'
      },
      buyPic: {
        type: String,
        default: './static/img/up.png'
      },
      saleamount: {
        type: String,
        default: '692.26'
      },
      salePic: {
        type: String,
        default: './static/img/down.png'
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
  .exchange-quotation{

  }

  .exchange-quotation__line{
    border-bottom: 1px solid #dadada;
    padding: 5px;
  }
  .exchange-quotation__detail{
    padding: 5px;
  }
  .exchange-quotation__detailleft{
    padding: 5px;
  }
  .exchange-quotation__detailmiddle{
      margin-left: 10%;
      font-size: 15px;
  }
  .pic{
    margin-left: 1%
  }
  .exchange-quotation__detailright{
      margin-right: 2%;
      float: right;
      font-size: 15px;
  }
</style>
