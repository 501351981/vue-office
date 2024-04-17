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
        this.myPdfPreviewer = jsPreviewPdf.init(document.getElementById('pdf'), {
            onError: (e)=>{
                console.log('发生错误', e)
            },
            onRendered: ()=>{
                console.log('渲染完成')
            }
        });
        this.myPdfPreviewer.preview('http://static.shanhuxueyuan.com/test.pdf');
    },
    beforeUnmount() {
        this.myPdfPreviewer.destroy();
    }
};
</script>

<style scoped>

</style>