<template lang="html">
  <div class="product-card" v-loading='loading'>
          <div class="product-card__body row">
            <div class="product-card__card">
              <div v-for="insurancecard in insurancecardShown" class="col-sm-6">
                <financial-card  :financialamount="insurancecard.amount" :Pic="insurancecard.vitalFlag" :productName="insurancecard.title" :financialdate="insurancecard.productDeadline" :rate="insurancecard.yearEarnings"></financial-card>
              </div>
            </div>
          </div>
  </div>
</template>

<script type="text/javascript">
import FinancialCard from '../components/FinancialCard'
import _ from 'lodash'
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
      loading: true,
      netError: false,
      insurancecard: [],
      showIndex: 0,
      maxShown: 4
    }
  },
  computed: {
    insurancecardShown() {
      var end = this.showIndex + this.maxShown;
      if(end > this.insurancecard.length) {
        end = this.insurancecard.length;
      }
      for (var i = 0; i < this.insurancecard.length; i++) {
        if (this.insurancecard[i].vitalFlag === "1") {
          this.insurancecard[i].vitalFlag = "http://22.11.27.32/image/recommend.png";
        }else {
          this.insurancecard[i].vitalFlag = "";
        }
      }
      return _.slice(this.insurancecard, this.showIndex, end)
    }

  },
  // 使用其它组件
  components: {
    'FinancialCard': FinancialCard
  },
  // 方法
  watch: {},
  methods: {
    queryInsurancecard() {
      this.loading = true;
      this.$bfw.post('MDgetProduct', {
        productType: '2'
      }).then(res => {
        this.loading = false;
        this.insurancecard = res.data.result.productList;
      }).catch(err => {
        this.loading = false;
        this.netError = true;
        err
      })
    }
  },
  // 生命周期函数
  beforeCreate() {},
  mounted() {
    this.queryInsurancecard()
  },
  beforeMounted() {

  }
};
</script>

<style scoped>
.product-card{

}
.product-card__header{
  padding: 0px
}
.product-card__header a{
  float: right;
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

</style>
