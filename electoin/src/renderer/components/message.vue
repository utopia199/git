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
                    :headers="{token: message.token}"
                    :multiple="false"
                    :on-success="Success"
                    :before-upload="Upload">
                    <img :src="userInfo.head" class="user_head cursor">
               
                </el-upload>

                <!-- 消息 -->
                <div class="icon cursor" :class="{is_actice :active === 0}" @click="active = 0">
                    <i class="el-icon-chat-dot-round"></i>
                </div>

                <!-- 通讯录 -->
                <div class="icon cursor" :class="{is_actice :active === 1}" @click="active = 1">
                    <i class="el-icon-s-custom"></i>
                </div>
            </div>

            <!-- 记录 -->
            <div class="list">
                <!-- <input type="text" v-model="message.message">
                <button @click="tttq">发送</button> -->
            </div>
        </nav>

        <menu>
            <div class="message_content">
                <div v-for="(item,index) in messageData" :key="index+new Date().getTime()">
                    <p v-text="item.userName"></p>
                    <div v-text="item.message"></div>
                </div>
            </div>
            <div class="user_send">
                <input type="text" v-model="message.message" @keydown.enter="Send">
                <span class="send_btn" @click="Send">发送</span>
            </div>
        </menu>
    </div>
</template>

<script>

export default {
    data() {
        return {
            active: 0,// 0是消息 1是通讯录
            message: {
                message: "",
                token: window.localStorage.getItem("key")
            },
            messageData: new Array()
        }
    },
    computed: {
        userInfo(){ 
            return this.$store.state.user.userInfo 
        }
    },
    sockets:{
     
      connect(){//这里是监听connect事件
        this.$socket.emit('OnLine',this.message.token);
        console.log('链接服务器',this.message.token);
      },

      
      disconnect(){// 监听断开连接，函数
        console.log('断开服务器连接');
	  },

	  Message(data) {// 监听大厅的消息
        if( Array.isArray(data)){
            this.messageData = data
        } else {
            this.messageData.push(data)
        }
        
	  },

	  State(data) {// 用户上线监听
        if(this.message.token !== data.key) {// 判断是否是自己
            console.log(data.userName,'上线啦')
        }
	  },

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
        Success(res, file) {// 上传成功回调
            this.$store.dispatch("getUserInfo")
        },

        Upload(file) {// 上传之前
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 1;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isJPG && isLt2M;
        },

        Send() {//发送信息给服务端
            this.$socket.emit('message',this.message);
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
            .icon{
                margin-top:30px;
                font-size: 25px;
                color:#666667;
            }
            .is_actice{
                color:#07c160;
            }
        }

        .list{
            flex: 1;
        }
    }
    menu{
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .message_content{
            flex: 1;
            overflow: auto;
            background-color: #f1f1f1;
        }
        .user_send{
            height: 40px;
            background-color: #fff;
            display: flex;
            align-items: center;
            padding:0 10px;
            box-sizing: border-box;
            input{
                height: 100%;
                padding-left: 5px;
                box-sizing: border-box;
                flex: 1;
                border:none;
            }
            .send_btn{
                width: 70px;
                height: 25px;
                line-height: 25px;
                background-color: #f5f5f5;
                border:1px solid #e5e5e5;
                color:#606060;
                letter-spacing: 2px;
                text-align: center;
                font-size: 14px;
            }
        }
    }
}
</style>