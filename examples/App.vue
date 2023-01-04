<template>
  <div id="app">
<!--    <excel-demo />-->
    <pdf-demo />
    <docx-demo />
  </div>
</template>

<script>
/* eslint-disable */
import DocxDemo from "./components/DocxDemo";
import PdfDemo from "./components/PdfDemo";
import ExcelDemo from "./components/ExcelDemo";
export default {
  name: 'App',
  components: {
    DocxDemo,
    PdfDemo,
    ExcelDemo
  },
  data(){
    return {
    }
  },
  methods:{

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
