<!-- 详情页面 -->
<template>
  <div id='list' @dblclick= "showTinymce = true">
    <div v-html="active.body"></div>
    <tinymce :value="active.body" @save="Submit" @Close="showTinymce = false" v-if="showTinymce"></tinymce>
  </div>
</template>

<script>
import tinymce from '@/components/tinymce'
export default {
  components:{tinymce},
  props: {
    types: {
      type: String
    },
    id: {
      type: [String,Number]
    }
  },
  data() {
    return {
      axiosConfig:{
        type: 0,
        id: 0,
      },
      showTinymce: false,// 是否显示编辑
      active: new Object()

    }
  },
  computed: {
    
  },
  watch: {
    "types"(oldValue){
      if( oldValue ){
        this.axiosConfig.type = oldValue 
        this.GetData()
      }
      
    },
    "id"(oldValue){
      this.axiosConfig.id = oldValue 
      this.GetData()
    }
  },
  created() {
    this.axiosConfig.id = this.id 
    this.axiosConfig.type = this.types 
    this.GetData()
  },
  mounted() {
    
  },
  methods: {
    GetData() {// 获取数据
      this.$http.GetData(this.axiosConfig).then(res=>{
        this.active = res.items
      }).catch(()=>{})
    },

    Submit(value) {// 富文本保存触发
      this.$http.SetData({type: this.types, id: this.id, content:value,admin:"admin"}).then(()=>{
        this.GetData()
      }).catch(()=>{})
    }
  },
}
</script>

<style lang='scss' scoped>
#list{
  min-height: 100px;
}
</style>