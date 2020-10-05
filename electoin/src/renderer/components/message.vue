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
         
            </div>
        </nav>

        <menu>
            <div class="message_title">
                <span>大厅</span>
                <span class="num">(当前在线人数{{lineNum}})</span>
            </div>
            <div class="message_content scroll" ref="message">
                <div 
                    v-for="(item,index) in messageData" 
                    :key="index+new Date().getTime()" 
                    class="message_list"
                    :class="{'my_send_message':item.key === message.token}">
                    <p v-if="item.key !== message.token"><img :src="item.head" class="user_head"></p>
                    <div v-html="item.message" class="message_list_content"></div>
                    <p v-if="item.key === message.token"><img :src="item.head" class="user_head"></p>
                </div>
            </div>
            <div class="user_send">
                <input type="text" v-model="message.message" @keydown.enter="Send">
                <!-- <el-input
                    type="textarea"
                    :rows="4"
                    resize="none"
                    @keyup.enter.native="Send"
                    v-model="message.message">
                </el-input> -->
                <span class="send_btn" @click="Send">发送</span>
            </div>
        </menu>
    </div>
</template>

<script>
import fs from "fs"
export default {
    data() {
        return {
            active: 0,// 0是消息 1是通讯录
            message: {
                message: "",
                token: ""
            },
            messageData: new Array(),
            lineNum: 0
        }
    },
    computed: {
        userInfo(){ 
            return this.$store.state.user.userInfo 
        }
    },
    
    created() {
        // 获取会员token 
        fs.readFile('./login.json', 'utf-8', (err, data)=> {
            if(err){return}
            if(data && data !== "undefined") {
                this.message.token = Object.values(JSON.parse(data))[0]
            }
        });

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
        // 避免 socket没有创建出来导致没有发送消息
        var timerOne = window.setInterval(() => {
            if (this.$socket) {
                this.$socket.emit('connect', 1)
                window.clearInterval(timerOne)
                return;
            }
        }, 500)
  
    },

    sockets: {
     
      connect(){//这里是监听connect事件
        this.$socket.emit('OnLine',this.message.token);
      },

      
      disconnect(){// 监听断开连接，函数
        console.log('断开服务器连接');
        this.$socket.emit('outLine');
	  },

	  Message(data) {// 监听大厅的消息
        if( Array.isArray(data)){
            this.messageData = data
        } else {
            this.messageData.push(data)
            const notification = {
                title: data.userName,
                body: data.message,
                icon: data.head,
                tag: new Date(),
                renotify: true
            }
            if(data.key !== this.message.token){
                const myNotification = new window.Notification(notification.title, notification)
                myNotification.onclick = () => {
                    console.log('通知被点击')
                }
            }
        }

        let scroll = setTimeout(() => {
            this.$refs.message.scrollTo(0,this.$refs.message.scrollHeight)
            clearTimeout(scroll)
        }, 100);
        
	  },

	  State(data) {// 用户上线监听
        if(this.message.token !== data.key) {// 判断是否是自己
            console.log(data.userName,'上线啦')
        }
        this.lineNum = data.num
	  }

    },

    methods: {
        Success(res, file) {// 上传成功回调
            this.$store.dispatch("getUserInfo")
        },

        Upload(file) {// 上传之前
            const isLt2M = file.size / 1024 / 1024 < 1;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isLt2M;
        },

        Send() {//发送信息给服务端
           
           
            if(this.message.message) {
                this.$socket.emit('message',this.message);
                this.message.message = ""
            }
        }

    },
}
</script>

<style lang='scss' scoped>
#message {
    width: 700px;
    height: 600px;
    width: 100%;
    height: 100%;
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
        .message_title{
            height: 40px;
            line-height: 40px;
            padding-left:30px;
            box-sizing: border-box;
            border-bottom:1px solid #e7e7e7;
            .num{
                font-size: 13px;
            }
        }
        .message_content{
            flex: 1;
            overflow: auto;
            background-color: #f1f1f1;
            padding:20px 10px;
            box-sizing: border-box;
            .message_list{// 消息列表
                display:flex;
                margin-top:15px;
                font-size: 14px;
                .user_head{// 用户头像
                    max-width: 35px;
                    height: 35px;
                }
                .message_list_content{
                    min-height: 25px;
                    background-color: #fff;
                    border-radius: 3px;
                    margin-left:20px;
                    max-width: 280px;
                    line-height:25px;
                    padding:5px 10px;
                    position: relative;
                    border:1px solid #ededed;
                    &::after{
                        content: "";
                        display:block;
                        width:0;
                        height:0;
                        border-width:0px 10px 10px 0;
                        border-style:solid;
                        border-color:transparent transparent #fff transparent;/*透明 透明 黄*/
                        position:absolute;
                        top:15px;
                        left:-5px;
                        transform: rotate(45deg);
                    }
                }
            }
            .my_send_message{
                justify-content: flex-end;
                >.message_list_content{
                    margin-right:20px;
                    border:none;
                    background-color: #9eea6a;
                    &::after{display: none;}
                    &::before{
                        content: "";
                        display:block;
                        width:0;
                        height:0;
                        border-width:0px 10px 10px 0;
                        border-style:solid;
                        border-color:transparent transparent #9eea6a transparent;/*透明 透明 黄*/
                        position:absolute;
                        top:15px;
                        right:-5px;
                        transform: rotate(-140deg);
                    }
                }
            }
        }
        .user_send{
            // height: 140px;
            min-height: 40px;
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