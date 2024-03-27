<template>
    <div id="pdf"></div>
</template>

<script>
import jsPreviewPdf from "@js-preview/pdf";
export default {
    name: "JsPreviewPdfDemo",
    data(){
        return {
            myPdfPreviewer: null
        }
    },
    mounted() {
        this.myPdfPreviewer = jsPreviewPdf.init(document.getElementById('pdf'));
        this.myPdfPreviewer.preview('http://static.shanhuxueyuan.com/test.pdf').then(()=>{
            console.log('预览完成');
        }).catch(e=>{
            console.log('预览失败', e);
        })
    },
    beforeDestroy() {
        this.myPdfPreviewer.destroy();
    }
};
</script>

<style scoped>

</style>