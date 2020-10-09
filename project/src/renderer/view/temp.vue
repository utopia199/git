<!-- 模板更新 -->
<template>
    <div id="template">
        <div class="screen">

            <el-dropdown  @command="Search">

                <el-input v-model="search" placeholder="搜索条件" style="width:130px;" @input="HandleSearch(search)"></el-input>

                <el-dropdown-menu>
                    <el-dropdown-item v-for="(item,index) in typeTemp" :key="index" v-text="item.name " :command="item"></el-dropdown-item>
                </el-dropdown-menu>

            </el-dropdown>
        </div>
        <el-checkbox-group v-model="checkList">
            <div v-for="(list,index) in fileObj" :key="index">
               
                <el-checkbox :label="list.name"></el-checkbox>
                 
            </div>
            
         
            <!-- <el-checkbox label="选中且禁用" disabled></el-checkbox> -->
        </el-checkbox-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fileObj: new Array(),
            checkList: [],// 选中的数组
            typeTemp: [// 筛选的条件
                {name: "PC", field: "pc"},
                {name: "WAP/APP", field: "wap"},
                {name: "会员中心", field: "user"},
            ],
            search: "",// input 搜索
            tempALL: []// 所有的模板
        }
    },
    computed: {
        userInfo() { return this.$store.state.data.userInfo},// 用户的信息
    },
    created() {
        // 获取指定路径下的所有模板   
        this.$api.UpData({codePath: this.userInfo.svnPath}).then(res=>{
            console.log(res.item)
            this.fileObj = res.item
            this.tempALL = res.item
        }).catch(err=>{

        })
    },
    mounted() {
        
    },
    methods: {
        Search(item) {// 下拉框点击
            this.search = item.name
            this.SearchFunction(item)
        },

        HandleSearch(value) {// input搜索
            this.SearchFunction(value)
        },

        SearchFunction(item) {// 搜索触发的方法 筛选出对应的模板
            this.fileObj = []
            if(typeof item === "object") {
                this.tempALL.forEach(data=>{
                    if(item.field === "pc" && data.name.includes("pc")) {
                        this.fileObj.push(data)
                    }else if(item.field === "wap" && (data.name.includes("wap") || data.name.includes("app"))) {
                        this.fileObj.push(data)
                    }else if(item.field === "user" && data.name.includes("user")) {
                        this.fileObj.push(data) 
                    }
                })
            } else {
                this.tempALL.forEach(data=>{
                    if(data.name.includes(item)) {
                        this.fileObj.push(data) 
                    }
                })
            }
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
    .el-checkbox-group{
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-around;
    }
}
</style>