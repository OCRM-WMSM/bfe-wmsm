<template>
<div style="width:50%;margin-left:25%;margin-top:0.11%">
  <bfe-form :label-position="labelPosition" label-width="80px" :model="distributionForm" :rules="rules" ref="distributionForm">
    <bfe-form-item label="分期类型" prop="installmentType">
      <bfe-radio-group v-model="distributionForm.installmentType" @change="changeTpye">
        <bfe-radio :label="1">账单</bfe-radio>
        <bfe-radio :label="2">消费</bfe-radio>
        <bfe-radio :label="3">自动</bfe-radio>
        <bfe-radio :label="4">现金</bfe-radio>
      </bfe-radio-group>
    </bfe-form-item>
    <bfe-form-item v-if="distributionForm.distri1" label="分发策略" prop="distribution1">
      <bfe-select v-model="distributionForm.distribution1" placeholder="请选择" @change="changeDistri1">
        <!-- <bfe-option label="请选择"></bfe-option> -->
        <bfe-option label="客户等级" value="1"></bfe-option>
        <bfe-option label="已出账账单金额" value="2"></bfe-option>
        <bfe-option label="未出账单笔消费金额" value="3"></bfe-option>
      </bfe-select>
    </bfe-form-item>
    <bfe-form-item v-if="distributionForm.distri2" label="分发策略" prop="distribution2">
      <bfe-select v-model="distributionForm.distribution2" placeholder="请选择" @change="changeDistri2">
        <!-- <bfe-option label="请选择"></bfe-option> -->
        <bfe-option label="客户等级" value="1"></bfe-option>
        <bfe-option label="信用卡额度" value="4"></bfe-option>
      </bfe-select>
    </bfe-form-item>
    <bfe-form-item v-if="distributionForm.cusLvlFlag" label="客户等级" prop="cusLvl">
      <!-- <bfe-select v-model="distributionForm.cusLvl" placeholder="请选择">
        <bfe-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
        </bfe-option>
      </bfe-select> -->
      <bfe-select v-model="distributionForm.cusLvl" placeholder="请选择客户等级">
        <bfe-option label="普通客户" value="00"></bfe-option>
        <bfe-option label="中银理财" value="04"></bfe-option>
        <bfe-option label="财富管理" value="06"></bfe-option>
        <bfe-option label="私人银行" value="08"></bfe-option>
      </bfe-select>
    </bfe-form-item>
    <bfe-form-item v-if="distributionForm.billamountFlag" label="已出账账单金额" prop="billamount">
      <div class="col-md-5">
        <bfe-input-currency v-model="distributionForm.billamountst" prop="billamountst" style="width: 100%;" currency="￥" separator="," :min="0" :max="999999999" placeholder="请输入已出账账单起始金额"></bfe-input-currency>
      </div>
      <div class="col-md-2 line">-</div>
      <div class="col-md-5">
        <bfe-input-currency v-model="distributionForm.billamountend" prop="billamountend" style="width: 100%;" currency="￥" separator="," :min="0" :max="999999999" placeholder="请输入已出账账单截止金额"></bfe-input-currency>
      </div>
    </bfe-form-item>
    <bfe-form-item v-if="distributionForm.nobillamountFlag" label="未出账单笔消费金额" prop="nobillamount">
      <div class="col-md-5">
        <bfe-input-currency v-model="distributionForm.nobillamountst" style="width: 100%;" currency="￥" separator="," :min="0" :max="999999999" class="length1" placeholder="请输入未出账单笔消费起始金额"></bfe-input-currency>
      </div>
      <div class="col-md-2 line">-</div>
      <div class="col-md-5">
        <bfe-input-currency v-model="distributionForm.nobillamountend" style="width: 100%;" currency="￥" separator="," :min="0" :max="999999999" class="length1" placeholder="请输入未出账单笔消费截止金额"></bfe-input-currency>
      </div>
    </bfe-form-item>
    <bfe-form-item v-if="distributionForm.limitFlag" label="信用卡额度" prop="cardLimit">
      <bfe-input-currency v-model="distributionForm.cardLimit" currency="￥" separator="," :min="0" :max="999999999" class="length1" placeholder="请输入信用卡额度"></bfe-input-currency>
    </bfe-form-item>
    <bfe-form-item label="分发渠道" prop="channel">
      <bfe-radio-group v-model="distributionForm.channel">
        <bfe-radio-button label="CRS"></bfe-radio-button>
        <bfe-radio-button label="DCDS"></bfe-radio-button>
        <bfe-radio-button label="OCRM" :disabled="true"></bfe-radio-button>
      </bfe-radio-group>
    </bfe-form-item>
    <!-- <bfe-form-item v-if="distributionForm.provCode" label="省行号">
      <bfe-input v-model="distributionForm.provCode" value="this.$store.state.user.provCode"></bfe-input>
    </bfe-form-item> -->
    <bfe-form-item>
      <bfe-button type="primary" @click="submitForm('distributionForm')">提交</bfe-button>
      <bfe-button @click="resetForm('distributionForm')">重置</bfe-button>
    </bfe-form-item>
  </bfe-form>
  <bfe-table :data="tableData" stripe style="width: 100%">
    <bfe-table-column prop="installmentType" label="分期类型">
    </bfe-table-column>
    <bfe-table-column prop="distribution" label="分发策略">
    </bfe-table-column>
    <bfe-table-column prop="distribution" label="分发策略">
    </bfe-table-column>
    <bfe-table-column prop="channel" label="分发渠道">
    </bfe-table-column>
  </bfe-table>
  <div style="margin-top: 30px;">
  </div>
  <bfe-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
  </bfe-pagination>
</div>
</template>

<script>
export default {
  data() {
    return {
      distributionForm: {
        installmentType: 1,
        cusLvl: '',
        distribution1: '',
        distribution2: '',
        channel: 'CRS',
        billamountst: 0,
        billamountend: 0,
        cardLimit: 0,
        distri1: true,
        distri2: false,
        cusLvlFlag: false,
        billamountFlag: false,
        nobillamountFlag: false,
        limitFlag: false
      },
      tableData: [],
      rules: {
        cusLvl: [{
          required: true,
          message: '请选择客户等级',
          trigger: 'change'
        }],
        billamountst: [{
          required: true,
          message: '请输入已出账账单起始金额',
          trigger: 'blur'
        }],
        billamountend: [{
          required: true,
          message: '请输入已出账账单截止金额',
          trigger: 'blur'
        }]
      },
      currentPage: 1,
      total: 0,
      pageSize: 10
    }
  },
  //页面初始化调用，节点还未渲染
  created() {
    this.queryDistribution();
  },
  methods: {
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
    queryDistribution() {
      this.$http.post('/api/distribute/queryDistribution', {
        orgCode: this.$store.state.user.orgCode,
        provCode: this.$store.state.user.provCode,
        orgLvl: this.$store.state.user.orgLvl,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        //查询成功
        if (this.$CU.isSuccess(res)) {
          console.log(this.$CU.getResData(res).data);
          this.tableData = this.$CU.getResData(res).data.records
          this.total = this.$CU.getResData(res).data.total
        }
      })
    },
    submitForm() {
      //JSON.stringify(this.formInline)
      this.$http.post('/api/distribute/setDistribution', {
        user: JSON.stringify(this.distributionForm),
        provCode: this.$store.state.user.provCode
      }).then(res => {
        //设置成功
        if (this.$CU.isSuccess(res)) {
          this.$message({
            message: '设置成功!',
            type: 'success'
          });
        } else {
          this.$message({
            message: '设置失败!',
            type: 'error'
          });
        }
      })
    },
    changeTpye(val) {
      // console.log(val);
      // console.log(this.distributionForm.distri1);
      // console.log(this.distributionForm.distri2);
      if (val === 1) {
        this.distributionForm.distri1 = true;
        this.distributionForm.distri2 = false;
      } else if (val === 2) {
        this.distributionForm.distri1 = true;
        this.distributionForm.distri2 = false;
      } else if (val === 3) {
        this.distributionForm.distri1 = false;
        this.distributionForm.distri2 = true;
      } else {
        this.distributionForm.distri1 = false;
        this.distributionForm.distri2 = true;
      }
    },
    changeDistri1(val) {
      if (val === '1') {
        this.distributionForm.cusLvlFlag = true;
        this.distributionForm.billamountFlag = false;
        this.distributionForm.nobillamountFlag = false;
      } else if (val === '2') {
        this.distributionForm.cusLvlFlag = false;
        this.distributionForm.billamountFlag = true;
        this.distributionForm.nobillamountFlag = false;
      } else {
        this.distributionForm.cusLvlFlag = false;
        this.distributionForm.billamountFlag = false;
        this.distributionForm.nobillamountFlag = true;
      }
    },
    changeDistri2(val) {
      if (val === '1') {
        this.distributionForm.cusLvlFlag = true;
        this.distributionForm.limitFlag = false;
        this.distributionForm.billamountFlag = false;
        this.distributionForm.nobillamountFlag = false;
      } else if (val === '4') {
        this.distributionForm.cusLvlFlag = false;
        this.distributionForm.limitFlag = true;
        this.distributionForm.billamountFlag = false;
        this.distributionForm.nobillamountFlag = false;
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.submitForm();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.submitForm();
    }
  },

  resetForm(formName) {
    this.$refs[formName].resetFields();
    // this.ruleForm.creditCode = this.creditCode
    // this.installmentType = 1
    // this.linkman2Phone = false
    // this.linkman3Phone = false
  }
}
</script>

<style>
.bfe-select .bfe-input {
  width: 110px;
}

.length1 {
  width: 300px;
}

.time_link {
  padding: 0 6px;
}

.lengthamount {
  /*width: inherit;*/
  width: 100%;
}
</style>
