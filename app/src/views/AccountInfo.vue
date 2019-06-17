<template>
  <div class="account-info">
    <img :src="user.avatar" alt="头像">
    <p>{{user.name}}</p>
    <p>{{user.email}}</p>
    <p>{{user.role === '1' ? '管理员' : '员工'}}</p>
  </div>
</template>

<script>
export default {
  name: 'account-info',
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
}
</script>

<style lang="scss" scoped>
  .account-info {
    img {
      width: 80px;
      height: 80px;
      margin-bottom: 20px;
    }
    p {
      line-height: 30px;
    }
  }
</style>