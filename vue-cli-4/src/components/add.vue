<!-- 添加组件 -->
<template>
  <div id="add" @dblclick="Remove">
      <menu>
        <h4 v-text="title"></h4> 
        <input 
            type="text" 
            class="input_text" 
            v-model="name"
            :placeholder="type?'请输入需要添加列表的名称':'请输入需要添加分类的名称'">
        <div class="submit" @click="AddList">确定添加</div>
      </menu>
  </div>
</template>

<script>
export default {
    data() {
        return {
            name: ""
        }
    },
    methods: {
        Remove() {
            this.$el.remove()  
        },
        
        AddList() {
            this.$http.Addlist({type: this.type, name: this.name}).then(()=>{
                this.$http.GetSite().then(res=>{
                    this.$store.commit("SET_ASIDE",res)
                }).catch(()=>{

                })
            }).catch(()=>{
                
            })
        }
    },
}
</script>

<style lang="scss" scope>
#add{
    position: fixed;
    left:0;top:0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    menu{
        width: 500px;
        min-height: 150px;
        background:#ffffff;
        border-radius: 10px;
    }
    h4{
        text-align: center;
        font-size: 18px;
        line-height: 40px;
        margin: 15px auto;
    }
    input{
        width: 210px;
        height: 35px;
        display: block;
        margin: 15px auto;
    }
    .submit{
        width: 130px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background-color: #4e6ef2;
        border-radius: 5px;
        color:#fff;
        margin:30px auto;
        font-size: 18px;
        letter-spacing: 1px;
        cursor: pointer;
        user-select: none;
        transition: all .3s;
        &:hover{
            box-shadow: 1px 2px 10px #4e6ef2;
        }
    }
}
</style>    