<script setup>
import VueOfficeExcel from '../../packages/vue-excel/index';
import '../../packages/vue-excel/src/index.css';
import PreviewWrapper from '../common/PreviewWrapper.vue';
import useLoading from '../hooks/useLoading.js';
import {ref} from 'vue';
function onRendered(){
    useLoading.hideLoading();
}
function onError(e){
    console.log('出差',e);
    useLoading.hideLoading();
}

function transformData(data){
    console.log('transformData', data);
    return data;
}

const defaultSrc = location.origin +
    (location.pathname + '/').replace('//', '/')
    + 'static/test-files/test.xlsx';
const docxRef = ref();

// setTimeout(()=>{
//     console.log( docxRef.value.download());
// }, 2000);
</script>

<template>
  <PreviewWrapper
      accept=".xlsx"
      placeholder="请输入xlsx文件地址"
      :default-src="defaultSrc"
  >
    <template  v-slot="slotProps">
      <VueOfficeExcel
          ref="docxRef"
          :src="slotProps.src"
          :options="{transformData}"
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