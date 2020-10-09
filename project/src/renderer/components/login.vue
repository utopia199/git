<!-- 登陆 -->
<template>
    <div id='login'>
        <el-form ref="form" :model="login" label-width="60px">
            <div class="login_title">
                登录
            </div>
            <el-form-item label="用户名">
                <el-input v-model="login.userName" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="login.passworld" style="width:200px" :show-password="true" type="password"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" :loading="isloading" @click="Login" >登录</el-button>
                <el-button @click="Register"  :loading="isloadingR">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import fs from "fs"
export default {
    data() {
        return {
            login: {
                userName: "",
                passworld: "" 
            },
            isloading: false,
            isloadingR: false
        }
    },
    computed: {
        
    },
    created() {
        
    },
    mounted() {
       
    },
    methods: {
        Login() {// 登陆
            this.isloading = true
            this.$api.Login(this.login).then(res=>{

                let config = JSON.parse(fs.readFileSync('./axiosConfig.json', 'utf-8'));
                config.key = res.key
                fs.writeFileSync('./axiosConfig.json', JSON.stringify(config))

                this.$store.dispatch("GET_STATE").then(resolve=>{// 改变状态
                    
                    this.$store.dispatch("GET_USER_INFO").then(result=>{// 获取用户信息
                        this.isloading = false
                        this.$router.push("/temp")
                    })
                })

            }).catch(err=>{
                this.isloading = false
            })
        },

        Register() {// 注册
            this.isloadingR = true
            this.login.type = 1
            this.$api.Login(this.login).then(res=>{
                let config = JSON.parse(fs.readFileSync('./axiosConfig.json', 'utf-8'));
                config.key = res.key
                fs.writeFileSync('./axiosConfig.json', JSON.stringify(config))

                this.$store.dispatch("GET_STATE").then(resolve=>{
                    this.$store.dispatch("GET_USER_INFO").then(result=>{// 获取用户信息
                        this.isloading = false
                        this.$router.push("/temp")
                    })
                })
                
            }).catch(err=>{
                this.isloadingR = false
            })
        }
    },
}
</script>

<style lang='scss' scoped>
    #login{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background:url("../assets/login_bg.jpg")  no-repeat ;
        .login_title{
            font-size: 20px;
            font-weight: 600;
            text-align: center;
            margin:20px 0;
        }
        form{
            height: 300px;
            background-color: #fff;
            border-radius: 5px;
            padding:0 15px;
        }
    }
</style>