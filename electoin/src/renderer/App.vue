<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import fs from "fs"
  export default {
    name: 'elect',
    mounted() {
      fs.readFile('./login.json', 'utf-8', function(err, data) {
        if(data && data !== "undefined") {
          window.localStorage.setItem("key",Object.values(JSON.parse(data))[0])
        }
      });
    },
  }
</script>

<style>
  /* CSS */
</style>
