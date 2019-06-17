<template>
  <div class="register">
    <div class="register-form-warp">
      <h1>账号注册</h1>
      <el-form
        :model="registerUser"
        :rules="rules"
        ref="registerForm"
        label-width="80px"
        class="register-from"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerUser.password" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="registerUser.checkPass"
            placeholder="请输入"
            @keyup="submitForm('loginUser')"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择身份" prop="role">
          <el-select class="sltw" v-model="registerUser.role" placeholder="请选择">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="员工" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="form-btn" type="primary" @click="submitForm('registerForm')">注册</el-button>
        </el-form-item>
        <div class="to-login">
          <p>已有账号，现在去 <router-link to="/login">登录</router-link></p>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: '',
        email: '',
        password: '',
        checkPass: '',
        role: '1',
      },
      rules: {
        name: [
          { required: true, min: 2, max: 10, message: '长度2~10个字符', trigger: 'blur' },
        ],
        email: [
          { required: true, type:'email', message: '请输入正确邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, min: 6, max: 30, message: '长度6~30个字符', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, min: 6, max: 30, message: '长度6~30个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
        ],
        role: [
          { required: true, message: '请选择身份', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { checkPass, ...rest } = this.registerUser;
          this.$axios.post('/api/users/register', rest).then(({ success, error }) => {
            if (success) {
              // 注册成功
              this.$message.success('账号注册成功');
              this.$router.push('/login');
            } else {
              this.$message.error(error);
            }
          });
        } else {
          return false;
        }
      });
    }
  },
}
</script>
<style lang="scss" scoped>
  .sltw {
    width: 100%;
  }
  .register {
    width: 100%;
    height: 100%;
    background: linear-gradient(#0a101b, #2f3c54);
    .register-form-warp {
      width:400px;
      min-height: 280px;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -65%);
      border-radius: 6px;
      background: #fff;
      padding: 20px 0;
      box-sizing: border-box;
      h1 {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #efefef;
      }
      .register-from {
        margin-top: 20px;
        padding: 0 40px 0 20px;
        .form-btn {
          width: 100%;
        }
        .to-login {
          margin-top: 40px;
          text-align: right;
        }
      }
    }
  }
</style>