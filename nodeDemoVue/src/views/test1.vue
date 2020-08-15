<!--  -->
<template>
    <div id=''>
        测试1
        <router-link to="/test">测试</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            config:{
                
            }
        }
    },
    //  该组件离开跳转到另外的组件时触发该钩子,常应用于用户表单，当用户填了一部分内容，需要提醒用户是否离开页面
    beforeRouteLeave(to, from){
        console.log(to,from)
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

</style>