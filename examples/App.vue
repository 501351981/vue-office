<template>
  <div id="app">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="docx文件预览" name="DOCX">
        <docx-demo />
      </el-tab-pane>
      <el-tab-pane label="excel文件预览" name="EXCEL">
        <excel-demo />
      </el-tab-pane>
      <el-tab-pane label="pdf文件预览" name="PDF">
        <pdf-demo />
      </el-tab-pane>
    </el-tabs>
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
      activeName: 'DOCX'
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
