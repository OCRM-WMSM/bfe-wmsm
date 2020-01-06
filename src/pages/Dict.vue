<template>
   <div class="dict-div">
        <bfe-button type="primary" @click="dictclick()">点击我啊</bfe-button>
   </div>
</template>

<script>
export default {
  data() {
    return {
      dict: "我是消息"
    }
  },
  methods: {
    dictclick() {
      this.$http.post('/api/swa3', {
        id: "1",
        name: "tom"
      }).then(res => {
        //当登录成功时
        if(this.$CU.isSuccess(res)) {
          var data = this.$CU.getResData(res);
          console.log(data);
          this.$message({
            message: '返回消息：' + data,
            type: 'success'
          });
        }
      })
      .catch(err => {
        // console.log(err);
        err
        //this.$alert('无法连接后台，请稍后再试！', '网络错误：', {confirmButtonText: '确定'});
      })
    }
  }
}
</script>
<style scoped>
.dict-div {
  background-color: #fff;
  margin-top: 50px;
}
</style>
