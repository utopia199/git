<!-- 测试 -->
<template>
    <div id='test'>
        <button @click="SetTemp">设置数据</button>
        <br/>
        <br/>
        <button @click="GetData">获取数据</button>
         <router-link to="/test1">测试1</router-link>
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