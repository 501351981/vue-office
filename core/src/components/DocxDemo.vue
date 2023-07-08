<script setup>
import {ref} from 'vue';
import VueOfficeDocx from '../../packages/vue-docx/index';
import PreviewWrapper from '../common/PreviewWrapper.vue';
import useLoading from '../hooks/useLoading.js';
function onRendered(){
    useLoading.hideLoading();
}
function onError(e){
    console.log('出差',e);
    useLoading.hideLoading();
}

const defaultSrc = location.origin +
    (location.pathname + '/').replace('//', '/')
    + 'static/test-files/test.docx';

const docxRef = ref();

// setTimeout(()=>{
//    console.log( docxRef.value.download());
// }, 2000);
</script>

<template>
  <PreviewWrapper
      accept=".docx"
      placeholder="请输入docx文件地址"
      :default-src="defaultSrc"
  >
    <template  v-slot="slotProps">
      <VueOfficeDocx
          ref="docxRef"
          :src="slotProps.src"
          style="flex: 1;height: 0"
          @rendered="onRendered"
          @error="onError"
      />
    </template>

  </PreviewWrapper>

</template>

<style scoped>
.operate-area {
  display: flex;
  margin: 10px;
  align-items: center;
}

</style>