<template>
  <el-menu
    default-active="1"
    class="left-menu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <router-link to="/home">
      <el-menu-item index="1">
        <i class="el-icon-location"></i>
        <span slot="title">首页</span>
      </el-menu-item>
    </router-link>
    <template v-for="item in items">
      <el-submenu v-if="item.children" :index="item.key" :key="item.key">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <router-link v-for="citem in item.children" :key="citem.key" :to="citem.path">
          <el-menu-item :index="citem.key">{{citem.name}}</el-menu-item>
        </router-link>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'header-nav',
  data() {
    return {
      items: [
        {
          key: '2',
          icon: 'el-icon-menu',
          name: '资金管理',
          children: [
            { key: '2-1', path: '/list', name: '资金流水' },
          ]
        },
        {
          key: '3',
          icon: 'el-icon-menu',
          name: '信息管理',
          path: 'info',
          children: [
            { key: '3-1', path: '/account', name: '个人信息' },
          ]
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
  .left-menu {
    height: 100%;
  }
</style>
