<template lang="html">
  <div class="financial-info">
    <bfe-card>
      <div slot="header" class="financial-info__header">
        <span class="financial-info__headerleft text-center">金融咨讯</span>
        <a class="financial-info__headerright text-center">更多订阅<i class="glyphicon glyphicon-menu-right"></i></a>
      </div>
      <div class="financial-info__body">
        <div class="financial-info__infos col-xs-4" v-for="info in infos">
          <img class="img-responsive" :src="info.titleImg"/>
          <ul class="financial-info__item clearfix">
            <li v-for="(item, index) in info.items" v-bind:class="index == 0 ? 'financial-info__firstitem': 'financial-info__defaultitem'">
              <a>{{item}}</a>
            </li>
          </ul>
        </div>
      </div>
    </bfe-card>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'FinancialInfo',
    // 组合其它组件
    extends: {},
    // 组件属性、变量
    props: {
    },
    // 变量
    data() {
      return {
        infos: []
      }
    },
    computed: {

    },
    // 使用其它组件
    components: {
    },
    // 方法
    watch: {},
    methods: {
    },
    // 生命周期函数
    beforeCreate() {},
    mounted() {
      var that = this;
      this.$http.get('/api/financialInfo')
        .then(res => {
          that.infos = res.data.financialInfos;
        })
        .catch(err => {
          err
        })
    },
    beforeMounted() {
    }
};
</script>

<style scoped>
.financial-info{

}
.financial-info__header a{
  float: right;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
}

.financial-info__item{
  padding-left: 0px;
  margin-top: 16px;
  margin-bottom: 16px;
}

.financial-info__item a{
  text-decoration: none;
  cursor: pointer;
  color: inherit;
}


.financial-info__firstitem{
  list-style:none;
  font-size: 16px;
  margin-bottom: 14px;
}

.financial-info__defaultitem{
  padding-left: 5px;
  margin: 2px;
}

</style>
