<template>
  <div style="width: 500px;overflow: hidden;position: relative">
    <vue-office-excel :src="src" />
  </div>
</template>

<script>
/* eslint-disable */
import VueOfficeExcel from '../../packages/excel'
import  '../../packages/excel/lib/index.css'
export default {
  name: "ExcelDemo",
  components:{VueOfficeExcel},
  data(){
    return{
      src: 'http://static.shanhuxueyuan.com/demo/excel.xlsx'
    }
  }
};
</script>

<style scoped>

</style>