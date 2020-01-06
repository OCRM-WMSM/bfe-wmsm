<template>
  <div class="home-login">
    <bfe-card class="box-card" :body-style="{ padding: '0px'}">
      <div class="home-login-top">
        <div v-if="isLogin">
          <div class="home-login-avatar">
            <img class="avatar" :src="useravatar">
          </div>
          <div class="home-login-info">
            <b>{{username}}{{gender}}({{userid}})</b>{{welcomemessage}}</br>
            {{lastloginmessage}}{{userlastlogin}}
          </div>
        </div>
        <div v-else>
          <div class="home-login-logo">
          </div>
          <div class="home-login-message">
            {{loginmessage}}
          </div>
          <div class="home-login-button">
            <button class="submit" @click="gotologin()">{{loginbutton}}
            </button>
          </div>
        </div>
      </div>
      <div class="home-login-bottom">
        <ul class="lonin-link-line">
          <li v-for="link in linkitems1" class="login-link-item">
            <img class="login-link-icon" :src="link.itemiconurl"></img></br>
            <router-link class="login-link-url" :to="link.itemurl">{{link.itemname}}</router-link>
          </li>
        </ul>
        <ul class="lonin-link-line">
          <li v-for="link in linkitems2" class="login-link-item">
            <img class="login-link-icon" :src="link.itemiconurl"></img></br>
            <router-link class="login-link-url"  :to="link.itemurl">{{link.itemname}}</router-link>
          </li>
        </ul>
      </div>
    </bfe-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      loginmessage: '欢迎您使用中国银行网上银行！',
      loginbutton: '登 录',
      welcomemessage: ', 您好!',
      lastloginmessage: '上次登录 : ',
      ladywelcome: '女士',
      gentlewelcome: '先生',
      defaultavatar: '../../static/img/default_avatar.png',
      linkitems1: [{
        itemname: '账户查询',
        itemurl: '',
        itemiconurl: './static/img/item1.png'
      },
      {
        itemname: '转账汇款',
        itemurl: '',
        itemiconurl: '../../static/img/item2.png'
      },
      {
        itemname: '生活服务',
        itemurl: '',
        itemiconurl: '../../static/img/item3.png'
      }],
      linkitems2: [{
        itemname: '信用卡',
        itemurl: '',
        itemiconurl: '../../static/img/item4.png'
      },
      {
        itemname: '结汇购汇',
        itemurl: '',
        itemiconurl: '../../static/img/item5.png'
      },
      {
        itemname: '跨境汇款',
        itemurl: '',
        itemiconurl: '../../static/img/item6.png'
      }]
    }
  },

  computed: {
    isLogin() {
      if(this.$store.state.token) {
        return true
      } else {
        return false
      }
    },
    userid() {
      return this.$store.state.user.id
    },
    username() {
      return this.$store.state.user.name
    },
    gender() {
      if(this.$store.state.user.gender === "1") {
        return this.gentlewelcome
      }
      if (this.$store.state.user.gender === "0") {
        return this.ladywelcome
      }else {
        return null
      }
    },
    useravatar() {
      if(this.$store.state.user.avatar) {
        return this.$store.state.user.avatar
      } else {
        return this.defaultavatar
      }

    },
    userlastlogin() {
      return this.$store.state.user.lastlogintime
    }
  },

  methods: {
    gotologin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 350px;
  width: auto;
}
.home-login-top {
  height: 194px;
  background-image: url(../../assets/img/home-login-bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-bottom: 1px solid #ddd;
  padding: 10px;
}
.home-login-logo {
  margin-top: 20px;
  background-image: url(../../assets/img/bocnet-logo.png);
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center center;
  height: 48px;
}
.home-login-message {
  margin-top: 16px;
  font-size: 14px;
  text-align: center;
}
.home-login-button {
  text-align: center;
}
.submit {
  width: 160px;
  height: 30px;
  border: 0;
  margin-top: 12px;
  display: inline-block;
  overflow: hidden;
  text-align: center;
  line-height: 20px;
  font-size: 16px;
  color: #fff;
  background: #ba2a3e;
  border-radius: 3px;
  cursor: pointer;
  font: 150%;
}
.home-login-avatar {
  height: 130px;
  width: 100%;
  text-align: center;
}
.avatar {
  margin: 12px;
  height: 100px;
  width: 100px;
  border-radius: 50px;
}
.home-login-bottom {
  height: 156px;
}
.lonin-link-line {
  padding: 0;
  margin: 0;
  height: 78px;
  width: 100%;
  border-bottom: 1px solid #dadada;
  display: block;
}
ul li {
  list-style: none;
}
.login-link-item {
  width: 33.333333333%;
  height: 78px;
  padding: 0;
  border-left: 1px solid #ddd;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}
.login-link-icon {
  margin-top: 15px;
}
.login-link-url {
  position: relative;
  top:4px;
  color: #555555;
  text-decoration: none;
}
</style>
