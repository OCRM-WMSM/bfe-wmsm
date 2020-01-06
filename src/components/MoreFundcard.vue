<template lang="html">
  <div class="product-card" v-loading='loading'>
          <div class="product-card__body row">
            <div class="product-card__card">
              <div v-for="fundcard in fundcardShown" class="col-sm-6">
                <financial-card  :financialamount="fundcard.amount" :Pic="fundcard.vitalFlag" :productName="fundcard.title" :financialdate="fundcard.productDeadline" :rate="fundcard.yearEarnings"></financial-card>
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
        fundcard: [],
        showIndex: 0,
        maxShown: 4
      }
    },
    computed: {
      fundcardShown() {

        var end = this.showIndex + this.maxShown;
        if(end > this.fundcard.length) {
          end = this.fundcard.length;
        }
        //console.log(this.financialdatas[1].vitalFlag);
        for (var i = 0; i < this.fundcard.length; i++) {
          if (this.fundcard[i].vitalFlag === "1") {
            this.fundcard[i].vitalFlag = "http://22.11.27.32/image/recommend.png";
          }else {
            this.fundcard[i].vitalFlag = "";
          }
        }
        return _.slice(this.fundcard, this.showIndex, end)

      }

    },
    // 使用其它组件
    components: {
      'FinancialCard': FinancialCard
    },
    // 方法
    watch: {},
    methods: {
      queryFundcard() {
        this.loading = true;
        this.$bfw.post('MDgetProduct', {
          productType: '1'
        }).then(res => {
          this.loading = false;
          this.fundcard = res.data.result.productList;
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
      this.queryFundcard()
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
