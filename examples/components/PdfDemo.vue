<template>
  <div class="pdf-demo">
    <vue-office-pdf  :src="src"/>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "PdfDemo",
  data(){
    return {
      src:'http://static.shanhuxueyuan.com/test.pdf'
    }
  }
}
</script>

<style scoped>

</style>