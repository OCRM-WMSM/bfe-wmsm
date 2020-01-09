<template>
  <div class="topbar">
    <div class="container">
      <div class="topbar__content row">
        <div class="col-sm-4"></div>
        <div class="topbar__search col-sm-4">
          <bfe-input class="" placeholder="功能搜索" icon="search" size="mini"></bfe-input>
        </div>
        <div class="topbar__links col-sm-4">
          <a>个人设置</a>
          <router-link to="/resetPwd" class="text-center" ><a>密码修改</a></router-link>
          <a>在线客服</a>
          <a @click="changeLan">{{$t('topbar.changelan')}}</a>
          <a @click="logout">安全退出</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Topbar',
    computed: {
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
      },
      changeLan() {
        if(this.$i18n.locale === 'zh') {
          this.$i18n.locale = 'en'
        }else{
          this.$i18n.locale = 'zh'
        }
      }
    }
  }
</script>
<style>
.topbar{
  background-color: #ffffff
}

.topbar .container {
  width: 1002px;
}
.topbar__content{
  padding-top: 10px;
  padding-bottom: 10px;
}
.topbar__links{

}

.topbar__links a{
  margin-left: 4px;
  margin-right: 4px;
  cursor: pointer;
  text-decoration: none;
}

.topbar__links a :hover{
  text-decoration: none;
}

</style>
