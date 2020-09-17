const app = new Vue({
    el: '#app',
    data: {
        addList :{// 添加列表
            typeName: "",// 分类名称
            name: "",// 列表名称
        },
        isAdd: false,// 是否显示添加弹窗
        isEdit: false,// 是否显示编辑弹窗
        typeList: [],
        alertMessage: false,// 弹窗
        loading: false,// 是否显示loading
        isEditBtn: false,// 是否显示编辑的按钮，编辑列表的
        isEditData: false,//编辑列表的参数
    },
    created() {
        this.GetTypeList()
    },
    methods: {
        GetTypeList() {// 获取列表（左侧）
            this.$http({url: "/api/type/list"}).then(res=>{
                this.typeList = res.items
            }).catch(rej=>{

            })
        },

        MenuRight(evt,item,type) {// 鼠标右键触发
            let e = evt || window.event
            this.$refs.editBtn.style.left = e.pageX + "px"
            this.$refs.editBtn.style.top = e.pageY + "px"
            item.typeName = type
            this.isEditBtn = item
        },

        EditList() {// 编辑列表按钮点击
            this.isEditData = JSON.parse(JSON.stringify(this.isEditBtn))
            this.isEditBtn = false
        },

        QuickAdd() {// 确认添加
            this.$http({url: "/api/addList",data: this.addList}).then(res=>{
                this.GetTypeList()
                this.isAdd = false
            }).catch(rej=>{

            })
        },

        QuickEdit() {// 确认编辑列表
            this.$http({url: "/api/delList", data:{id: this.isEditData.id, name: this.isEditData.name,typeName: this.isEditData.typeName}}).then(res=>{
                this.isEditData = false
                this.GetTypeList()
            }).catch(rej=>{})
        },

        DelList() {// 删除列表
            this.$http({url: "/api/delList", data:{id: this.isEditData.id, name: this.isEditData.name,type: 1,typeName: this.isEditData.typeName}}).then(res=>{
                this.isEditData = false
                this.GetTypeList()
            }).catch(rej=>{})
        },

        $http(datas) {// 请求拦截，响应处理
            return new Promise((resolve,reject)=>{
                const httpServer = axios.create({
                    baseURL: "http://10.0.6.103:9191/",// 接口api 地址
                    timeout: 100000
                })

                // 请求拦截
                this.loading = true;
                httpServer.interceptors.request.use(config=>{
                    config.headers["device"] = "PC";
                    config.headers['token'] = "";
                    return config
                })

                // 响应拦截
                httpServer.interceptors.response.use(response=>{
                    const data = response.data;
                    this.loading = false;
                    if(data.status_code === 200) {
                        resolve(data)
                        return data
                    }else {
                        this.alertMessage = data.message
                        return reject(data.message)
                    }
                },error=>{
                    return reject(error)
                })

                httpServer({url:datas.url,data:datas.data,method:"post"})
            })
        }  
    }
});