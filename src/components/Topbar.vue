<template>
  <div class="topbar">
    <div class="container" >
      <div class="topbar__content">
        <div class="col-sm-10">
          <div class="logo">
          </div>
        </div>
        <div class="topbar__links col-sm-2">
          <div class="row row-right-up" >
            <bfe-icon name="person" size="20"></bfe-icon><a>总行业务管理人员</a>
            <a>{{ username }}</a>
          </div>
          <div class="row row-right-up" >
            <router-link to="/UpdatePwd" class="text-center" ><a>密码修改</a></router-link>
            <a @click="logout">安全退出</a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Topbar',
    data() {
      return {
        username: this.$store.state.user.name
      }
    },
    computed: {
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.push("/login");
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
  background-color: #ffffff;
  padding: 0px;
}

.topbar .container {
  width: 100%;
  margin: 0px
}
.topbar__content{
  padding: 0px;
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

.logo {
  width: 430px;
  height: 40px;
  --margin: 18px auto;
  margin-top:5px;
  margin-left:5px;
  overflow: hidden;
  background-image: url(../assets/img/banner_logo.png);
  --background-size: cover;
  background-repeat: no-repeat;
}
.row-right-up {
  --padding-left:20%;
  margin-top:5px
}

</style>
