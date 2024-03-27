<template>
    <div id="docx"></div>
</template>

<script>
import jsPreviewDocx from "@js-preview/docx";
import '@js-preview/docx/lib/index.css'
export default {
    name: "JsPreviewDocxDemo",
    data(){
      return {
          myDocxPreviewer: null
      }
    },
    mounted() {
        //初始化时指明要挂载的父元素Dom节点
        this.myDocxPreviewer = jsPreviewDocx.init(document.getElementById('docx'));

//传递要预览的文件地址即可
        this.myDocxPreviewer.preview('http://static.shanhuxueyuan.com/test.docx').then(()=>{
            console.log('预览完成');
        }).catch(e=>{
            console.log('预览失败', e);
        })
    },
    beforeUnmount() {
        this.myDocxPreviewer.destroy();
    }
};
</script>

<style scoped>

</style>