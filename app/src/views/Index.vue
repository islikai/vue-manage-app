<template>
  <el-container class="layout-container">
    <el-header class="header">
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <Aside />
      </el-aside>
      <el-container>
        <el-main class="main-container">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Header from '../components/Header';
import Aside from '../components/Aside';
export default {
  name: 'index',
  components: {
    Header,
    Aside,
  }
}
</script>

<style lang="scss" scoped>
  .layout-container {
    height: 100%;
    background: #f3f7fd;
  }
  .header {
    background: #fff;
    box-shadow: 0 0 8px 2px #eee;
  }
  .aside {
    height: 100%;
  }
  .main-container {
    background: #fff;
    margin: 20px;
    border-radius: 6px;
  }
</style>