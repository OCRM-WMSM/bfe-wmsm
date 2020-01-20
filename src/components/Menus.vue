<template>
  <div class="menus">
    <header class="container">
      <ul class="menu-items">
        <!--
        <li class="menu-logo">
          <img src="../assets/img/logo-white.png" />
        </li>
      -->
      <!--
        <li class="menu__item" v-for="menu in menus" @mouseenter="handlemouseenter(menu.id)" @mouseleave="handlemouseleave">
          <router-link :to="menu.index" class="text-center" >{{menu.name}}</router-link>
        </li>   -->

        <li class="menu__item" v-for="menu in menus" @mouseenter="handlemouseenter(menu.menuId)" @mouseleave="handlemouseleave">
          <router-link :to="menu.menuUrl" class="text-center" >{{menu.menuName}}</router-link>
        </li>
      </ul>
    </header>
    <div v-show="submenu" class="menus-submenu">
    </div>
  </div>
</template>

<script>
  /**
   * 菜单组件
   *
   * @author pangjian
   *
   */
  export default {
    name: 'Menus',
    data() {
      return {
        menus: [],
        submenu: false,
        submenus: {
          more: [{
            name: '更多一',
            id: 'more1',
            index: '/more1'
          }, {
            name: '更多二',
            id: 'more2',
            index: '/more2'
          }]
        }
      }
    },
    methods: {
      handlemouseenter(menuId) {
        this.menus.forEach(menu => {
          if(menu.id === menuId && menu.hasChild) {
            this.submenu = true
          }
        })
      },
      handlemouseleave() {
        this.submenu = false
      }
    },
    created() {
      //后台查菜单
      this.$http.post('/api/user/getAllMenus', {employeeId: this.$store.state.user.employeeId}).then(res => {
        if(this.$CU.isSuccess(res)) {
          this.menus = this.$CU.getResData(res).data;
        }
      })
    },
    computed: {
      menus() {
        return this.menus

        /**return [{
          name: this.$t('menu.home'),
          id: 'welcome',
          index: '/home'
        }, {
          name: '用户管理',
          id: 'userManager',
          index: '/user'
        }, {
          name: '分发策略',
          id: 'distribute',
          index: '/distribute'
        }, {
          name: '黑名单',
          id: 'blacklist',
          index: '/blacklist'
        }, {
          name: '投资理财',
          id: 'loan',
          index: '/loan'
        }, {
          name: '外币预约',
          id: 'forCash',
          index: '/forCash'
        }, {
          name: '代码字典',
          id: 'dict',
          index: '/dict'
        }, {
          name: '更多',
          id: 'more',
          index: '/more',
          hasChild: true
        }]*/
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/var.styl'
.menus{
  min-height: 85px;
  background-color: $red;
  width: 100%;
  top: 0;
  left: 0;
  padding: 0 20px;
  z-index: 1;
  box-sizing: border-box;
}

.menus .container{
  width: 1100px;
}

.menus header{
  min-height: 85px;
}
.menu-logo{
  display: inline-block;
  vertical-align: middle;
}
.menu-items{
  display: inline-block;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 0px;
  margin-top: 0px;
}
.menu__item{
  display: inline-block;
  vertical-align: middle;
  padding: 0 20px;
  margin: 0 0px;
  line-height: 85px;
  cursor: pointer;
  min-height: inherit;
  width: 104px;
}

.menu__item:hover{
  background-color: $boc-red
}

.menu-items li a{
  display: inline-table;
  color: $font-color-white;
  font-size: 16px;
  text-decoration: none;
  width:100%;
}
.menu-right{
  float: right;
}

.menus-submenu{
  display: block;
  position: absolute;
  background-color: rgba($red, 0.85);
  height: 500px;
  width: 100%;
  z-index: 9;
  left: 0;
}

</style>
