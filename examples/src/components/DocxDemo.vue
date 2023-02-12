<script setup>
import VueOfficeDocx from '../../../packages/docx/index'
import PreviewWrapper from '../common/PreviewWrapper.vue'
</script>

<template>
  <PreviewWrapper
      accept=".docx"
      placeholder="请输入docx文件地址"
      default-src="https://501351981.github.io/vue-office/examples/dist/static/test-files/test.docx"
  >
    <template  v-slot="slotProps">
      <VueOfficeDocx :src="slotProps.src"/>
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