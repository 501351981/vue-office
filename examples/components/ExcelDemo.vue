<template>
<vue-office-excel :src="src"/>
</template>

<script>
/* eslint-disable */
export default {
  name: "ExcelDemo",
  data(){
    return{
      src: 'http://static.shanhuxueyuan.com/demo/excel.xlsx'
    }
  }
};
</script>

<style scoped>

</style>