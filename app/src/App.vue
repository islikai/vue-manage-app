<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  name: 'app',
  created() {
    if (localStorage.Token) {
      const decodeTokenValue = jwtDecode(localStorage.Token);
      // 解析Token，将值存储到vuex
      this.$store.dispatch('setAuthenticated', !this.isEmpty(decodeTokenValue));
      this.$store.dispatch('setUser', decodeTokenValue);
    }
  },
  methods: {
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

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}
</style>
