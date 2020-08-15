<!--
 * @Author: your name
 * @Date: 2020-07-25 18:02:13
 * @LastEditTime: 2020-08-12 10:38:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodese:\aoneQt\vue-cli4\src\App.vue
--> 
<template>
  <div id="app">
    <router-view v-if="typeList" />
    <div class="loading" v-else>loading......</div>
  </div>
</template>
<script>
export default {
  created() {
    // 模拟接口
    setTimeout(() => {
      this.$store.commit("SET_ASIDE","res")
    }, 1000);
  },

  computed: {
    typeList() { return this.$store.state.typeList }
  },
}
</script>
<style lang="scss">
#app {
  width: 100%;
  min-height: 100vh;
}

</style>
