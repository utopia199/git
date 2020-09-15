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
    },
    created() {
        this.GetTypeList()
    },
    mounted() {
       
    },
    watch: {

    },
    methods: {
        GetTypeList() {// 获取列表（左侧）
            this.$http({url: "/api/type/list"}).then(res=>{
                console.log(res.items)
                this.typeList = res.items
            }).catch(rej=>{

            })
        },

        MenuRight(evt) {// 鼠标右键触发
            console.log(evt)
        },

        QuickAdd() {// 确认添加
            this.$http({url: "/api/addList",data: this.addList}).then(res=>{
                console.log(res)
            }).catch(rej=>{

            })
        },

        $http(datas) {// 请求拦截，响应处理
            return new Promise((resolve,reject)=>{
                const httpServer = axios.create({
                    baseURL: "http://10.0.6.103:9191/",// 接口api 地址
                    timeout: 100000
                })

                // 请求拦截
                httpServer.interceptors.request.use(config=>{
                    config.headers["device"] = "PC";
                    config.headers['token'] = "";
                    return config
                })

                // 响应拦截
                httpServer.interceptors.response.use(response=>{
                    const data = response.data
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

function $http(datas) {// 请求拦截，响应处理
    return new Promise((resolve,reject)=>{
        const httpServer = axios.create({
            baseURL: "http://10.0.6.103:9191/",// 接口api 地址
            timeout: 100000
        })

        // 请求拦截
        httpServer.interceptors.request.use(config=>{
            config.headers["device"] = "PC";
            config.headers['token'] = "";
            return config
        })

        // 响应拦截
        httpServer.interceptors.response.use(response=>{
            const data = response.data
            if(data.status_code === 200) {
                resolve(data)
                return data
            }else {
                return reject(data.message)
            }
        },error=>{
            return reject(error)
        })

        httpServer({url:datas.url,data:datas.data,method:"post"})
    })
}