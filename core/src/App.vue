<script setup>
import {ref, onMounted} from 'vue';
import DocxDemo from './components/DocxDemo.vue';
import ExcelDemo from './components/ExcelDemo.vue';
import PdfDemo from './components/PdfDemo.vue';

const activeKey = ref('DOCX');
onMounted(()=>{

});
</script>

<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="DOCX" tab="docx文件预览">
      <DocxDemo />
    </a-tab-pane>
    <a-tab-pane key="EXCEL" tab="excel文件预览">
      <ExcelDemo />
    </a-tab-pane>
    <a-tab-pane key="PDF" tab="pdf文件预览">
      <PdfDemo />
    </a-tab-pane>
  </a-tabs>

</template>

<style scoped>
/deep/ .ant-tabs-nav-wrap{
  padding-left: 20px !important;
}

</style>
