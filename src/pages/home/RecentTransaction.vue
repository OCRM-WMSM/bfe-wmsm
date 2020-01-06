<template lang="html">
  <div class="recent-transaction" v-loading='loading'>
    <bfe-card :body-style="{ padding: '0px'}">
      <div slot="header" class="recent-transaction__header">
        <span class="recent-transaction__headerleft text-center">最近交易</span>
        <a class="recent-transaction__headerright">更多</a>
      </div>
      <div class="recent-transaction__item" v-for="recentTrans in recentTransShown">
        <recent-trans  :transactiontype="recentTrans.tranService" :transaction="recentTrans.tranSummry"></recent-trans>
      </div>
    </bfe-card>
  </div>
</template>

<script>
import RecentTrans from '@components/RecentTrans'
import _ from 'lodash'
export default {
  name: 'RecentTransaction',
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
      recentTranslist: [],
      showIndex: 0,
      maxShown: 5
    }
  },
  computed: {
    recentTransShown() {
      var end = this.showIndex + this.maxShown;
      if(end > this.recentTranslist.length) {
        end = this.recentTranslist.length;
      }
      return _.slice(this.recentTranslist, this.showIndex, end)

    }
  },
  // 使用其它组件
  components: {
    'RecentTrans': RecentTrans
  },
  // 方法
  watch: {},
  methods: {
    queryRecentTrans() {
      this.loading = true;
      this.$bfw.post('MDgetLastTrans', {

      }).then(res => {
        this.loading = false;
        this.recentTranslist = res.data.result.transList;
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
    this.queryRecentTrans()
  },
  beforeMounted() {

  }
};
</script>

<style scoped>
.recent-transaction{

}
.recent-transaction__header{

}
.recent-transaction__headerright {
  color: #ba2a3e;
  float: right;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
}
.recent-transaction__item{
  margin-right: 0px;
  cursor: pointer;
}

</style>
