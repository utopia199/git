<!--
 * @Author: your name
 * @Date: 2020-07-25 18:02:32
 * @LastEditTime: 2020-07-31 23:13:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodese:\aoneQt\vue-cli4\src\components\tinymce.vue
--> 
<!-- 富文本编辑器 -->
<!-- API 地址 https://www.tiny.cloud/docs/plugins/save/ -->
<!-- @onGetContent 富文本改动的时候触发 -->
<template>
  <div id="tinymces">
    <Editor
      v-model="tinymceHtml"
      :init="editorInit"
    />
    <!-- 侧边工具栏 -->
    <aside>
      <span class="iconfont icon-x" @click="$emit('Close')"></span>
      <span class="iconfont icon-yanjing1" @click="preview = true"></span>
    </aside>
    <!-- 预览 -->
    <menu v-html="tinymceHtml" v-if="preview" @dblclick="preview = false"></menu>
    
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue"
export default {
  components: { Editor },
  props: {
    value: {// 默认值
      type: String,
      default: ""
    },
    height: {// 高度
      type: [Number,String],
      default: "70%"
    },
    width: {// 高度
      type: [Number,String],
      default: "60%"
    }
  },
  data() {
    return {
      tinymceHtml: this.value,
      preview: false,// 预览
      editorInit: {
        height: this.height,
        width: this.width,
        document_base_url: "/",// 本地
        convert_urls: false, // 避免编辑器修改图片路径
        language: "zh_CN",// 语言包
        plugins: "lists image media table code link save",// 工具栏显示
        toolbar: "undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat code link save",
        automatic_uploads: true,// 是否开启上传功能
        branding: false,//去除右下角的"由tinymce驱动"
        image_advtab: true, //开启图片上传的高级选项功能
        imgage_href: true,
        image_title: true, // 是否开启图片标题设置的选择，这里设置false
        image_dimensions: false,// 是否显示图片宽高
        image_description: true, // 图片描述
        save_onsavecallback: ()=> {// 点击保存触发
          this.$emit('save',this.tinymceHtml)
        },
        images_upload_handler: (blobInfo, success, failure) => {
          console.log(success)
          console.log(failure)
            /* 保存图片 */
            var formData;
            formData = new FormData();
            formData.append("upfile", blobInfo.blob());
            formData.append("tag", window.siteHeaders.site_tag);
            formData.append("action", "uploadimage");
            console.log(formData)
            // axios({
            //     method: "post",
            //     url: "https://upload.hnjdly.com/action_upload.php",
            //     data: formData
            // }).then(res=>{
            //     if(res.data.state==="SUCCESS"){
            //         success("https://upload.hnjdly.com"+res.data.url)
            //         console.log("https://upload.hnjdly.com"+res.data.url)
            //         this.$NProgress.done();// 结束
            //         this.$alert({center:this.$Lang.pub_var.pub_2,type:"success"})
            //     }else{
            //         this.$alert({center:this.$Lang.pub_var.pub_3,type:"fail"})
            //         success("")
            //         this.$NProgress.done();// 结束
            //     }
            // }).catch(err=>{
            //     this.$alert({center:this.$Lang.pub_var.pub_3,type:"fail"})
            //     success("")
            //     this.$NProgress.done();// 结束
            // })
        },
      }
    }
  },
  watch: {
    "value"(oldValue){// 处理异步值不能及时更新
      if( !this.tinymceHtml ){
        this.tinymceHtml = oldValue
      }
    }
  },
  methods: {
   
  },
}
</script>

<style lang="scss" scoped>
#tinymces{
  position: fixed;
  left:0;top:0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.664);
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding-top:160px;
  
  aside{
    display: flex;
    flex-direction: column;
    .icon-x,.icon-yanjing1{
      width: 39px;
      height: 39px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
      color:#000;
      font-size: 20px;
      cursor: pointer;
      
    }
    .icon-x{
      border-top-right-radius:5px;
      &:hover{
        color:rgb(255, 0, 55);
      }
    }
    .icon-yanjing1{
      border-bottom-right-radius:5px;
      border-top:1px solid #ccc;
      &:hover{
        color:rgb(0, 132, 255);
      }
    }
    
  }
  menu{
    position: fixed;
    left: 0;top: 0;
    width: 100%;
    height: 100%;
    background: ghostwhite;
    z-index: 9;
    overflow: auto;
  }
}
</style>
<style>
  .tox-notifications-container{/* 隐藏警告信息 */ 
    display:none !important;
  } 
</style>