<template>
  <div>
  <div class="row">
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
  <div class="col-md-7">
 <bfe-form :inline="true" :model="formInline" class="demo-form-inline">

   <bfe-form-item label="上传人编号">
     <bfe-input v-model="formInline.uploader" placeholder="上传人编号" size="small"></bfe-input>
   </bfe-form-item>
   <bfe-form-item>
     <bfe-button type="primary" @click="submitForm()" size="small">查询</bfe-button>
   </bfe-form-item>
 </bfe-form>
 </div>
</div>
<div class="row">
  <bfe-table
    :data="tableData"
    stripe
    style="width: 100%;">
    <bfe-table-column
      prop="uploader"
      label="上传人编号"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="name"
      label="上传人机构"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="recordTotal"
      label="总条数"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="recordSuccess"
      label="成功条数"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="upTime"
      label="上传时间"
      >
    </bfe-table-column>

  </bfe-table>

  <bfe-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
  </bfe-pagination>
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
        },
        tableData: [],
        currentPage: 1,
        total: 0,
        pageSize: 10,
        formInline: {
          uploader: ''
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
      },
      submitForm() {
        //JSON.stringify(this.formInline)
        if(this.formInline.uploader === null || this.formInline.uploader === '') {
          this.formInline.uploader = this.$store.state.user.employeeId
        }
        this.$http.post('/api/blacklist/getBlackListHistory', {user: JSON.stringify(this.formInline), currentPage: this.currentPage,
          pageSize: this.pageSize}).then(res => {
          //修改成功
            if(this.$CU.isSuccess(res)) {
              this.tableData = this.$CU.getResData(res).data.records
              this.total = this.$CU.getResData(res).data.total
            }
          })
      }
    }
  }
</script>
<style scoped>

</style>
