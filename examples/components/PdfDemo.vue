<template>
  <div class="pdf-demo">
    <vue-office-pdf  :src="src" @rendered="rendered"/>
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
  },
  methods:{
    rendered(){
      console.log("加载完成")
    }
  }
}
</script>

<style scoped>

</style>