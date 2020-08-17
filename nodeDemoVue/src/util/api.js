import request from "./request"
const config = {
    GetSite: "/api/type/list",// 网站基本数据 
    
    GetData: "/api/getData",// 获取详情 传type 和列表id

    SetData: "/api/setData",// 设置数据 传分类ID(type_id)、列表ID(id) 内容(content)

    GetTemp: "/api/getTemp",// 获取所有的模板

    Addlist: "/api/addList",// 添加列表 传分类type，列表名称name
	
		Dellist: "/api/delList",// 删除列表 传分类type，列表名称name
		
		Edilist: "/api/ediList",// 修改列表 传分类type，列表名称name, 列表id

    GetDataBase: "/api/getDataBase",// 获取数据库

    SetDataBase: "/api/setDataBase"
    
}


let exports = new Object()
for(var k in config){
    let url = config[k]
    exports[k] = function (data,type){
        return request({
            url: url,
            method: type ? type : "post" ,
            data
        })
    }
}
export default exports