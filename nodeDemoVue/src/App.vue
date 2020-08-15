<template>
  <div id="app">
    <router-view v-if="typeList" />
    <div class="loading" v-else>loading......</div>
  </div>
</template>
<script>
export default {
  created() {
    this.$http.GetSite().then(res=>{
      this.$store.commit("SET_ASIDE",res)
    }).catch(()=>{

    })
  },

  computed: {
    typeList() { return this.$store.state.typeList }
  },
}
</script>
<style lang="scss">
#app {
 
  width: 100%;
  height: 100%;
}
.loading{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input_text{
  border:none;
  padding-left:5px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.input_text[type=text]:focus{
  border: 1px solid #409eff;
}

</style>
