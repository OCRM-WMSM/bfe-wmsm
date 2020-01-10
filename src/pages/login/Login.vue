<template>
  <div class="login">
    <div class="login-header">
      <div class="container">
        <div class="col-md-3">
          <div class="logo">
              <a href="http://www.boc.cn/" title="中国银行">
                <!--
                <i class="iconfont boc-logo"></i>
                <i class="iconfont boc-logo-url"></i>
                -->
              </a>
          </div>
        </div>
        <div class="col-md-6">
        </div>
      </div>
    </div>
    <div class="login-bg">
      <div class="container">
        <div class="col-md-8"></div>
        <div class="col-md-4">
          <div class="login-box-warp">
            <login-box></login-box>
          </div>
        </div>
        <!--
        <img v-bind:src=" '../../assets/img/' + loginbg">
        <div class="container page-container">
        </div>
      -->
      </div>
    </div>
    <div class="login-footer">
      <div class="container">
        <div class="col-sm-6">
          <ul class="sn-box">
            <span class="nav-front">|</span>
            <h4 class="nav-title"><b>安全提示</b></h4>
            <li class="sf-hint">
              <label><b>·</b></label>
              <span lan="l6282" _zipIdx="40">敬请使用Chrome70及以上版本浏览器</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginBox from '@components/LoginBox'
export default {
  name: 'LoginPage',
  data() {
    return {
      loginbg: 'login-bg.png'
    }
  },
  components: {
    'LoginBox': LoginBox
  }
}
</script>

<style>
.login {
  font: "微软雅黑", "Microsoft YaHei", Arial, sans-serif;
  background: #fff;
}
.login-header {
  padding: 0 0;
  height: 87px;
}
.logo {
  width: 550px;
  height: 40px;
  --margin: 18px auto;
  margin-top:25px;
  overflow: hidden;
  background-image: url(../../assets/img/banner_logo.png);
  --background-size: cover;
  background-repeat: no-repeat;
}
.logo a {
  position: absolute;
  width: 159px;
  height: 47px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}
.online-helper {
  margin: 18px auto;
  padding-top: 10px;
}
.online-helper a{
  color: #545454;
  position: relative;
  margin-right: 10px;
  text-decoration: none;
  cursor: pointer;
}

.logo .boc-logo {
  position: relative;
  font-size: 36px;
  top: -9px;
}
.logo .boc-logo-url {
  font-size: 50px;
  position: relative;
  top: -52px;
}
.login-bg {
  z-index: 9;
  top: 0;
  left: 0;
  background-image: url(../../../static/img/login-bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 540px;
}
.login-box-warp {
  position: absolute;
  top: 90px;
  right: 60px;
  width: 360px;
}
.login-footer {
  padding-top: 12px;
  padding-left: 0;
  padding-right: 0;
}
.nav-front {
  margin: 0 3px 0 0;
  font-size: 15px;
  font-weight: 900;
  color: #ba2a3e;
}
.nav-title {
  display: inline;
}
.sf-hint {
  color: #989898;
  margin-top: 10px;
}
.sf-hint b {
  color: #ba2a3e
}
.sf-hint a {
  color: #ba2a3e
}
.os-box {
  padding: 0;
}
.os-box dd{
  margin: 10px 0 0 0;
}
.os-box dd a{
  color: #ba2a3e;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
}
</style>
