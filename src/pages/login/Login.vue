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
        <div class="col-md-3">
          <div class="online-helper">
            <img src="../../assets/img/online-helper.png"/>
            <a title="在线客服">在线客服</a>
            <img src="../../assets/img/lang-english.png"/>
            <a title="English">English</a>
            <img src="../../assets/img/login-help.png"/>
            <a title="帮助">帮助</a>
          </div>
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
              <span>
                <span lan="l6278" _zipIdx="40">首次登录时，请下载并安装</span>
                <a href="https://dlsev.boc.cn/support/secWidgets/SecEdit.BOC.exe" urllan="url.secDownloadUrl">Windows</a>
                <span lan="l14796" _zipIdx="40">或</span>
                <a href="https://dlsev.boc.cn/support/secWidgets/npBOCMACSip_Product.pkg" urllan="url.secDownloadUrl.Mac">Mac</a>
                <span lan="l4126" _zipIdx="40">“网上银行登录安全控件”</span>
                <span lan="l10641" _zipIdx="40">。</span>
              </span>
            </li>
            <li class="sf-hint">
              <label><b>·</b></label>
              <span>
                <span lan="l6280" _zipIdx="40">请持有中银E盾的客户，下载并安装</span>
                <a href="https://dlsev.boc.cn/support/drivers/BOC_TotalPackage.exe" urllan="url.USBKeyMgr">Windows</a>
                <span lan="l14796" _zipIdx="40">或</span>
                <a href="https://dlsev.boc.cn/support/drivers/BOC_Setup.dmg" urllan="url.USBKeyMgr.Mac">Mac</a>
                <span lan="l6281" _zipIdx="40">“USBKey管理工具”</span>
                <span lan="l10641" _zipIdx="40">。</span>
              </span>
            </li>
            <li class="sf-hint">
              <label><b>·</b></label>
              <span lan="l4627" _zipIdx="40">网上银行服务使用完毕后，请点击页面右上角的“安全退出”按钮退出服务。</span>
            </li>
            <li class="sf-hint">
              <label><b>·</b></label>
              <span lan="l6282" _zipIdx="40">通过银行柜台注册的网银客户，在首次登录时，请使用注册时获取的“网银初始用户名”。首次登录成功后，您可对登录用户名重新进行设定。</span>
            </li>
          </ul>
        </div>
        <div class="col-sm-6">
          <span class="nav-front">|</span>
          <h4 class="nav-title"><b>在线服务</b></h4>
          <ul class="os-box">
            <dl class="col-xs-3">
              <dd><a>在线开户</a></dd>
              <dd><a>网点预约</a></dd>
              <dd><a>申请贷款</a></dd>
              <dd><a>回单验证</a></dd>
            </dl>
            <dl class="col-xs-3">
              <dd><a>申请信用卡</a></dd>
              <dd><a>中银快付</a></dd>
              <dd><a>协议支付</a></dd>
              <dd><a>快捷支付</a></dd>
            </dl>
            <dl class="col-xs-3">
              <dd><a>预保留支付</a></dd>
              <dd><a>服务热线</a></dd>
              <dd><a>回单验证</a></dd>
              <dd><a>常见问题</a></dd>
            </dl>
            <dl class="col-xs-3">
              <dd><a>他行转账查询</a></dd>
              <dd><a>电子银行章程</a></dd>
              <dd><a>网银业务规则</a></dd>
              <dd><a>CA证书下载</a></dd>
            </dl>
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
  width: 159px;
  height: 47px;
  margin: 18px auto;
  overflow: hidden;
  background-image: url(../../assets/img/logo-origin.png);
  background-size: cover;
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
