<template>
  <div class="row">
    <div class="col-md-2"></div>
  <div class="col-md-1">
    <bfe-button type="primary" size="small" @click="templateUpload" >模板下载</bfe-button>
  </div>
  <div class="col-md-3">
      <bfe-upload
        name="file"
        class="upload-demo"
        ref="upload"
        action="/api/blacklist/uploadBlacklistFile"
        :before-upload="beforeAvatarUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileLists"
        :headers="headers"
        :data="extraData"
        :auto-upload="false">
        <bfe-button slot="trigger" size="small" type="primary">选取文件</bfe-button>
        <bfe-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</bfe-button>
        <div slot="tip" class="bfe-upload__tip">只能上传只能上传csv文件，文件大小最多为20M</div>
      </bfe-upload>
  </div>

</div>


</template>
<script>
  export default {
    data() {
      return {
        fileLists: [],
        headers: {
          Authorization: 'Bearer ' + this.$store.state.token
        },
        extraData: {
          employeeId: this.$store.state.user.employeeId,
          orgCode: this.$store.state.user.orgCode
        }
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleError() {
        this.$message({
          message: '上传失败！',
          type: 'error'
        });
      },
      handleSuccess(response, file, fileList) {
        this.$message({
          message: '上传成功！',
          type: 'success'
        });
        //文件删除
        this.fileList3 = fileList.splice(0, 1);
      },
      beforeAvatarUpload(file) {
        const isCsv = file.type === 'application/vnd.ms-excel';
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isCsv) {
          this.$message.error('上传文件只能是 CSV 格式，请先下载模板!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 20MB!');
        }
        return isCsv && isLt2M;
      },
      templateUpload() {
        window.location.href = '/api/blacklist/downloadBlackListTmp';
      }
    }
  }
</script>
<style scoped>

</style>
