<template lang="html">
  <div class="account-overview" v-loading='loading'>
    <bfe-card class="account-overview__bfecard" :errorText="errorText" :refreshFn="reload" :hasError="netError" :bodyStyle="{minHeight: '235px'}">
      <div slot="header" class="account-overview__header clearfix">
        <span class="account-overview__headerleft text-center">账户概览</span>
        <a class="account-overview__headerright text-center">查看详情<i class="glyphicon glyphicon-menu-right"></i></a>
      </div>
      <div class="account-overview__body container-fluid">
        <div class="account-overview__leftbutton">
          <img v-if="leftButton" @click="moveLeft" src="../assets/img/left-arrow.png"/>
        </div>
        <div class="account-overview__card clearfix">
          <div v-for="account in accountsShown" class="account-overview__carditem clearfix">
            <boc-card  :amount="account.amount" :cardNum="account.accountNumber" :cardType="account.accountType" :cardPic="account.cardPic" :currency="account.currency"></boc-card>
          </div>
        </div>
        <div class="account-overview__rightbutton">
          <img v-if="rightButton" @click="moveRight" src="../assets/img/right-arrow.png"/>
        </div>
      </div>
    </bfe-card>
  </div>
</template>

<script type="text/javascript">
  import BocCard from './boc-card/BocCard'
  import _ from 'lodash'

  export default {
    name: 'AccountOverview',
    // 组合其它组件
    extends: {},
    // 组件属性、变量
    props: {

    },
    // 变量
    data() {
      return {
        accounts: [],
        showIndex: 0,
        maxShown: 3,
        loading: true,
        netError: false,
        errorText: '您的网络遇到问题，请稍后再试！'
      }
    },
    computed: {
      accountsShown() {
        var end = this.showIndex + this.maxShown;
        if(end > this.accounts.length) {
          end = this.accounts.length;
        }
        return _.slice(this.accounts, this.showIndex, end)
      },
      leftButton() {
        if(this.showIndex !== 0) {
          return true;
        } else {
          return false;
        }
      },
      rightButton() {
        if(this.showIndex + this.maxShown < this.accounts.length) {
          return true;
        } else {
          return false;
        }
      }
    },
    // 使用其它组件
    components: {
      'BocCard': BocCard
    },
    // 方法
    watch: {},
    methods: {
      queryAccounts() {
        this.loading = true;
        this.$bfw.post('MDgetAccount', {})
        .then(res => {
          this.loading = false;
          this.netError = false;
          if(this.$CU.isSuccess(res)) {
            this.accounts = this._accountsFilter(this.$CU.getResData(res).accountList)
            this.$store.dispatch('saveAccounts', this.accounts)
          }else {
            this.errorText = 'Message: ' + this.$CU.getErr(res).message + ' Code: ' + this.$CU.getErr(res).code
            this.netError = true;
          }
        })
        /* eslint-disable no-unused-vars */
        .catch(err => {
          this.loading = false;
          this.netError = true;
        })
      },
      reload() {
        this.queryAccounts()
      },
      moveLeft() {
        if(this.showIndex > 0) { this.showIndex --; }
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
      }
    },
    // 生命周期函数
    beforeCreate() {},
    mounted() {
      this.queryAccounts()
    },
    beforeMounted() {

    }
};
</script>

<style scoped>
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
</style>
