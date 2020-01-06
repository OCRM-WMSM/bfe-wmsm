<template>
  <div class="container-fluid home-body">
    <div class="row">
      <div class="col-md-3" style="padding-right:7px">
        <home-login class="home-body__widget"></home-login>
        <recent-transaction v-if="isLogin" class="home-body__widget"></recent-transaction>
        <exchange-quotation class="home-body__widget"></exchange-quotation>
        <service-area class="home-body__widget"></service-area>
      </div>
      <div class="col-md-9" style="padding-left:7px">
        <picture-carousel v-if="!isLogin" class="home-body__widget"></picture-carousel>
        <asset-overview v-if="isLogin" class="home-body__widget"></asset-overview>
        <product-card class="home-body__widget"></product-card>
        <account-overview v-if="isLogin" class="home-body__widget"></account-overview>
        <FinancialCalender v-if="isLogin" class="home-body__widget"></FinancialCalender>
        <financial-info class="home-body__widget"></financial-info>
      </div>
    </div>
    <div class="row">
      <bottom-ads></bottom-ads>
    </div>

  </div>

</template>

<script>
  import HomeLogin from '@pages/home/HomeLogin'
  import BocCard from '@components/boc-card/BocCard'
  import AccountOverview from '@components/AccountOverview'
  import FinancialCalender from '@pages/home/FinancialCalender'
  import BottomAds from '@components/BottomAds'
  import ServiceArea from '@components/ServiceArea'
  import PictureCarousel from '@pages/home/PictureCarousel'
  import AssetOverview from '@pages/home/AssetOverview'
  import ProductCard from '@pages/home/ProductCard'
  import FinancialInfo from '@components/FinancialInfo'
  import RecentTransaction from '@pages/home/RecentTransaction'
  import ExchangeQuotation from '@pages/home/ExchangeQuotation'

  export default {

    methods: {

    },
    components: {
      'HomeLogin': HomeLogin,
      'BocCard': BocCard,
      'AccountOverview': AccountOverview,
      'FinancialCalender': FinancialCalender,
      'BottomAds': BottomAds,
      'ServiceArea': ServiceArea,
      'PictureCarousel': PictureCarousel,
      'AssetOverview': AssetOverview,
      'ProductCard': ProductCard,
      'FinancialInfo': FinancialInfo,
      'RecentTransaction': RecentTransaction,
      'ExchangeQuotation': ExchangeQuotation
    },
    computed: {
      isLogin() {
        if(this.$store.state.token) {
          return true
        } else {
          return false
        }
      }
    }
  }

</script>

<style scoped>
.home-body{
  margin-top: 0px;
  margin-bottom: 16px;
}
.piechart_pie{
  margin-top: 16px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 16px;
}

.home-body__widget{
  margin-top: 14px;
  margin-bottom: 14px;
}

</style>
