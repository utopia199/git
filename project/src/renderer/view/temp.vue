<!-- 模板更新 -->
<template>
    <div id="template">
        <div class="screen">

            <el-dropdown  @command="Search">
                <el-input v-model="search" placeholder="搜索条件" style="width:130px;" @select="HandleSearch(search)"></el-input>

            

                <el-dropdown-menu>
                    <el-dropdown-item v-for="(item,index) in typeTemp" :key="index" v-text="item.name " :command="item"></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <!-- <el-input v-model="search" placeholder="请输入模板名称" style="width:130px;"></el-input> -->
        </div>
        <el-checkbox-group v-model="checkList">
            <el-checkbox :label="list" v-for="(list,index) in fileObj" :key="index"></el-checkbox>
         
            <el-checkbox label="选中且禁用" disabled></el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
import fs from "fs"
export default {
    data() {
        return {
            fileObj: new Array(),
            checkList: [],
            typeTemp: [
                {name: "PC", field: "pc"},
                {name: "WAP/APP", field: "wap"},
                {name: "会员中心", field: "user"},
            ],
            search: ""

        }
    },
    computed: {
        userInfo() { return this.$store.state.data.userInfo}
    },
    created() {

        let obj = fs.readdirSync(this.userInfo.svnPath)
        let arr = []
        // 遍历筛选出文件夹
        obj.forEach(file=>{
            let stat = fs.lstatSync(this.userInfo.svnPath+'\\'+ file)
            if (stat.isDirectory() && !file.includes(".svn")) { 
                arr.push(file)
            }
        })
        this.fileObj = arr
    },
    mounted() {
        
    },
    methods: {
        Search(item) {// 下拉框点击
            console.log(item)
        },

        HandleSearch(value) {// input搜索
            console.log(value)
        }
    },
}
</script>

<style lang="scss" scoped>
#template{
    width: 100%;

    .screen{
        width: 100%;
        height: 50px;
        border-bottom:1px solid #f1f1f1;
        .el-dropdown{
            margin-right:25px;
        }
    }
}
</style>