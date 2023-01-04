<template>
  <div>
    <div class="operate-area">
      <div  style="width: 300px;">
        <el-radio-group v-model="type" size="small">
          <el-radio-button label="url" >远程文件地址</el-radio-button>
          <el-radio-button label="upload">上传本地文件</el-radio-button>
        </el-radio-group>
      </div>

      <el-input v-if="type==='url'" placeholder="请输入excel文件地址" v-model="inputSrc"/>
      <el-button v-if="type==='url'" type="primary" style="margin-left: 10px" @click="src=inputSrc">预览</el-button>
      <el-upload v-if="type!=='url'" :limit="1" :file-list="fileList" accept=".xlsx" :beforeUpload="beforeUpload" action="">
        <el-button size="small" type="warning">点击上传</el-button>
      </el-upload>
    </div>
    <vue-office-excel :src="src" />
  </div>
</template>

<script>
/* eslint-disable */
import VueOfficeExcel from '../../packages/excel/index'
import  '../../packages/excel/src/index.css'
export default {
  name: "ExcelDemo",
  components:{VueOfficeExcel},
  data(){
    return{
      type: 'url',
      inputSrc: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.xlsx',
      src: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.xlsx',
      fileList:[]
    }
  },
  methods:{
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
};
</script>


<style lang="less" scoped>
.operate-area{
  display: flex;
  margin: 10px;
  align-items: center;
}
</style>