<script>
import { defineComponent,ref, onMounted, watch } from 'vue-demi'
import Spreadsheet from "x-data-spreadsheet";
import {getData, readExcelData, transferExcelToSpreadSheet} from './excel'

export default defineComponent({
  name: 'VueOfficeExcel',
  props: {
    src: [String, ArrayBuffer, Blob],
    requestOptions: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({
        minColLength: 20
      })
    }
  },
  emits:['rendered', 'error'],
  setup(props, { emit }){
    const wrapperRef = ref(null)
    const rootRef = ref(null)
    let xs = null
    function renderExcel(buffer){
      readExcelData(buffer).then(workbook =>{
        if(!workbook._worksheets || workbook._worksheets.length === 0){
          throw new Error('未获取到数据，可能文件格式不正确或文件已损坏')
        }
        const {workbookData, medias} = transferExcelToSpreadSheet(workbook, props.options)
        xs.loadData(workbookData);
        emit('rendered')
      }).catch(e=>{
        console.warn(e)
        xs.loadData({})
        emit('error', e)
      })
    }
    onMounted(()=>{
      window.xs = xs = new Spreadsheet(rootRef.value,{
        mode: 'read',
        showToolbar: false,
        view: {
          height: () => wrapperRef.value.clientHeight || 300,
          width: () => wrapperRef.value.clientWidth || 300,
        },
      }).loadData({});
      if(props.src){
        getData(props.src, props.requestOptions).then(renderExcel).catch(e =>{
          xs.loadData({})
          emit('error', e)
        })
      }
    })

    watch(() => props.src, () =>{
      if(props.src){
        getData(props.src).then(renderExcel).catch(e =>{
          xs.loadData({})
          emit('error', e)
        })
      }else{
        xs.loadData({})
      }
    })
    return {
      wrapperRef,
      rootRef
    }
  }
})
</script>

<template>
  <div class="vue-office-excel" ref="wrapperRef">
    <div class="vue-office-excel-main" ref="rootRef"></div>
  </div>
</template>
<style lang="less">

</style>