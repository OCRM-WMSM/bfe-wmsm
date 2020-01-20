<template>
  <div>
 <div class="row">
   <!--机构树-->
   <div class="col-md-3">
     <bfe-tree
       :data="treeData"
       show-checkbox=true
       node-key="orgNo"
       ref="tree"
       highlight-current

       check-strictly=true
       @check-change="cancleOtherNodes"
       :props="defaultProps"
       style="overflow-x:scroll;width:280px;min-height:500px;">
     </bfe-tree>
   </div>
   <div class="col-md-9" >
  <bfe-form :inline="true" :model="formInline" class="demo-form-inline">

    <bfe-form-item label="编号">
      <bfe-input v-model="formInline.employeeId" placeholder="编号"></bfe-input>
    </bfe-form-item>
    <bfe-form-item label="姓名">
      <bfe-input v-model="formInline.name" placeholder="姓名"></bfe-input>
    </bfe-form-item>
    <bfe-form-item>
      <bfe-button type="primary" @click="submitForm('1')">查询</bfe-button>
    </bfe-form-item>
  </bfe-form>

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
      label="机构"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="orgName"
      label="机构名称"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="jobId"
      label="职位编号"
      >
    </bfe-table-column>
    <bfe-table-column
      prop="jobName"
      label="职位名称"
      >
    </bfe-table-column>

    <bfe-table-column label="操作" width="200">
      <template slot-scope="scope">
        <bfe-button
          size="small"
          type="info"
          @click="handleRoleUpdate(scope.$index, scope.row.employeeId,scope.row.orgLvl)">角色修改</bfe-button>
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
  <bfe-form >
    <bfe-input v-model="roleChangeEmployeeId" style="display:none"></bfe-input>
    <bfe-input v-model="roleChangeOrgLvl" style="display:none"></bfe-input>
    <bfe-form-item label="选择角色">
    <bfe-checkbox-group v-model="checkedRoles" :max="1">
     <bfe-checkbox v-for="role in userRoles" :label="role.roleId"
     :key="role.roleId">
       {{ role.roleName }}
     </bfe-checkbox>
   </bfe-checkbox-group>
  </bfe-form-item>
  </bfe-form>
  <div slot="footer" class="dialog-footer">
    <bfe-button @click="dialogFormVisible = false">取 消</bfe-button>
    <bfe-button type="primary" @click="updateRoles">确 定</bfe-button>
  </div>
</bfe-dialog>
</div>
</div>
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
        roleChangeEmployeeId: "",
        roleChangeOrgLvl: "",
        userRoles: [

        ],
        checkedRoles: []
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
      submitForm(flag) {
        if(flag === '1') {
          //点击按钮查询
          //默认查询本机构用户
          if(this.formInline.orgCode === null || this.formInline.orgCode === '') {
            this.formInline.orgCode = this.$store.state.user.orgCode
          }
        }
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
      //角色修改
      handleRoleUpdate(index, employeeId, orgLvl) {
        //上级用户可调整下级用户的角色
        if(this.$store.state.user.orgLvl >= orgLvl) {
          this.$message({
            message: '无权限修改!',
            type: 'error'
          });
          return;
        }
        this.roleChangeEmployeeId = employeeId;
        this.roleChangeOrgLvl = orgLvl;
        this.dialogFormVisible = true;
        this.$http.post('/api/user/getUserSelectRoles', {employeeId: employeeId}).then(res => {
          if(this.$CU.isSuccess(res)) {
            this.userRoles = this.$CU.getResData(res).data;
            this.checkedRoles = [];
            console.log(this.checkedRoles);
            this.userRoles.forEach((e) => {
              if(e.flag) {
                this.checkedRoles.push(e.roleId);
              }
            });
          }else{
            this.$message({
              message: '查询角色失败!',
              type: 'error'
            });
          }
        })
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
          //点击机构树查询
          this.submitForm("2")
        }else{
          this.formInline.orgCode = ''
        }
      },
      updateRoles() {
        //二级行以下不可设置为管理人员角色。营销人员角色不做限制
        if(this.roleChangeOrgLvl > 2) {
          let flag = true;
          this.checkedRoles.forEach((e) => {
            if(e === '01') {
              flag = false;
              return;
            }
          });
          if(!flag) {
            this.$message({
              message: '二级行以下不可设置为管理人员角色!',
              type: 'error'
            });
            return;
          }
        }
        this.$confirm('确定修改该用户角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api/user/updateRoles', {employeeId: this.roleChangeEmployeeId, roleIds: JSON.stringify(this.checkedRoles)}).then(res => {
            if(this.$CU.isSuccess(res)) {
              this.$message({
                message: '修改成功!',
                type: 'success'
              });
              this.dialogFormVisible = false;
            }else{
              this.$message({
                message: '修改失败!',
                type: 'error'
              });
            }
          })
        })
      }
    }

  }
</script>
