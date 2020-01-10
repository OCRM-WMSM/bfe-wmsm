<template>
  <div class="container-fluid home-body">
    
    <div class="row">
<h1>我是主页</h1>
      </div>

  </div>

</template>

<script>

  export default {

    methods: {

    },
    components: {

    },
    computed: {
      isLogin() {
        if(this.$store.state.token) {
          return true
        } else {
          return false
        }
      }
    }
  }

</script>

<style scoped>
.home-body{
  margin-top: 0px;
  margin-bottom: 16px;
}
.piechart_pie{
  margin-top: 16px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 16px;
}

.home-body__widget{
  margin-top: 14px;
  margin-bottom: 14px;
}

</style>
