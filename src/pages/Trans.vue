<template>
  <div class="trans container-fluid">
    <bfe-card class="trans__bfecard" v-loading='loading'>
      <div slot="header" class="trans__header">
        <span class="trans__headerleft text-center">中行内转账汇款</span>
      </div>
      <bfe-steps :active="activePage">
        <bfe-step title="填写转账信息"></bfe-step>
        <bfe-step title="确认转账信息"></bfe-step>
        <bfe-step title="转账完成"></bfe-step>
      </bfe-steps>
      <div v-show="isPage1">
        <div class="trans-info">
          <div class="top-line">
          </div>
          <div class="trans-account__title">
            <span> 选择付款账户</span>
          </div>
          <div class="trans-account" v-loading='cardloading'>
            <div class="account-overview__body container-fluid">
              <div class="account-overview__leftbutton">
                <img v-if="leftButton" @click="moveLeft" src="../assets/img/left-arrow.png"/>
              </div>
              <div class="account-overview__card clearfix">
                <div v-for="account in accountsShown" class="account-overview__carditem clearfix">
                  <boc-card @click.native="click(account)" :choosen='boccard(account.amount)' :size='cardsize' :amount="account.amount" :cardNum="account.accountNumber" :cardType="account.accountType" :cardPic="account.cardPic" :currency="account.currency" ></boc-card>
                </div>
              </div>
              <div class="account-overview__rightbutton">
                <img v-if="rightButton" @click="moveRight" src="../assets/img/right-arrow.png"/>
              </div>
            </div>
          </div>
        <div class="trans-account">
          <div class="row">
            <div class="col-md-3">
              <div class="trans-text">
                <span>收款人名称 :</span>
              </div>
              <div class="trans-text">
              </div>
              <div class="trans-text">
                <span>收款人账号 :</span>
              </div>
            </div>
          <div class="col-md-6">
              <bfe-autocomplete class="trans-input" v-model="actnamT" :fetch-suggestions="querySearchAsync" :placeholder='receivableaname' @select="handleSelect" ></bfe-autocomplete>
              <span class="trans-message" v-show="showmessage1">请输入正确格式收款人名称</span>
              <bfe-input class="trans-input" :placeholder='receivableaccount' v-model="actnumT"></bfe-input>
              <span class="trans-message" v-show="showmessage2">请输入正确格式收款人账号</span>
          </div>
            <div class="col-md-3">
              <div class="text-infor">
                <span>您可以直接输入收款人姓名,也可以从收款人名册选择</span>
              </div>
              <div class="text-account">
                <span>保存收款人名册</span><bfe-checkbox></bfe-checkbox>
              </div>
            </div>
          </div>
        </div>
          <div class="trans-account">
            <div class="row">
              <div class="col-md-3">
                <div class="trans-text">
                  <span>转账币种 :</span>
                </div>
                <div class="trans-text">
                  <span>转账金额 :</span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="trans-text">
                  <span>{{trans.trfCur}}</span>
                </div>
                  <bfe-input class="trans-input" placeholder="请输入金额" v-model="transamount"></bfe-input>
                  <span class="trans-message" v-show="showmessage3">请输入正确格式金额</span>
                </div>
                <div class="col-md-3">
                </div>
            </div>
          </div>
          <div class="trans-account">
              <div class="row">
                <div class="col-md-3">
                  <div class="trans-text">
                    <span>附言 :</span>
                  </div>
                  <div class="trans-text">
                    <span>短信通知收款人 :</span>
                  </div>
                  <div class="trans-text">
                    <span>转账方式 :</span>
                  </div>
                </div>
                <div class="col-md-6">
                  <bfe-input class="trans-input" v-model="postscript"></bfe-input>
                  <div class="check-box">
                    <bfe-checkbox></bfe-checkbox>
                  </div>
                  <div class="radio-group">
                    <bfe-radio-group v-model="transtype">
                      <bfe-radio-button label="立即执行"></bfe-radio-button>
                      <bfe-radio-button label="预约日期执行"></bfe-radio-button>
                      <bfe-radio-button label="预约周期执行"></bfe-radio-button>
                    </bfe-radio-group>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="text-infor">
                    <span>您可填写最多10个汉字或20个字符用于查询或短信通知</span>
                  </div>
                  <div class="trans-text">
                  </br>
                  </div>
                  <div class="text-tool">
                    <span>预约执行仅支持CA证书作为安全工具</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="trans-safe">
              <div class="col-md-3">
                <div class="transsafe">
                  <span class="trans-safe__title"> 请选择安全工具:</span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="safetool">
                  <bfe-radio-group v-model="safetool" id="safeToolGroup">
                      <bfe-radio-button v-for="label in labellistShown" :key="label.id" :label="label.safeName"></bfe-radio-button>
                  </bfe-radio-group>
                </div>
              </div>
              <div class="col-md-3">
                <div class="text-safe">
                  <span>您可以点击这里修改默认的安全工具,以便您快捷地完成相关交易</span>
                </div>
              </div>
            </div>
            <div class="button-submit">
              <bfe-button @click="nextPage1()">下一页</bfe-button>
              <bfe-button @click="reloadtrans()">重置</bfe-button>
            </div>
        </div>
      </div>
      <div v-show="isPage2">
        <div class="trans_confirm_header col-md-12">
          <div class="confirm_header_info col-sm-4">
            <div class="confirm_header_info_left">
              付款账户
              <boc-card :amount="trans.amountF" :cardNum="trans.actnumF" :cardType="trans.actTypeF" :cardPic="trans.cardPicF" :currency="trans.currencyF" size="small"></boc-card>
            </div>
          </div>
          <div class="confirm_header_info_bg col-sm-4">
            <div class="confirm_header_info_center">
              <li class="confirm_header_info_title col-sm-6">
                <ul>转账金额：</ul>
                <ul>币种：</ul>
                <ul>大写金额：</ul>
              </li>
              <li class="confirm_header_info_content col-sm-6">
                <ul class="trans_confirm_amt">{{trans.trfAmt}}</ul>
                <ul>{{trans.trfCur}}</ul>
                <ul>{{trans.amtInWord}}</ul>
              </li>
            </div>
          </div>
          <div class="confirm_header_info col-sm-4">
            <div class="confirm_header_info_right">
              收款账户
              <boc-card :amount="trans.amountT" :cardNum="trans.actnumT" :cardType="trans.actTypeT" :cardPic="trans.cardPicT" :currency="trans.currencyT" size="small"></boc-card>
            </div>
          </div>
        </div>
        <div class="trans_confirm_body col-md-12">
          <li class="trans_confirm_body_leftbox col-sm-6">
            <ul>手续费：</ul>
            <ul>执行方式：</ul>
            <ul>请输入手机验证码：</ul>
          </li>
          <li class="trans_confirm_body_rightbox col-sm-6">
            <ul>{{trans.fee}}</ul>
            <ul>{{trans.transType}}</ul>
            <ul>
              <input class="trans_mobtoken" type="password" v-model="trans.mobtoken" @keyup.enter="commit()" maxlength="6">
              <button class="trans_mobtoken_send_btn" :disabled="time > 0" @click="getsmstoken()">{{getsmsbutton}}</button>
            </ul>
          </li>
        </div>
        <div class="trans_confirm_footer col-md-12">
          <div class="trans_return_btn">
            <bfe-button @click="prvPage()">上一页</bfe-button>
          </div>
          <div class="trans_commit_btn">
            <bfe-button @click="commit()">{{commitbutton}}</bfe-button>
          </div>
        </div>
      </div>
      <div v-show="isPage3">
        <div class="trans_success_page">
          <div class="trans_success_top">
            <img src="../../static/img/trans-success.png"/>
            <div class="trans_success_top_right">
              <div class="trans_success_top_words">交易成功</div>
              <div class="trans_success_top_amt_line">
                <div class="trans_success_top_amt">{{trans.trfAmt}}</div>
                <div class="trans_success_top_amt_cur">&nbsp;元</div><br>
              </div>
            </div>
          </div>
          <ul class="trans_success_body">
            <li class="success_body_title">
              <ul>付款账户名称</ul>
              <ul>付款账户</ul>
              <ul>交易序号</ul>
              <ul>手续费（优惠后）</ul>
              <ul>付款账户交易后余额</ul>
            </li>
            <li class="success_body_content">
              <ul>{{trans.actnamF}}</ul>
              <ul>{{trans.actnumF}}</ul>
              <ul>{{trans.transId}}</ul>
              <ul>{{trans.fee}}</ul>
              <ul class="success_body_content_balance_line">
                <div class="success_body_content_balance">
                  <div v-show="balanceHide">9999999999999999.00</div>
                </div>
                <div class="trans_success_balanceHideBtn">
                  <a @click="balanceHidding()">隐藏</a>
                </div>
              </ul>
            </li>
            <li class="success_body_title">
              <ul>收款账户名称</ul>
              <ul>收款账户</ul>
              <ul>收款银行</ul>
              <ul>交易时间</ul>
              <ul>附言</ul>
            </li>
            <li class="success_body_content">
              <ul>{{trans.actnamT}}</ul>
              <ul>{{trans.actnumT}}</ul>
              <ul>{{trans.bankNameT}}</ul>
              <ul>{{trans.tradeTime}}</ul>
              <ul>{{trans.remarks}}</ul>
            </li>
          </ul>
          <div class="trans_success_bottom">
            <div class="success_togo_title">猜您想去</div>
            <div class="success_togo_body">
              <li v-for="link in linkitems" class="success-link-item">
                <img class="success-link-icon" :src="link.itemiconurl"></img></br>
                <router-link class="success-link-url" :to="link.itemurl">{{link.itemname}}</router-link>
              </li>
            </div>
          </div>
        </div>
        <div class="trans_success_btn">
          <div class="trans_success_confirm_btn" @click="firstPage()">
            <bfe-button>确定</bfe-button>
          </div>
          <div class="trans_success_return_btn" @click="firstPage()">
            <bfe-button>再做一笔</bfe-button>
          </div>
        </div>
      </div>
    </bfe-card>
  </div>
</template>

<script>
import BocCard from '../components/boc-card/BocCard.vue'
import ReceivableAccount from '../components/ReceivableAccount'

import _ from 'lodash'
export default {
  name: 'Trans',
  components: {
    'BocCard': BocCard,
    'ReceivableAccount': ReceivableAccount
  },
  data() {
    return {
      loading: false,
      activePage: 1,
      commitbutton: '提交',
      time: 0,
      receivableaname: '请输入收款人姓名，或企业名称',
      receivableaccount: '请输入收款人账号',
      search: './static/img/search.png',
      transamount: '',
      transtype: '立即执行',
      safetool: '',
      safetoolType: '',
      postscript: '',
      actnamT: '',
      actnumT: '',
      showmessage1: false,
      showmessage2: false,
      showmessage3: false,
      accounts: [],
      showIndex: 0,
      maxShown: 3,
      cardloading: true,
      netError: false,
      errorText: null,
      cardsize: 'small',
      cardchosed: '',
      labellist: [],
      restaurants: [],
      state4: '',
      timeout: null,
      trans: {
        transId: '',
        actseqF: '',
        actnumF: '',
        actnamF: '',
        actTypeF: '',
        bankNameF: '',
        amountF: '',
        currencyF: '',
        cardPicF: '',
        actseqT: '',
        actnumT: '',
        actnamT: '',
        actTypeT: '',
        bankNameT: '',
        amountT: '',
        currencyT: '',
        cardPicT: '',
        trfAmt: '',
        amtInWord: '',
        trfCur: '人民币/元',
        fee: '',
        transType: '',
        remarks: '',
        tradeTime: '',
        mobtoken: ''
      },
      linkitems: [{
        itemname: '账户查询',
        itemurl: '',
        itemiconurl: '../static/img/item1.png'
      },
      {
        itemname: '转账汇款',
        itemurl: '',
        itemiconurl: '../static/img/item2.png'
      },
      {
        itemname: '生活服务',
        itemurl: '',
        itemiconurl: '../static/img/item3.png'
      }],
      balanceHide: true
    }
  },
  computed: {
    isPage1() {
      return this.activePage === 1;
    },
    isPage2() {
      return this.activePage === 2;
    },
    isPage3() {
      return this.activePage === 3;
    },
    getsmsbutton() {
      return this.time > 0 ? this.time + '秒后获取验证码' : '获取手机验证码';
    },
    accountsShown() {
      var end = this.showIndex + this.maxShown;
      if (end > this.accounts.length) {
        end = this.accounts.length;
      }
      //console.log(this.accounts);
      for (var i = 0; i < this.accounts.length; i++) {
        switch (this.accounts[i].accountType) {
        case "1":
          this.accounts[i].accountType = "长城电子借记卡";
          break;
        default:
        }
      }
      return _.slice(this.accounts, this.showIndex, end)
    },
    labellistShown() {
      var list = [{
        safeName: "手机交易码",
        safeType: "10"
      },
      {
        safeName: "动态口令+手机交易码",
        safeType: "20"
      }]
      this.labellist = list;
      this.safetool = this.labellist[0].safeName;
      return _.slice(this.labellist)
    },
    leftButton() {
      if (this.showIndex !== 0) {
        return true;
      }else {
        return false;
      }
    },
    rightButton() {
      if (this.showIndex + this.maxShown < this.accounts.length) {
        return true;
      }else {
        return false;
      }
    }
  },
  methods: {
    prvPage() {
      return this.activePage <= 1 ? 1 : --this.activePage;
    },
    nextPage() {
      return ++this.activePage;
    },
    nextPage1() {
      if (!this.check(this.actnamT, this.actnumT, this.transamount)) {
        return;
      }
      this.trans.actnumT = this.actnumT;
      this.trans.actnamT = this.actnamT;
      this.trans.trfAmt = this.transamount;
      this.trans.transType = this.transtype;
      this.trans.remarks = this.postscript;
      for (var i = 0; i < this.labellist.length; i++) {
        if (this.safetool === this.labellist[i].safeName) {
          this.safetoolType = this.labellist[i].safeType;
        }
      }
      this.showmessage1 = false;
      this.showmessage2 = false;
      this.showmessage3 = false;
      return ++this.activePage;
    },
    reloadtrans() {
      this.actnumT = '';
      this.actnamT = '';
      this.transamount = '';
      this.postscript = '';
      this.showmessage1 = false;
      this.showmessage2 = false;
      this.showmessage3 = false;
    },
    check(actnamT, actnumT, amount) {
      var actnamTx = new RegExp(/[\u4e00-\u9fa5]{1,20}/);
      var actnumTx = new RegExp(/\w{10,}/);
      var amountx = new RegExp(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/);
      if (!actnamTx.test(actnamT)) {
        this.showmessage1 = true;
        //return false;
      }else {
        this.showmessage1 = false;
      }
      if (!actnumTx.test(actnumT)) {
        this.showmessage2 = true;
        //return false;
      }else {
        this.showmessage2 = false;
      }
      if (!amountx.test(amount)) {
        this.showmessage3 = true;
        //return false;
      }else {
        this.showmessage3 = false;
      }
      if (this.showmessage1 || this.showmessage2 || this.showmessage3) {
        return false;
      }else {
        return true;
      }

    },
    getsmstoken() {
      /*
      //向后台发送验证码
      this.$bfw.post('MDsendSMS',{
        mobile: this.mobile
      }).then(res =>{
        if(this.$CU.isSuccess(res)){
         //判断返回是否正常
        } else {
          this.$alert(this.$CU.getErr(res).message + '(' + this.$CU.getErr(res).code + ')', '报错啦', {confirmButtonText: '确定'});
        }
      }).catch(err => {
        console.log(err)
        this.$alert('无法连接后台，请稍后再试！', '网络错误：', {confirmButtonText: '确定'});
      })
      */
      let second = 60;
      this.time = second;
      this.timer();
      this.$emit('getsmstoken');
    },
    timer() {
      if (this.time > 0) {
        this.time = this.time - 1;
        setTimeout(this.timer, 1000);
      }
    },
    commit() {
      //if(!this.check(this.trans.mobtoken)) {
      //  return;
      //}
      //打开Loading页
      this.loading = true;
      this.$bfw.post('MDsubmitTransferAccount', {
        payAccount: this.trans.actnumF,
        payeeAccount: this.trans.actnumT,
        payeeName: this.trans.actnamT,
        curCode: this.trans.trfCur,
        amount: this.trans.trfAmt,
        remarks: this.trans.remarks
      }).then(res => {
        //当登录成功时
        if (this.$CU.isSuccess(res)) {
          //从res中获取交易信息
          this.trans.transId = this.$CU.getResData(res).id;
          this.trans.actnumF = this.$CU.getResData(res).payAccount;
          this.trans.actnamF = this.$CU.getResData(res).payName;
          this.trans.actnumT = this.$CU.getResData(res).payeeAccount;
          this.trans.actnamT = this.$CU.getResData(res).payeeName;
          this.trans.trfCur = this.$CU.getResData(res).curCode;
          this.trans.remarks = this.$CU.getResData(res).remarks;
          this.trans.fee = this.$CU.getResData(res).poundage;
          this.trans.tradeTime = this.$CU.getResData(res).tradeTime;
          //关闭Loading页
          this.loading = false;
          //跳转至结果页面
          this.nextPage();
        }else {
          this.loading = false;
          this.$alert(this.$CU.getErr(res).message + '(' + this.$CU.getErr(res).code + ')', '报错啦', {confirmButtonText: '确定'});
        }

      })
      .catch(() => {
        this.loading = false;
        this.$alert('无法连接后台，请稍后再试！', '网络错误：', {confirmButtonText: '确定'});
      })
      this.loading = false;
    },
    balanceHidding() {
      this.balanceHide = !this.balanceHide;
    },
    firstPage() {
      this.actnumT = '';
      this.actnamT = '';
      this.transamount = '';
      this.postscript = '';
      this.activePage = 1;
      return this.activePage;
    },
    queryAccounts() {
      this.cardloading = true;
      this.$bfw.post('MDgetAccount', {})
      .then(res => {
        this.cardloading = false;
        this.netError = false;
        if (this.$CU.isSuccess(res)) {
          this.accounts = this._accountsFilter(this.$CU.getResData(res).accountList)
          this.trans.amountF = this.accounts[0].amount;
          this.trans.actnumF = this.accounts[0].accountNumber;
          this.trans.actTypeF = this.accounts[0].accountType;
          this.trans.cardPicF = this.accounts[0].cardPic;
          this.trans.currencyF = this.accounts[0].currency;
          this.cardchosed = this.accounts[0].amount;
          //this.$store.dispatch('saveAccounts', this.accounts)
        }else {
          this.errorText = 'Message: ' + this.$CU.getErr(res).message + ' Code: ' + this.$CU.getErr(res).code;
          this.netError = true;
        }
      })
      /* eslint-disable no-unused-vars */
      .catch(err => {
        this.cardloading = false;
        this.netError = true;
      })
    },
    reload() {
      this.queryAccounts()
    },
    moveLeft() {
      if (this.showIndex > 0) {
        this.showIndex --;
      }
    },
    moveRight() {
      this.showIndex ++;
    },
    _accountsFilter(resList) {
      var accounts = []
      resList.forEach(account => {
        var tmpAccounts = {
          amount: account.amount + '',
          accountNumber: account.accountNumber,
          accountType: account.type,
          cardPic: account.imageUrl,
          currency: account.curCode
        }
        accounts.push(tmpAccounts);
      })
      return accounts
    },
    click(data) {
      this.cardchosed = data.amount;
      this.trans.amountF = data.amount;
      this.trans.actnumF = data.accountNumber;
      this.trans.actTypeF = data.accountType;
      this.trans.cardPicF = data.cardPic;
      this.trans.currencyF = data.currency;
    },
    usersearch() {

    },
    boccard(data) {
      var cls = false;
      if (data === this.cardchosed) {
        cls = true;
      }
      return cls
    },
    loadAll() {
      return [
         { "value": "张大三", "address": "621956200000" },
         { "value": "李二四", "address": "6216786200001" },
         { "value": "李五六", "address": "6219562005502" },
         { "value": "赵钱孙", "address": "62195620055500" }
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.actnumT = item.address;
      //console.log(item);
    }
  },
  mounted() {
    this.queryAccounts();
    this.restaurants = this.loadAll();
  }
}
</script>

<style scoped>

ul{
  list-style: none;
}

li{
  list-style: none;
}

.trans__bfecard{
  min-height: 650px;
}

.top-line{
  border-bottom: 1px dashed #ddd;
  width: 1000px
}
.trans-account__title{
  font-size: 15px;
  font-weight: bold;
}
.trans-receivableaccount__title{
  font-size: 15px;
  font-weight: bold;
}
.trans-receivableaccount__span{
  margin-top: 28px;
}
.trans-infor__title{
  font-size: 15px;
  font-weight: bold;
}
.trans-more__title{
  font-size: 15px;
  font-weight: bold;
}
.receivableaname-input{
margin-left: 100px
}
.trans-safe{
  margin-top: 3%;
  border-top: 1px dashed #ddd;
  border-bottom: 1px dashed #ddd;
  height: 60px;
  width: 1050px
}
.trans-safe__title{
  font-size: 15px;
  font-weight: bold;
}
.trans-input{
  max-width: 340px;
  max-height: 36px;
  margin-top: 18px
}
.receivableaname{
  max-width: 340px;
  max-height: 36px;
  margin-top: 18px;
}
.col-md-3{
  text-align: right;
}
.trans-text{
  margin-top: 28px
}
.text-account{
  margin-top: 28px;
  color: #d4d4d4;
  padding-left: 10px;
  text-align: left;
  height: 24px;
}
.text-infor{
  margin-top: 7%;
  color: #d4d4d4;
  padding-left: 10px;
  text-align: left;
  height: 24px;
}
.text-safe{
  margin-top: 10px;
  color: #d4d4d4;
  padding-left: 10px;
  text-align: left;
  height: 24px;
}
.transsafe{
  margin-top: 8%
}
.text-tool{
  margin-top: 28px;
  color: #d4d4d4;
  padding-left: 10px;
  text-align: left;
  height: 24px;
}
.safetool{
  margin-top: 12px
}
.check-box{
  margin-top: 22px
}
.radio-group{
  margin-top: 20px
}
.trans-message {
  width: 100%;
  border: 1px solid;
  border-color: #ffb4a8;
  background-color: #fef2f2;
  color: #6C6C6C;
  text-align: center;
  height: 24px;
}

.trans_confirm_header{
  width: 100%;
  height: 180px;
  padding: 20px;
  border-top: 1px dashed #ddd;
}

.confirm_header_info{
  height: 100%;
}

.confirm_header_info_bg{
  height: 100%;
  background-image: url(../../static/img/trans_arrow.png);
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center center;
}

.confirm_header_info_left{
  position: relative;left: 40%;
}

.confirm_header_info_center{
  padding-top: 25px;
  padding-left: 16px;
  padding-right: 16px;
}

.confirm_header_info_right{
  position: relative;left: -10%;
}

.confirm_header_info_title{
  text-align: right;
  padding: 0;
}

.confirm_header_info_title ul{
  min-height: 20px;
  line-height: 20px;
  padding: 0;
}

.confirm_header_info_content{
  text-align: left;
  padding: 0;
}

.confirm_header_info_content ul{
  min-height: 20px;
  line-height: 20px;
  padding: 0;
}

.trans_confirm_body{
  height: 320px;
}

.trans_confirm_body_leftbox{
  padding: 0;
  text-align: right;
}

.trans_confirm_body_leftbox ul{
  min-height: 22px;
  line-height: 22px;
  padding: 0;
}

.trans_confirm_body_rightbox{
  padding: 0;
  text-align: left;
}

.trans_confirm_body_rightbox ul{
  min-height: 22px;
  line-height: 22px;
  padding: 0;
}

.trans_confirm_amt{
  font-weight: bold;
  color: #be2e3e;
}

.trans_mobtoken{
  width: 100px;
}

.trans_confirm_footer{
  width: 100%;
  border-top: 1px dashed #ddd;
  padding: 28px;

  display: flex;
  justify-content: center;
  margin-top: 28px;
}

.trans_return_btn{
  margin-right: 56px;
}

.trans_success_top{
  height: 124px;
  width: 100%;
  padding-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 28px;
}

.trans_success_body{
  display: flex;
  min-height: 186px;
  margin-left: 28px;
  margin-right: 28px;
  padding-left: 0;
  border-top: 1px solid #dadada;
  border-right: 1px solid #dadada;
}

.trans_success_body ul{
  padding-left: 28px;
}

.trans_success_body li{
  list-style: none;
}

.success_body_title{
  width: 25%;
  border-left: 1px solid #dadada;
}

.success_body_title ul{
  min-height: 38px;
  line-height: 36px;
  background-color: #F6F6F6;
  border-bottom: 1px solid #dadada;
}

.success_body_content{
  width: 25%;
  border-left: 1px solid #dadada;
}

.success_body_content ul{
  min-height: 38px;
  line-height: 36px;
  border-bottom: 1px solid #dadada;
}

.success_togo_title{
  font-weight: bold;
  margin-top: 36px;
  margin-bottom: 18px;
}

.success_togo_body{
  min-height: 80px;
  padding-left: 36px;
  margin-bottom: 28px;
}

.success-link-item {
  width: 80px;
  height: 80px;
  padding: 0;
  margin-right: 24px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}

.success-link-icon {
  margin-top: 15px;
}

.success-link-url {
  position: relative;
  top:4px;
  color: #555555;
  text-decoration: none;
}

.trans_success_top_right{
  margin-left: 18px;
}

.trans_success_top_words{
  font-size: 16px;
}

.trans_success_top_amt_line{
  display: flex;
  align-items: flex-end;
}

.trans_success_top_amt{
  font-weight: bold;
  font-size: 22px;
  float: left;
}

.trans_success_top_amt_cur{
  margin-bottom: 3px;
}

.trans_success_balanceHideBtn{
  cursor: pointer;
}

.success_body_content_balance{
  width: 80%;
}

.success_body_content_balance_line{
  display: flex;
}

.trans_success_btn{
  display: flex;
  justify-content: center;
  margin-top: 28px;
}

.trans_success_confirm_btn{
  margin-right: 56px;
}

.trans_success_page{
  border-top: 1px dashed #ddd;
  border-bottom: 1px dashed #ddd;
}
.account-overview{

}

.account-overview__bfecard{
}

.account-overview__header{
  padding: 0px
}
.account-overview__header a{
  float: right;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
}
.account-overview__body{
  display: table;
}
.account-overview__card{
  display:table-cell;

  margin: 0 auto;
}
.account-overview__carditem{
  display:table-cell;
  float: left;
  margin-left: 10px;
  margin-right: 10px;
}
.account-overview__leftbutton{
  width:10px;
  height: 100%;
  cursor: pointer;
  display:table-cell;
  position: relative;
}

.account-overview__leftbutton img{
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.account-overview__rightbutton{
  width:10px;
  height: 100%;
  cursor: pointer;
  display:table-cell;
  position: relative;
}
.account-overview__rightbutton img{
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.boccard__chosed{
    border: 2px solid red !important;
}
.account-overview__body{
  margin-top: 1%
}
.icon-user{
  position: absolute;
  margin-left:56%;
  margin-top:4.5%;
  z-index:5;
  background-image: url(../../static/img/search.png); /*引入图片图片*/
  background-repeat: no-repeat; /*设置图片不重复*/
  background-position: 3px 3px; /*图片显示的位置*/
  width: 30px; /*设置图片显示的宽*/
  height: 30px; /*图片显示的高*/
}
.button-submit{
  margin-top: 3%;
  margin-left: 40%
}
.trans-account__title{
  margin-top: 2%
}
</style>
