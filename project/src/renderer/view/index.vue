<!-- 入口 -->
<template>
    <div id="index">
        <nav class="scroll">
            <el-menu default-active="0-0" class="el-menu-vertical-demo" :router="true">
                <el-submenu :index="String(index)" v-for="(item,index) in navData" :key="index">

                    <template slot="title">
                        <!-- icon -->
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="'#icon-'+item.icon"></use>
                        </svg>
                        <!-- 描述 -->
                        <span slot="title" v-text="item.title"></span>
                    </template>
                    <!-- 遍历二级 -->
                    <el-menu-item-group v-for="(sub,k) in item.sub" :key="k+','+index">
                        <!-- 二级列表 -->
                        <el-menu-item :index="index+'-'+k" v-text="sub.title" :route="sub.href"></el-menu-item>
                    </el-menu-item-group>
                     
                </el-submenu>
            </el-menu>
        
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navData: [
                {title: "模板管理", icon: "moban", sub: [
                    {title:"模板更新",href:"/temp"}
                ]},
                {title: "electron", icon: "huabanfuben", sub: [
                    {title:"操作Windows",href:"/windows"}
                ]}
            ]
        }
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

<style lang="scss" scoped>
#index{
    display: flex;
    height: 100%;
    nav{
        width: 200px;
        background-color: #f1f1f1;
        overflow: auto;
        height: 100%;
    }
    >div{
        flex: 1;
    }
}
</style>