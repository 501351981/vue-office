<template>
<div ref="dom" style="height: calc(100vh - 50px)">
    
</div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import jsExcel from '../../packages/js-excel/index';
import '../../packages/js-excel/index.css';
const dom = ref(null);
onMounted(() => {
    window.myExcelPreview = jsExcel.init(dom.value, {

    });
    window.myExcelPreview.preview('/vue-office/examples/dist/static/test-files/test.xlsx').then(_=>{
        // window.myExcelPreview.download();
        console.log('excel preview done', window.myExcelPreview);
    }).catch(err=>{
        console.log('err',err);
    });

});

</script>

<style scoped>

</style>