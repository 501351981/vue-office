<template>
<div ref="dom" style="height: calc(100vh - 50px);">
    
</div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import jsPdf from '../../packages/js-pdf/index';
import '../../packages/js-excel/index.css';
const dom = ref(null);
onMounted(() => {
    window.myPdfPreview = jsPdf.init(dom.value);
    window.myPdfPreview.preview('/vue-office/examples/dist/static/test-files/test.pdf').then(_=>{
        // window.myPdfPreview.download();
        console.log('excel preview done', window.myPdfPreview);
    }).catch(err=>{
        console.log('err',err);
    });


});

</script>

<style scoped>

</style>