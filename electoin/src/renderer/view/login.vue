<!-- 登陆注册 -->
<template>
    <div id="login">
        <div class="main">
            <h1>帐号登录</h1>

            <el-input v-model="axiosConfig.userName">
                <template slot="prepend">帐号</template>
            </el-input>
    
            <el-input v-model="axiosConfig.passworld">
                <template slot="prepend">密码</template>
            </el-input>

            <el-button type="primary" :loading="isloading" @click="Login" >登录</el-button>
            <p class="register cursor" @click="Register">注册</p>
        </div>
    </div>
</template>
<script>
import fs from "fs"
export default {
    name: "login",
    data() {
        return {
            axiosConfig: {
                userName: "",
                passworld: ""
            },
            isloading: false
        }
    },

    methods: {
        Login() {// 登陆
            this.isloading = true
            this.$api.Login(this.axiosConfig).then(res=>{
                this.isloading = false   
                this.$message({
                    message: res.message,
                    type: 'success'
                });
                let key = new Object()
                key[this.axiosConfig.userName] = res.key
                fs.writeFile('./login.json', JSON.stringify(key), err=> {
                    if (err) {
                        throw err;
                    }
                    window.localStorage.setItem("key",key)
                    this.$router.push('/home')
                });
            }).catch(err=>{
                this.isloading = false    
            })
        },

        Register() {// 注册
            this.axiosConfig.type = 1
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            
            this.$api.Login(this.axiosConfig).then(res=>{
                let key = new Object()
                key[this.axiosConfig.userName] = res.key
                fs.writeFile('./login.json', JSON.stringify(key), err=> {
                    if (err) {
                        throw err;
                    }
                    this.$router.push('/home')
                });
                this.$message({
                    message: res.message,
                    type: 'success'
                });
                loading.close();
            }).catch(err=>{
                loading.close();
            })
        }
    },
}
</script>
<style lang="scss" scope>
    #login{
        width: 100%;
        height: 100%;
        background:url("../assets/login_bg.jpg") no-repeat center ;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .main{
            width: 300px;
            padding-bottom:35px;
            background-color: #ffffff;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            box-shadow: 0px 0px 7px #43e819;
            animation: shodw 2s infinite;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            @keyframes shodw {
                0%{
                    box-shadow: 0px 0px 1px #43e819;
                }
                50%{
                    box-shadow: 0px 0px 10px #43e819;
                }
                100%{
                    box-shadow: 0px 0px 1px #43e819;
                }
            }
            h1{
                text-align: center;
                width: 100%;
                font-size: 20px;
                line-height: 70px;
            }
           
            .el-input-group{
                width: 260px;
                margin-top:15px;
            }
               
            button[type='button']{
                width: 100px;
                margin:25px auto 0;
            }
            .register{
                position: absolute;
                right:15px;bottom:15px;
                font-size: 14px;
                &:hover{
                    color:#1989fa;
                }
            }
        }
    }
</style>        
