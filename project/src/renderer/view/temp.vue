<!-- 模板更新 -->
<template>
  <div id="template">
    <div class="screen" v-loading.fullscreen.lock="loading">
        <el-dropdown @command="Search">
            <el-input v-model="search" placeholder="搜索条件" style="width: 130px" @input="HandleSearch(search)"></el-input>
            <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in typeTemp" :key="index" v-text="item.name" :command="item"></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="w_btn">
            <el-button type="danger" @click="Allbuild">批量打包</el-button>
        </div>
        <span @click="Commit">提交代码</span>
    </div>
    <el-checkbox-group v-model="checkList" class="scroll">
        <div class="w_list" v-for="(list, index) in fileObj" :key="index">
            <el-checkbox :label="list.name"></el-checkbox>
            <div class="w_version">
                <div class="w_dban">
                    <span>当前版本</span>
                    <span>{{ list.version }}</span>
                </div>
                <span class="w_xbanben">
                    <span>新版本</span>
                    <input type="text" v-model="list.newV" style="width: 50px" />
                </span>
            </div>
            <el-row>
                <el-button type="primary" @click="Install(list)">初始化</el-button>
                <el-button type="success" @click="BuildCode(list)">打包</el-button>
            </el-row>
        </div>
    </el-checkbox-group>
  </div>
</template>

<script>
import fs from "fs";
export default {
    data() {
        return {
            fileObj: new Array(),
            checkList: [], // 选中的数组
            typeTemp: [
                // 筛选的条件
                { name: "PC", field: "pc" },
                { name: "WAP/APP", field: "wap" },
                { name: "会员中心", field: "user" },
            ],
            search: "", // input 搜索
            tempALL: [], // 所有的模板
            loading: false
        };
    },
    computed: {
        userInfo() {
            return this.$store.state.data.userInfo;
        }, // 用户的信息
    },
    created() {
        let arr = fs.readdirSync(this.userInfo.svnPath); // 获取路径下的所有文件夹
        // 获取指定路径下的所有模板
        this.$api.UpData({ codePath: this.userInfo.svnPath }).then((res) => {
            let data = [];
            for (let i = 0; i < arr.length; i++) {// 循环遍历路径下的所有文件夹与svn打包文件夹是否相同
                
                for (let k = 0; k < res.item.length; k++) {
                    if (arr[i] == res.item[k].name) {
                        res.item[k].newV = ""
                        data.push(res.item[k]);
                    }
                }
            }
            this.fileObj = data;
            this.tempALL = data;
        }).catch((err) => {});
    },
    mounted() {},
    methods: {
        Search(item) {
            // 下拉框点击
            this.search = item.name;
            this.SearchFunction(item);
        },

        HandleSearch(value) {
            // input搜索
            this.SearchFunction(value);
        },

        SearchFunction(item) {
            // 搜索触发的方法 筛选出对应的模板
            this.fileObj = [];
            if (typeof item === "object") {
                this.tempALL.forEach((data) => {
                if (item.field === "pc" && data.name.includes("pc")) {
                    this.fileObj.push(data);
                } else if (
                    item.field === "wap" &&
                    (data.name.includes("wap") || data.name.includes("app"))
                ) {
                    this.fileObj.push(data);
                } else if (item.field === "user" && data.name.includes("user")) {
                    this.fileObj.push(data);
                }
                });
            } else {
                this.tempALL.forEach((data) => {
                    if (data.name.includes(item)) {
                        this.fileObj.push(data);
                    }
                })
            }
        },

        Install(item) {// 更新代码
            this.loading = true
            this.UpCode().then(()=>{
                this.loading = true
                this.$store.dispatch("CODE_INSTALL",{path: this.userInfo.svnPath+'\\'+item.name }).then(res=>{
                    this.$notify({
                        title: '成功',
                        message: res.message,
                        type: 'success'
                    });
                    this.loading = false
                })
            }).catch(err=>{
               this.loading = false
            })
        },

        Commit() {// 提交代码
            this.loading = true
            this.$store.dispatch("COMM_CODE",{svnUserName: this.userInfo.svnUserName, svnUserPasswold: this.userInfo.svnUserPasswold, path:  this.userInfo.svnPath}).then(res=>{
                this.$notify({
                    title: '成功',
                    message: res.message,
                    type: 'success'
                });
                this.loading = false
            }).catch(err=>{
                this.loading = false
            })
        },

        UpCode(isAlert) {// 更新代码
            return new Promise((resolve,reject)=>{
                this.loading = true
                this.$store.dispatch("UP_CODE",{svnUserName: this.userInfo.svnUserName, svnUserPasswold: this.userInfo.svnUserPasswold, path:  this.userInfo.svnPath}).then(res=>{
                    if( isAlert ) {
                        this.$notify({
                            title: '成功',
                            message: res.message,
                            type: 'success'
                        });
                    }
                    resolve(res)
                    this.loading = false
                }).catch(err=>{
                   this.loading = false
                    reject(err)
                })
            })
            
        },

        BuildCode(list) {// 单个打包代码
            this.loading = true
            this.Build(list).then(res=>{
                this.loading = false
                this.$notify({
                    title: '成功',
                    message:options.name+'打包成功',
                    type: 'success'
                });
            }).catch(err=>{
                this.loading = false
            })  
        },

        Allbuild() {// 批量打包
            this.checkList
            let index = this.checkList.length
            let active = 0
            
        },

        Build(options) {// 打包
            return new Promise((resolve,reject)=>{
                this.$api.CodeBuild({path: this.userInfo.svnPath, temp: options.name, version: options.newV}).then(res=>{
                }).catch(err=>{
                })
            })
            
        }
    }
};
</script>

<style lang="scss" scoped>
#template {
    width: 100%;
    display: flex;
    flex-direction: column;
    .screen {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #f1f1f1;
        display: flex;
        .el-dropdown {
            margin-right: 25px;
        }
        .w_btn {
            width: 100px;
        }
    }
    .el-checkbox-group {
        min-height: 10;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        overflow-x: hidden;
        overflow-y: auto;
        .w_list {
            width: 540px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #ccc;
            margin: 15px 5px;
            font-size: 14px;
            color: #010101;
            padding: 0 15px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .w_version {
                width: 190px;
                display: flex;
                justify-content: space-between;
                .w_dban{
                    width: 85px;
                    float: left;
                }
                .w_xbanben {
                    width: 100px;
                float: right;
                }
            }
            .el-row {
                height: 30px;
                line-height: 30px;
                button {
                height: 30px;
                line-height: 5px;
                }
            }
        }
    }
}
</style>