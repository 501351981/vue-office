<script setup>
import VueOfficeExcel from '../../../packages/excel/index';
import '../../../packages/excel/src/index.css';
import PreviewWrapper from '../common/PreviewWrapper.vue';
import useLoading from '../hooks/useLoading.js';
function onRendered(){
    useLoading.hideLoading();
}
function onError(e){
    console.log('出差',e);
    useLoading.hideLoading();
}

</script>

<template>
  <PreviewWrapper
      accept=".xlsx"
      placeholder="请输入xlsx文件地址"
      default-src="https://501351981.github.io/vue-office/examples/dist/static/test-files/test.xlsx"
  >
    <template  v-slot="slotProps">
      <VueOfficeExcel
          :src="slotProps.src"
          style="flex: 1;height: 0"
          v-loading="true"
          @rendered="onRendered"
          @error="onError"
      />
    </template>

  </PreviewWrapper>
</template>


<style scoped>

</style>