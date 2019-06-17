<template>
  <div class="header-nav">
    <router-link to="/home">
      <h1>BLOG MANAGE</h1>
    </router-link>
    <div class="right-info-content">
      <img :src="user.avatar" alt="">
      <el-dropdown
        trigger="click"
        class="right-info"
        @command="setDailginfo"
      >
        <span class="el-dropdown-link">
          {{user.name}} {{user.role === '1' ? '管理员' : '员工'}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">个人信息</el-dropdown-item>
          <el-dropdown-item command="2" divided style="color: #999">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header-nav',
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    setDailginfo(value) {
      if (value === '1') { // 查看信息
        this.blankInfo();
      } else { // 注销
        this.logout();
      }
    },
    blankInfo() {
      this.$router.push('/account');
    },
    logout() {
      // 清除Token
      localStorage.removeItem('Token');
      // 设置store
      this.$store.dispatch('clearCurState');
      // 跳转
      this.$router.push('/login');
    }
  },
}
</script>

<style lang="scss" scoped>
  .header-nav {
    width: 100%;
    height: 100%;
    line-height: 60px;
    h1 {
      color: #333;
      float: left;
    }
    .right-info-content {
      float: right;
      img {
        float: left;
        width: 40px;
        height: 40px;
        margin: 10px 10px 0 0;
        border-radius: 100%;
      }
    }
  }
</style>
