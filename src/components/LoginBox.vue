<template>
  <div class="login-box">
      <div class="login-block">
        <div class="message-block">
          <div v-show="showmessage">
            <div class="login-message" >
              <p class="error">
                {{logingerror}}
              </p>
            </div>
          </div>
        </div>
        <div class="field username-field">
          <!--
          <label>
            <i class="glyphicon glyphicon-user"></i>
          </label>
          -->
          <span class="iconfont">
            <input class="login-text" v-model="username" placeholder="用户名" @keyup.enter="login()">
          </span>
        </div>
        <div class="field password-field">
          <!--
          <label>
            <i class="glyphicon glyphicon-lock"></i>
          </label>
          -->
          <span class="iconfont">
            <input class="login-text" type="password" v-model="pwd" placeholder="登录密码" @keyup.enter="login()">
          </span>
        </div>
        <div class="hint-message">
          {{hintmessage}}
        </div>
        <div class="submit-button">
          <button class="submit" @click="login()">{{loginbutton}}
          </button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'BocLogin',
  data() {
    return {
      username: '',
      pwd: '',
      showmessage: false,
      logingerror: '请输入用户名和密码',
      hintmessage: '用户名和密码区分大小写字母',
      loginbutton: '登 录'
    }
  },

  methods: {
    check(username, pwd) {
      if(!username) {
        this.showmessage = true;
        return false;
      }
      if(!pwd) {
        this.showmessage = true;
        return false;
      }
      return true;
    },
    login() {
      if(!this.check(this.username, this.pwd)) {
        return;
      }
      this.showmessage = false;
      /**
      this.$http.get('/api/userlogin')
        .then(res => {
          let token = res.data.token;
          let user = res.data.user;
          this.$store.dispatch('saveToken', token);
          this.$store.dispatch('saveUser', user);
          this.$router.go(-1);
        })
        .catch(err => {
          console.log(err);
        })
      **/
      this.$http.post('/api/login', {
        loginName: this.username,
        password: this.pwd,
        imageCode: ''
      }).then(res => {
        //当登录成功时
        if(this.$CU.isSuccess(res)) {
          //从res中获取登录用户信息
          /**var user = {
            id: this.$CU.getResData(res).empNo,
            name: this.$CU.getResData(res).empName,
            gender: this.$CU.getResData(res).holderSex,
            lastlogintime: this.$CU.getResData(res).lastLoginTime,
            avatar: this.$CU.getResData(res).holderImage,
            pwdExpired: this.$CU.getResData(res).pwdExpired,
            branchid: this.$CU.getResData(res).branchId,
            branchname: this.$CU.getResData(res).branchName
          }
          //当密码过期时引导客户修改密码
          if(user.pwdExpired) {
            this.$store.dispatch('saveUser', {
              user: user,
              token: 'xxxxxxx'
            });
            // this.$store.dispatch('saveToken')
            //this.$alert(res.code, '您的密码已过期，请重置密码后再登录。', {confirmButtonText: '重置密码'});
            this.$router.go(-1);
          } else {
            //this.$store.dispatch('saveToken', token);
            this.$store.dispatch('saveUser', user);
            this.$router.go(-1);
          }*/
          var user = {
            token: this.$CU.getResData(res).data.token
          }
          this.$store.commit('SAVE_USER', user);
          this.$store.commit('SAVE_TOKEN', user.token)
          console.log(user.token);
          this.$router.push("/home");
        } else {
          this.$alert(this.$CU.getErr(res).message + '(' + this.$CU.getErr(res).code + ')', '报错啦', {confirmButtonText: '确定'});
        }

      })
      .catch(err => {
        // console.log(err);
        err
        this.$alert('无法连接后台，请稍后再试！', '网络错误：', {confirmButtonText: '确定'});
      })
    }
  }
}
</script>

<style scoped>
.login-box {
  background-color: #fff;
  height: 360px;
  padding: 16px 16px 16px 16px;
  user-select: none;
}
.login-switch {
  width: 28px;
  height: 28px;
  line-height: 52px;
  position: absolute;
  right: 5px;
  top: 5px;
  background-image: url(../assets/img/qr-switch.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.field label {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background: #ddd;
  text-align: center;
  position: relative;
  left: 1px;
  top: 1px;
  outline: 0;
}
.login-text {
  width: 100%;
  font-size: 15px;
  line-height: 18px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 11px 11px 11px 11px;
  border: 1px solid #ddd;
}
.login-block {
  padding: 8px 16px 16px 16px;
}
.message-block {
  height: 24px;
}
.login-message {
  width: 100%;
  border: 1px solid;
  border-color: #ffb4a8;
  background-color: #fef2f2;
  color: #6C6C6C;
  text-align: center;
  height: 24px;
}
.hint-message {
  margin-top: -4px;
  color: #d4d4d4;
  padding-left: 10px;
  text-align: left;
  height: 24px;
}
.boc-logo {
  background-image: url(../assets/img/bocnet-logo.png);
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center center;
  height: 60px;
  width: 100%;
}
.submit {
  width: 100%;
  height: 40px;
  border: 0;
  margin-top: 20px;
  display: inline-block;
  overflow: hidden;
  text-align: center;
  line-height: 20px;
  font-size: 16px;
  color: #fff;
  background: #be2e3e;
  border-radius: 3px;
  cursor: pointer;
  font: 150%;
}
.login-link {
  position: relative;
  margin: auto;
  padding: 0 16px 0 16px;
}
ul li {
  list-style: none;
}
li {
  float: left;
  position: relative;
}
.login-link-left {
  padding: 0;
  float: left;
}
.login-link-right {
  padding: 0;
  float: right;
}
.login-link a {
  display: inline;
  margin: 0 3px;
  white-space: nowrap;
  color: #be2e3e;
  cursor: pointer;
  text-decoration: none;
}
.nav-pipe {
  display: inline;
  margin: 0 3px;
  font-weight: 400;
  color: #ddd;
}
</style>
