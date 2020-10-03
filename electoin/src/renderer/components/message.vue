<!-- 消息 -->
<template>
    <div id="message">
        <nav>
            <!-- 通讯录 -->
            <div class="mail">
                <!-- 用户头像 -->
                <el-upload
                    action="http://192.168.0.113:9527/api/uploadImage"
                    class="avatar-uploader"
                    :show-file-list="false"
                    :headers="{token: token}"
                    :multiple="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img :src="img || userInfo.head" class="user_head cursor">
               
                </el-upload>
            </div>

            <!-- 记录 -->
            <div class="list">

            </div>
        </nav>

        <menu>

        </menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            token: window.localStorage.getItem("key"),
            img: null
        }
    },
    computed: {
        userInfo(){ 
            return this.$store.state.user.userInfo 
        }
    },
    created() {
        this.$store.dispatch("getUserInfo").then(res=>{
          
        }).catch(error=>{
            this.$message({
                message: error.message,
                type: 'error'
            });
            this.$router.push("login")
        })
    },
    mounted() {
        
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log(res.file)
            console.log(file.response.path)
            this.img = file.response.path
        },
        beforeAvatarUpload(file) {
            // console.log(file)
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        } 
    },
}
</script>

<style lang='scss' scoped>
#message {
    width: 700px;
    height: 600px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    overflow: hidden;
    nav{
        
        width: 300px;
        height: 100%;
        overflow-y: auto;
        background-color: #e6e5e5;
        display: flex;

        .mail{
            width: 60px;
            background-color: #fff;
            background-color: #28292c;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top:20px;
            box-sizing: border-box;
            .user_head{
                width: 35px;
                height: 35px;
                border-radius: 3px;
            }
        }

        .list{
            flex: 1;
        }
    }
    menu{
        flex: 1;
    }
}
</style>