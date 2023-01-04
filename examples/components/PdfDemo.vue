<template>
  <div class="pdf-demo">
    <vue-office-pdf  :src="src" @rendered="rendered"/>
  </div>
</template>

<script>
/* eslint-disable */
import VueOfficePdf from '../../packages/pdf'
export default {
  name: "PdfDemo",
  components:{VueOfficePdf},
  data(){
    return {
      // src:'http://static.shanhuxueyuan.com/test.pdf'
      src:'http://static.shanhuxueyuan.com/demo/qiniu.pdf'
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