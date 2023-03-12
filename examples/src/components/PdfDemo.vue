<script setup>
import VueOfficePdf from '../../../packages/pdf/index';
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
      accept=".pdf"
      placeholder="请输入pdf文件地址"
      default-src="https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pdf"
  >
    <template  v-slot="slotProps">
      <VueOfficePdf
          :src="slotProps.src"
          style="flex: 1;height: 0"
          @rendered="onRendered"
          @error="onError"
      />
    </template>
  </PreviewWrapper>
</template>

<style scoped>

</style>