<script setup>
import VueOfficePdf from '../../../packages/pdf/index'
import PreviewWrapper from '../common/PreviewWrapper.vue'
</script>

<template>
  <PreviewWrapper
      accept=".pdf"
      placeholder="请输入pdf文件地址"
      default-src="https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pdf"
  >
    <template  v-slot="slotProps">
      <VueOfficePdf :src="slotProps.src" style="flex: 1;height: 0"/>
    </template>
  </PreviewWrapper>
</template>

<style scoped>

</style>