<template lang="html">
  <div class="boc-card">
    <bfe-card :body-style="{ padding: '12px'}" :choosen="choosen" v-if="size === 'big'">
      <div class="boc-card__bigimg">
        <img :src="cardPic" class="img-responsive" />
      </div>
      <div class="boc-card__bigdetail clearfix">
        <span>
          {{ cardNum }}
        </span>
        <div class="clearfix">
          <span class="boc-card__bigdetailleft">
            账面余额
          </span>
          <span class="boc-card__bigdetailright">{{currency}} {{amount}}</span>
        </div>
      </div>
    </bfe-card>
    <bfe-card v-if="size === 'small'" :choosen="choosen" :body-style="{ padding: '12px'}" class="">
      <div class="clearfix">
        <img :src="cardPic" class="boc-card__smallimg img-responsive" />
        <div class="boc-card__smalldetail">
          <div>
            {{ cardNum }}
          </div>
          <div>
            {{cardType}}
          </div>
        </div>
      </div>
      <div class="boc-card__smalldetail2 clearfix">
        <span>
          账面余额
        </span>
        <span class="boc-card__bigdetailright">{{currency}} {{amount}}</span>
      </div>
    </bfe-card>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'BocCard',
    // 组合其它组件
    extends: {},
    // 组件属性、变量
    props: {
      size: {
        type: String,
        default: 'big'
      },
      amount: {
        type: String,
        default: '0.00'
      },
      cardNum: {
        type: String,
        default: '6227 **** 8888'
      },
      cardType: {
        type: String,
        default: '长城电子借记卡'
      },
      cardPic: {
        type: String,
        default: './static/img/boc-card-3.png'
      },
      flag: {
        type: Boolean,
        default: false
      },
      currency: {
        type: String,
        default: '人民币'
      },
      choosen: {
        type: Boolean,
        default: false
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
    methods: {
    },
    // 生命周期函数
    beforeCreate() {},
    mounted() {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .boc-card{
    width: 210px;
  }
  .boc-card__bigimg{
    width: 100%;
    display: block;
  }
  .boc-card__smallimg{
    width: 69px;
    height: 45px;
    float: left;
  }
  .boc-card__bigdetail{
    padding: 5px;
  }
  .boc-card__smalldetail{
    float: right;
  }
  .boc-card__smalldetail2{
    padding: 5px;
  }
  .boc-card__bigdetailright{
    float: right;
    font-weight: bold;
  }
</style>
