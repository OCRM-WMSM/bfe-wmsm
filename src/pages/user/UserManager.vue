<template>
  <div>
 <div class="row">
   <!--机构树-->
   <div class="col-md-4">
     <bfe-tree
       :data="treeData"
       show-checkbox=true
       node-key="orgNo"
       ref="tree"
       highlight-current
       check-strictly=true
       @check-change="cancleOtherNodes"
       :props="defaultProps"
       style="max-height:200px;overflow-y:scroll">
     </bfe-tree>
   </div>
   <div class="col-md-1">
   </div>
   <div class="col-md-7">
  <bfe-form :inline="true" :model="formInline" class="demo-form-inline">

    <bfe-form-item label="编号">
      <bfe-input v-model="formInline.employeeId" placeholder="编号"></bfe-input>
    </bfe-form-item>
    <bfe-form-item label="姓名">
      <bfe-input v-model="formInline.name" placeholder="姓名"></bfe-input>
    </bfe-form-item>
    <bfe-form-item>
      <bfe-button type="primary" @click="submitForm()">查询</bfe-button>
    </bfe-form-item>
  </bfe-form>
  </div>
</div>
  <div class="row" style="margin-top:30px;">
  <bfe-table
    :data="tableData"
    stripe
    style="width: 100%;">
    <bfe-table-column
      prop="employeeId"
      label="编号"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="name"
      label="姓名"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="orgCode"
      label="所在机构"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="orgName"
      label="所在机构名称"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="jobId"
      label="具体职位编号"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="jobName"
      label="具体职位名称"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="roles"
      label="角色"
      >
    </bfe-table-column>

    <bfe-table-column label="操作" width="200">
      <template slot-scope="scope">
        <bfe-button
          size="small"
          type="info"
          @click="handleRoleUpdate(scope.$index, scope.row.employeeId)">角色修改</bfe-button>
        <bfe-button
          size="small"
          type="danger"
          @click="handleReset(scope.$index, scope.row.employeeId)">密码重置</bfe-button>

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

  <!--角色修改框-->
  <bfe-dialog title="角色修改" :visible.sync="dialogFormVisible">
  <bfe-form :model="roleForm">
    <bfe-form-item label="活动名称" :label-width="formLabelWidth">
      <bfe-input v-model="roleForm.name" auto-complete="off"></bfe-input>
    </bfe-form-item>
    <bfe-form-item label="活动区域" :label-width="formLabelWidth">
      <bfe-select v-model="roleForm.region" placeholder="请选择活动区域">
        <bfe-option label="区域一" value="shanghai"></bfe-option>
        <bfe-option label="区域二" value="beijing"></bfe-option>
      </bfe-select>
    </bfe-form-item>
  </bfe-form>
  <div slot="footer" class="dialog-footer">
    <bfe-button @click="dialogFormVisible = false">取 消</bfe-button>
    <bfe-button type="primary" @click="dialogFormVisible = false">确 定</bfe-button>
  </div>
</bfe-dialog>
</div>
</div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          employeeId: '',
          name: '',
          orgCode: ''
        },
        treeData: [

        ],
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
        tableData: [],
        currentPage: 1,
        total: 0,
        pageSize: 10,
        dialogFormVisible: false,
        roleForm: {
          name: '',
          region: ''
        }
      }
    },
    //页面初始化调用，节点还未渲染,去后查询机构数
    created() {
      this.queryOrgTree();
    },
    methods: {
      //查询机构树
      queryOrgTree() {
        this.$http.post('/api/tree/orgTree', {orgNo: this.$store.state.user.orgCode}).then(res => {
          if(this.$CU.isSuccess(res)) {
            this.treeData = this.$CU.getResData(res).data
          }
        })
      },
      submitForm() {
        //JSON.stringify(this.formInline)
        this.$http.post('/api/user/getUserList', {user: JSON.stringify(this.formInline), currentPage: this.currentPage,
          pageSize: this.pageSize}).then(res => {
          //修改成功
            if(this.$CU.isSuccess(res)) {
              this.tableData = this.$CU.getResData(res).data.records
              this.total = this.$CU.getResData(res).data.total
            }
          })
      },
      handleReset(index, employeeId) {
        this.$confirm('确定重置该用户密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api/user/resetPwd', {employeeId: employeeId}).then(res => {
            if(this.$CU.isSuccess(res)) {
              this.$message({
                message: '重置成功!',
                type: 'success'
              });
            }else{
              this.$message({
                message: '重置失败!',
                type: 'error'
              });
            }
          })
        })
      },
      handleRoleUpdate(index, employeeId) {
        console.log(employeeId);
        this.dialogFormVisible = true

      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.submitForm();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.submitForm();
      },
      //点击按钮时取消其他按钮选中状态
      cancleOtherNodes(data, isCheck) {
        let checknodes = this.$refs.tree.getCheckedNodes();
        checknodes.forEach((curr) => {
          console.log(curr.orgNo + curr.orgNo);
          if(isCheck && curr.orgNo !== data.orgNo) {
            this.$refs.tree.setChecked(curr, false)
          }
        });
        if(isCheck) {
          this.formInline.orgCode = data.orgNo
        }else{
          this.formInline.orgCode = ''
        }
      }
    }

  }
</script>
