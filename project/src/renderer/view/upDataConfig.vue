<!-- 模板更新配置 -->
<template>
    <div id='upDataConfig'>
        <el-form ref="form" :model="config" label-width="80px">
            <el-form-item label="SVN路径">
                <el-input v-model="config.svnPath" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item label="SVN帐号">
                <el-input v-model="config.svnUserName" style="width:217px"></el-input>
            </el-form-item>
            <el-form-item label="SVN密码">
                <el-input v-model="config.svnUserPasswold" style="width:217px" :show-password="true" type="password"></el-input>
            </el-form-item>
            <el-form-item label="发送目标">
                <el-select v-model="config.user" placeholder="请选择发送的人">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
         
            <el-form-item label="即时发送">
                <el-switch v-model="config.send"></el-switch>
            </el-form-item>
      
            <el-form-item>
                <el-button type="primary" @click="Save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            config: {
                svnPath: "",
                user:"",
                svnUserName:"",
                svnUserPasswold:"",
                send: true
            }
        }
    },
    computed: {
        userInfo() { return this.$store.state.data.userInfo}
    },
 
    created() {
        // 赋值值
        for(let k in this.config){
            this.config[k] = this.userInfo[k]
        }
    },
    mounted() {
        
    },
    methods: {
        Save() {
            const loading = this.$loading({
                lock: true,
                text: '数据加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$api.SetConfig(this.config).then(res=>{
                this.$store.dispatch("GET_USER_INFO")
                let out = setTimeout(() => {
                    loading.close();
                    clearTimeout(out)
                }, 1000);
                
            })
        }
    },
}
</script>

<style lang='scss' scoped>
#upDataConfig{
    form{
        margin-top:100px;
        width: auto;
        margin-left:150px;
        
    }
}
</style>