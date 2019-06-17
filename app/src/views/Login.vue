<template>
  <div class="login">
    <div class="login-from-warp">
      <h1>账号登录</h1>
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        label-width="80px"
        class="login-from"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginUser.password"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="form-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
        <div class="to-register">
          <p>还没有账号？现在去 <router-link to="/register">注册</router-link></p>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  name: 'login',
  data() {
    return {
      loginUser: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, type:'email', message: '请输入正确邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, min: 6, max: 30, message: '长度6~30个字符', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/users/login', this.loginUser)
            .then(({ success, error, token }) => {
              // 注册成功
              if (success) {
                // 将token存到本地
                localStorage.setItem('Token', token);
                const decodeTokenValue = jwtDecode(token);
                // 解析Token，将值存储到vuex
                this.$store.dispatch('setAuthenticated', !this.isEmpty(decodeTokenValue));
                this.$store.dispatch('setUser', decodeTokenValue);
                this.$message.success('登录成功');
                this.$router.push('/');
              } else {
                this.$message.error(error);
              }
            });
        } else {
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined
        || value === null
        || (typeof value === 'object' && Object.keys(value).length === 0)
        || (typeof value === 'string' && value.trim().length === 0)
      );
    },
  },
}
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    background: linear-gradient(#0a101b, #2f3c54);
    .login-from-warp {
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
      .login-from {
        margin-top: 20px;
        padding-right: 40px;
        .form-btn {
          width: 100%;
        }
        .to-register {
          margin-top: 40px;
          text-align: right;
        }
      }
    }
  }
</style>