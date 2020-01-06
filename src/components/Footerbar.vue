<template>
  <div class="footer-bar">
    <footer class="container">
      <div class="row">
        <div class="footer-links col-sm-9  text-center">
          <dl class="col-xs-4">
            <dt>服务支持</dt>
            <dd><a>打印本页</a></dd>
            <dd><a>下载中心</a></dd>
            <dd><a>功能体验</a></dd>
          </dl>
          <dl class="col-xs-4">
            <dt>帮助中心</dt>
            <dd><a>功能地图</a></dd>
            <dd><a>功能演示</a></dd>
            <dd><a>在线客服</a></dd>
          </dl>
          <dl class="col-xs-4">
            <dt>关注我们</dt>
            <dd><a>新浪微博</a></dd>
            <dd><a>官方微信</a></dd>
            <dd><a>手机银行</a></dd>
          </dl>
        </div>
        <div class="col-sm-3 footer-callcenter text-center">
          <p>
            24小时客户服务热线
          </p>
          <img class="footer-callcenter-logo" src="../assets/img/95566.png"/>
        </div>
      </div>
      <div class="footer-slogon text-center">
        <p>
          中国银行股份有限公司 版权所有
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Footerbar',
    data() {
      return {
      }
    }
  }
</script>
<style>
.footer-bar{
  padding-top: 30px;
  border-style: solid;
  border-color: #dadada;
  border-width: 1px 0px 0px 0px;
  background-color: #ffffff;
  min-height: 250px;
  width:100%;
  z-index: 1000;
}
.footer-bar .container{
  width:1002px;
}
.footer-links dl dt{
  margin: 10px 0 0;
  font-size: 14px;
}
.footer-links dl dd{
  margin: 10px 0 0;
}
.footer-links dl dd a{
  color: #979797;
  font-size: 14px;
  text-decoration: none;
}
.footer-callcenter p{
  margin: 10px 0 0;
  font-size: 14px;
}
.footer-callcenter-logo{
  display: inline-block;
  vertical-align: middle;
}
.footer-slogon p{
  margin: 10px 0 0;
  font-size: 14px;
  color: #979797;
  display: inline-block;
  vertical-align: middle;
}
</style>
