<template lang="html">
  <div class="exchange-quotation" v-loading='loading'>
    <bfe-card :body-style="{ padding: '0px'}" :refreshFn="reload" :hasError="netError">
      <div slot="header" class="exchange-quotation__header">
        <span class="exchange-quotation__headerleft text-center">外汇牌价</span>
        <a class="exchange-quotation__headerright">更多</a>
      </div>
      <div class="exchange-quotation__menu" height="40px">
        <div class="exchange-quotation__title">
          <span class="exchange-quotation__menuleft text-center">货币</span>
          <span class="exchange-quotation__menumiddle text-center">现汇买入价</span>
          <span class="exchange-quotation__menuright text-center">现汇卖出价</span>
        </div>
      </div>
        <div class="exchange-quotation__item" v-for="exchangeQuotation in exchangeQuotationShown">
          <ExchangeQuotationCard  :currency="exchangeQuotation.curCode" :buyamount="exchangeQuotation.buyPrice" :buyPic="exchangeQuotation.buyFlag" :saleamount="exchangeQuotation.sellPrice" :salePic="exchangeQuotation.sellFlag"></ExchangeQuotationCard>
        </div>
    </bfe-card>
  </div>
</template>

<script>
  import ExchangeQuotationCard from '@components/ExchangeQuotationCard'
  import _ from 'lodash'
  export default {
    name: 'ExchangeQuotation',
    // 组合其它组件
    extends: {},
    // 组件属性、变量
    props: {

    },
    // 变量
    data() {
      return {
        exchangeQuotationlist: [],
        showIndex: 0,
        maxShown: 6,
        loading: true,
        netError: false
      }
    },
    computed: {
      exchangeQuotationShown() {
        var end = this.showIndex + this.maxShown;
        if(end > this.exchangeQuotationlist.length) {
          end = this.exchangeQuotationlist.length;
        }
        for (var i = 0; i < this.exchangeQuotationlist.length; i++) {
          if (this.exchangeQuotationlist[i].buyFlag === "1") {
            this.exchangeQuotationlist[i].buyFlag = "http://22.11.27.32/image/up.png";
          }else {
            this.exchangeQuotationlist[i].buyFlag = "http://22.11.27.32/image/down.png";
          }
          if (this.exchangeQuotationlist[i].sellFlag === "1") {
            this.exchangeQuotationlist[i].sellFlag = "http://22.11.27.32/image/up.png";
          }else {
            this.exchangeQuotationlist[i].sellFlag = "http://22.11.27.32/image/down.png";
          }
          switch (this.exchangeQuotationlist[i].curCode) {
          case "202":
            this.exchangeQuotationlist[i].curCode = "美元";
            break;
          default:
          }
        }
        return _.slice(this.exchangeQuotationlist, this.showIndex, end)
      }
    },
    // 使用其它组件
    components: {
      'ExchangeQuotationCard': ExchangeQuotationCard
    },
    // 方法
    watch: {},
    methods: {
      queryExchangeQuotation() {
        this.loading = true;
        this.$bfw.post('MDgetExchangePrice', {

        }).then(res => {
          this.loading = false;
          this.exchangeQuotationlist = res.data.result.priceList;
        })
        .catch(err => {
          this.netError = true;
          this.loading = false;
          err
          // console.log(err);
        })
      },
      reload() {
        this.queryExchangeQuotation()
      }
    },
    // 生命周期函数
    beforeCreate() {},
    mounted() {
      this.queryExchangeQuotation()
    },
    beforeMounted() { }
  };
</script>

<style scoped>
.exchange-quotation{

}
.exchange-quotation__header{

}
.exchange-quotation__menu{
  min-height: 20px;
}
.exchange-quotation__title{
  border-bottom: 1px solid #dadada;
  padding: 10px 10px 10px 5px;
}
.exchange-quotation__headerright {
  color: #ba2a3e;
  float: right;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
}
.exchange-quotation__menuleft{
  font-weight: bold;
  font-size: 15px;
  margin-left: 10px;
}
.exchange-quotation__menumiddle{
  margin-left: 10%;
  font-weight: bold;
  font-size: 15px;
}
.exchange-quotation__menuright{
  float: right;
  font-weight: bold;
  font-size: 15px;
}
.exchange-quotation__item{
  margin-right: 0px;
  cursor: pointer;
}

</style>
