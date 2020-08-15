<!-- 首页 -->
<template>
  <div id='home'>
    <nav>
      <router-link :to="item.href" v-for="item in route" :key="item.href" v-text="item.title"></router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: [
        {title: "产品", href: "product"},
        {title: "列表", href: "list"},
        {title: "帮助", href: "help"},
        {title: "关于我们", href: "aboutUs"},
      ]
    }
  },
  computed: {
    
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    
  },
}
</script>

<style lang='scss' scoped>
#home{
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  nav{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 45px;
    width: 1000px;
    margin:0 auto;
    a{
      color:#000;
    }
  }
  >div{
    flex: 1;
    background-color: #f1f1f1;
  }

}
</style>