<template>
<div style="width:40%;margin-left:25%;margin-top:5%">
  <bfe-form :label-position="labelPosition" label-width="80px" :model="distributionForm" :rules="rules" ref="distributionForm">
    <bfe-form-item label="分期类型" prop="installmentType">
      <bfe-radio-group v-model="distributionForm.installmentType">
        <bfe-radio :label="1">账单</bfe-radio>
        <bfe-radio :label="2">消费</bfe-radio>
        <bfe-radio :label="3">自动</bfe-radio>
        <bfe-radio :label="4">现金</bfe-radio>
      </bfe-radio-group>
    </bfe-form-item>
    <bfe-form-item label="分发策略" prop="distribution">
      <div style="margin-top: 15px;">
        <bfe-input placeholder="请输入内容" v-model="distributionForm.distribution">
          <bfe-select v-model="select" slot="prepend" placeholder="请选择">
            <bfe-option label="客户ECIF等级" value="1"></bfe-option>
            <bfe-option label="已出账账单金额" value="2"></bfe-option>
            <bfe-option label="未出账单笔消费金额" value="3"></bfe-option>
          </bfe-select>
        </bfe-input>
      </div>
    </bfe-form-item>
    <bfe-form-item label="分发渠道" prop="channel">
      <bfe-radio-group v-model="distributionForm.channel">
        <bfe-radio-button label="CRS"></bfe-radio-button>
        <bfe-radio-button label="DCDS"></bfe-radio-button>
        <bfe-radio-button label="OCRM" :disabled="true"></bfe-radio-button>
      </bfe-radio-group>
    </bfe-form-item>
    <bfe-form-item>
      <bfe-button type="primary" @click="submitForm('distributionForm')">提交</bfe-button>
      <bfe-button @click="resetForm('distributionForm')">重置</bfe-button>
    </bfe-form-item>
  </bfe-form>
  <bfe-table
    :data="tableData"
    stripe
    style="width: 100%">
    <bfe-table-column
      prop="installmentType"
      label="分期类型"
      width="180">
    </bfe-table-column>
    <bfe-table-column
      prop="distribution"
      label="分发策略"
      width="180">
    </bfe-table-column>
    <bfe-table-column
      prop="channel"
      label="分发渠道"
      width="180">
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
        distributionForm: {
          installmentType: 1,
          distribution: 1,
          channel: 'CRS'
        },
        tableData: [{
          installmentType: '账单',
          distribution: '等级',
          channel: 'CRS'
        }, {
          installmentType: '自动',
          distribution: '已出账账单金额',
          channel: 'OCRM'
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
    // methods: {
    //   submitForm() {
    //     //JSON.stringify(this.formInline)
    //     this.$http.post('/api/queryDistribution', {installmentType: this.distributionForm.installmentType, distribution: this.distributionForm.distribution, ,channel: this.distributionForm.channel,currentPage: this.currentPage,
    //       pageSize: this.pageSize}).then(res => {
    //       //修改成功
    //         if(this.$CU.isSuccess(res)) {
    //           console.log(this.$CU.getResData(res).data);
    //           this.tableData = this.$CU.getResData(res).data.list
    //           this.total = this.$CU.getResData(res).data.total
    //         }
    //       })
    //   },
    //   handleSizeChange(val) {
    //     this.pageSize = val;
    //     console.log(`每页 ${val} 条`);
    //     console.log(this.pageSize);
    //     this.submitForm();
    //   },
    //   handleCurrentChange(val) {
    //     this.currentPage = val;
    //     console.log(`当前页: ${val}`);
    //     console.log(this.currentPage);
    //     this.submitForm();
    //   }
    // },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.ruleForm.creditCode = this.creditCode
      // this.email = false
      // this.linkman2Phone = false
      // this.linkman3Phone = false
    }
  }
</script>

<style>
.bfe-select .bfe-input {
  width: 110px;
}
</style>
