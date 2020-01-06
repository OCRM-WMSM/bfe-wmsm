<template>
  <div class="asset-overview" v-loading='loading'>
    <bfe-card :refreshFn="reload" :hasError="netError">
      <div slot="header" class="asset-overview__header clearfix">
        <span class="asset-overview__headerleft text-center">资产负债概览</span>
        <a class="asset-overview__headerright">查看详情<i class="glyphicon glyphicon-menu-right"></i></a>
      </div>
      <div class="assets-overiew__pie">
        <div class="col-sm-1">
        </div>
        <div class="col-sm-4">
          <pie-chart :piechartdata="piechartdata"></pie-chart>
        </div>
        <div class="col-sm-2">
        </div>
        <div class="col-sm-4">
          <pie-chart :piechartdata="piechartdata1"></pie-chart>
        </div>
      </div>
    </bfe-card>
  </div>
</template>

<script>
import PieChart from '@components/PieChart'

export default {
  name: 'AssetOverview',
  // 组合其它组件
  extends: {},
  // 组件属性、变量
  props: {

  },
  // 变量
  data() {
    return {
      loading: true,
      netError: false
    }
  },
  computed: {
  },
  // 使用其它组件
  components: {
    'PieChart': PieChart
  },
  // 方法
  watch: {},
  methods: {
    piechartdata(piecb) {
      this.loading = true;
      this.$bfw.post('MDgetAssert', {

      })
      .then(res => {
        this.loading = false;
        var adviseLists = [];
        for (var i = 0; i < res.data.result.assertLIst.length; i++) {
          if (res.data.result.assertLIst[i].type === "0") {
            var obj = {
              amount: res.data.result.assertLIst[i].amount,
              crtDate: res.data.result.assertLIst[i].crtDate,
              curCode: res.data.result.assertLIst[i].curCode,
              id: res.data.result.assertLIst[i].id,
              title: res.data.result.assertLIst[i].title,
              type: res.data.result.assertLIst[i].type
            }
            adviseLists.push(obj);
          }
        }
        if (piecb && typeof piecb === 'function') {
          piecb(adviseLists);
        }
      })
      .catch(err => {
        this.netError = true;
        this.loading = false;
        err
      })
    },
    piechartdata1(piecb) {
      this.$bfw.post('MDgetAssert', {

      }).then(res => {
        //console.log(res.data.result.assertLIst);
        var adviseLists = [];
        for (var i = 0; i < res.data.result.assertLIst.length; i++) {
          if (res.data.result.assertLIst[i].type === "1") {
            var obj = {
              amount: res.data.result.assertLIst[i].amount,
              crtDate: res.data.result.assertLIst[i].crtDate,
              curCode: res.data.result.assertLIst[i].curCode,
              id: res.data.result.assertLIst[i].id,
              title: res.data.result.assertLIst[i].title,
              type: res.data.result.assertLIst[i].type
            }
            adviseLists.push(obj);
          }
        }
        if (piecb && typeof piecb === 'function') {
          piecb(adviseLists);
        }
      })
      .catch(err => {
        this.netError = true;
        this.loading = false;
        err
      })
    },
    reload() {
      this.piechartdata();
      this.piechartdata1();
    }
  },
  // 生命周期函数
  beforeCreate() {},
  mounted() {
    this.piechartdata()
  },
  beforeMounted() {

  }
};
</script>

<style scoped>
.asset-overview{

}
.assets-overiew__pie{
  margin-bottom: 10px;
}
.asset-overview__header{
  padding: 0px
}
.asset-overview__header a{
  float: right;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
}
.asset-overview__headermiddle{
  font-weight: bold;
  padding: 5px;
}
.asset-overview__headerleft{

}
.asset-overview__body{

}
.asset-overview__card{
  width: 100%;
  display: inline;
}

</style>
