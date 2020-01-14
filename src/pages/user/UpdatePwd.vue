<template>
   <div style="width:40%;margin-left:25%;margin-top:5%">
     <bfe-form label-width="80px" :model="pwdForm" :rules="rules" ref="pwdForm">
        <bfe-form-item label="旧密码" prop="oldPassword">
          <bfe-input v-model="pwdForm.oldPassword" type="password"></bfe-input>
        </bfe-form-item>
        <bfe-form-item label="新密码" prop="newPassword" required>
          <bfe-input v-model="pwdForm.newPassword" type="password"></bfe-input>
        </bfe-form-item>
        <bfe-form-item label="确认密码" prop="checkPassword" required>
          <bfe-input v-model="pwdForm.checkPassword" type="password"></bfe-input>
        </bfe-form-item>
        <bfe-form-item>
          <bfe-button type="primary" @click="submitForm('pwdForm')">提交</bfe-button>
          <bfe-button @click="resetForm('pwdForm')">重置</bfe-button>
        </bfe-form-item>
      </bfe-form>
   </div>
</template>

<script>
export default {
  data() {
    //校验规则
    var validateNew = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (value.length < 6 || value.length > 18) {
        callback(new Error('长度在 6 到 18 个字符!'));
      } else if (value === this.pwdForm.oldPassword) {
        callback(new Error('新密码不能与旧密码相同!'));
      } else {
        callback();
      }
    };
    var validateCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else if (value !== this.pwdForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      pwdForm: {
        employeeId: this.$store.state.user.employeeId,
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNew, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validateCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/user/updatePwd', this.pwdForm).then(res => {
            //修改成功
            if(this.$CU.isSuccess(res)) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$store.dispatch('logout');
              this.$router.push("/login");
            }else{
              this.$alert(this.$CU.getErr(res).msg, '修改失败', {confirmButtonText: '确定'});
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>
</style>
