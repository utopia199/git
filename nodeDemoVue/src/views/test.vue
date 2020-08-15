<!--
 * @Author: your name
 * @Date: 2020-07-28 14:20:58
 * @LastEditTime: 2020-08-05 21:43:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodese:\aoneQt\vue-cli4\src\views\test.vue
-->
<!-- 测试 -->
<template>
    <div id='test'>
        <button @click="SetTemp">设置数据</button>
        <br/>
        <br/>
        <button @click="GetData">获取数据</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            temp: new Array()
        }
    },
    computed: {
        
    },
    created() {
        
    },
    mounted() {
        
    },
    methods: {
       SetTemp() {// 设置数据
            
       },
       GetData() {// 获取数据库数据
            this.$http.GetDataBase().then(res=>{
                console.log(res)
            }).catch(()=>{})
       }
    },
}
</script>

<style lang='scss' scoped>
#test{
    padding: 50px;
}
</style>