<template>
  <div class="pdf-demo">
    <div class="operate-area">
      <div  style="width: 300px;">
        <el-radio-group v-model="type" size="small">
          <el-radio-button label="url" >远程文件地址</el-radio-button>
          <el-radio-button label="upload">上传本地文件</el-radio-button>
        </el-radio-group>
      </div>

      <el-input v-if="type==='url'" placeholder="请输入excel文件地址" v-model="inputSrc"/>
      <el-button v-if="type==='url'" type="primary" style="margin-left: 10px" @click="src=inputSrc">预览</el-button>
      <el-upload v-if="type!=='url'" :limit="1" :file-list="fileList" accept=".pdf" :beforeUpload="beforeUpload" action="">
        <el-button size="small" type="warning">点击上传</el-button>
      </el-upload>
    </div>
    <vue-office-pdf  :src="src" @rendered="rendered"/>
  </div>
</template>

<script>
/* eslint-disable */
import VueOfficePdf from '../../packages/pdf/index'
export default {
  name: "PdfDemo",
  components:{VueOfficePdf},
  data(){
    return {
      type: 'url',
      inputSrc: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pdf',
      // src:'http://static.shanhuxueyuan.com/test.pdf'
      src:'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pdf',
      fileList:[]
    }
  },
  methods:{
    rendered(){
      console.log("加载完成")
    },
    beforeUpload(file){
      let reader = new FileReader();
      reader.onload = (loadEvent) => {
        let arrayBuffer = loadEvent.target.result;
        this.src = arrayBuffer
      };
      reader.readAsArrayBuffer(file);
      return false
    }
  }
}
</script>

<style lang="less" scoped>
.operate-area{
  display: flex;
  margin: 10px;
  align-items: center;
}
</style>