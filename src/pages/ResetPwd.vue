<template>
 <div>
  <bfe-form :inline="true" :model="formInline" class="demo-form-inline">
    <bfe-form-item label="编号">
      <bfe-input v-model="formInline.userNo" placeholder="编号"></bfe-input>
    </bfe-form-item>
    <bfe-form-item label="姓名">
      <bfe-input v-model="formInline.name" placeholder="姓名"></bfe-input>
    </bfe-form-item>
    <bfe-form-item>
      <bfe-button type="primary" @click="submitForm()">查询</bfe-button>
    </bfe-form-item>
  </bfe-form>
  <bfe-table
    :data="tableData"
    stripe
    style="width: 100%">
    <bfe-table-column
      prop="userNo"
      label="编号"
      width="180">
    </bfe-table-column>
    <bfe-table-column
      prop="name"
      label="姓名"
      width="180">
    </bfe-table-column>
    <bfe-table-column label="操作">
      <template slot-scope="scope">
        <bfe-button
          size="small"
          @click="handleReset(scope.$index, scope.row.userNo)">密码重置</bfe-button>
      </template>
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
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          userNo: '',
          name: ''
        },
        tableData: [{
          userNo: '10010',
          name: '王小虎'
        }, {
          userNo: '10011',
          name: '王小虎2'
        }, {
          userNo: '10012',
          name: '王小虎3'
        }, {
          userNo: '10013',
          name: '王小虎4'
        }],
        currentPage: 1,
        total: 400,
        pageSize: 10
      }
    },
    //页面初始化调用，节点还未渲染
    created() {
      this.submitForm();
    },
    methods: {
      submitForm() {
        //JSON.stringify(this.formInline)
        this.$http.post('/api/queryUser', {condition: this.formInline, currentPage: this.currentPage,
          pageSize: this.pageSize}, {headers: {'Content-Type': 'application/json'}}).then(res => {
          //修改成功
            if(this.$CU.isSuccess(res)) {
              console.log(this.$CU.getResData(res).data);
              this.tableData = this.$CU.getResData(res).data.list
              this.total = this.$CU.getResData(res).data.total
            }
          })
      },
      handleReset(index, userNo) {
        this.$message({
          message: '重置成功，重置的用户编号： ' + userNo,
          type: 'success'
        });
      },
      handleSizeChange(val) {
        this.pageSize = val;
        console.log(`每页 ${val} 条`);
        console.log(this.pageSize);
        this.submitForm();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        console.log(this.currentPage);
        this.submitForm();
      }
    }

  }
</script>
