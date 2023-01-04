<template>
  <div class="vue-office-excel" ref="vue-office-excel"></div>
</template>

<script>
import Spreadsheet from "x-data-spreadsheet";
import _ from "lodash";
import * as Excel from 'exceljs/dist/exceljs'
import tinycolor from "tinycolor2";
import {getData} from './excel'
export default {
  name: "VueOfficeExcel",
  props: {
    src: [String, ArrayBuffer, Blob],
    requestOptions: {
      type: Object,
      default: () => ({})
    }
  },
  watch:{
    src(newSrc){
      if(newSrc){
        getData(newSrc).then(this.renderExcel).catch(e =>{
          this.xs.loadData({})
          this.$emit('error', e)
        })
      }else{
        this.xs.loadData({})
      }
    }
  },
  mounted() {
    this.xs = new Spreadsheet(this.$refs["vue-office-excel"],{
      mode: 'read',
      showToolbar: false
    }).loadData({});
    if(this.src){
      getData(this.src).then(this.renderExcel).catch(e =>{
        this.xs.loadData({})
        this.$emit('error', e)
      })
    }
  },
  methods:{
    renderExcel(buffer) {
      try {
        const wb = new Excel.Workbook();
        // 微软的 Excel ColorIndex 一个索引数字对应一个颜色
        wb.xlsx.load(buffer).then(workbook => {
          let workbookData = []
          workbook.eachSheet((sheet) => {
            // 构造x-data-spreadsheet 的 sheet 数据源结构
            let sheetData = { name: sheet.name,styles : [], rows: {}, merges:[] }
            // 收集合并单元格信息
            let mergeAddressData = []
            for(let mergeRange in sheet._merges) {
              sheetData.merges.push(sheet._merges[mergeRange].shortRange)
              let mergeAddress = {}
              // 合并单元格起始地址
              mergeAddress.startAddress = sheet._merges[mergeRange].tl
              // 合并单元格终止地址
              mergeAddress.endAddress = sheet._merges[mergeRange].br
              // Y轴方向跨度
              mergeAddress.YRange = sheet._merges[mergeRange].model.bottom - sheet._merges[mergeRange].model.top
              // X轴方向跨度
              mergeAddress.XRange = sheet._merges[mergeRange].model.right - sheet._merges[mergeRange].model.left
              mergeAddressData.push(mergeAddress)
            }
            sheetData.cols = {}
            for(let i = 0;i < sheet.columns.length; i++)
            {
              sheetData.cols[i.toString()] = {}
              if(sheet.columns[i].width) {
                // 不知道为什么从 exceljs 读取的宽度显示到 x-data-spreadsheet 特别小, 这里乘以8
                sheetData.cols[i.toString()].width = sheet.columns[i].width * 8
              } else {
                // 默认列宽
                sheetData.cols[i.toString()].width = 100
              }
            }

            // 遍历行
            sheet.eachRow((row, rowIndex) => {
              sheetData.rows[(rowIndex - 1).toString()] = { cells: {} }
              //includeEmpty = false 不包含空白单元格
              row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
                let cellText = ''
                if(cell.value && cell.value.result) {
                  // Excel 单元格有公式
                  cellText = cell.value.result
                } else if(cell.value && cell.value.richText) {
                  // Excel 单元格是多行文本
                  for(let text in cell.value.richText) {
                    // 多行文本做累加
                    cellText += cell.value.richText[text].text
                  }
                }
                else {
                  // Excel 单元格无公式
                  cellText = cell.value
                }

                //解析单元格,包含样式
                //*********************单元格存在背景色******************************
                // 单元格存在背景色
                let backGroundColor = null
                if(cell.style.fill && cell.style.fill.fgColor && cell.style.fill.fgColor.argb) {
                  // 8位字符颜色先转rgb再转16进制颜色
                  backGroundColor = ((val) => {
                    val = val.trim().toLowerCase();  //去掉前后空格
                    let color = {};
                    try {
                      let argb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
                      color.r = parseInt(argb[2], 16);
                      color.g = parseInt(argb[3], 16);
                      color.b = parseInt(argb[4], 16);
                      color.a = parseInt(argb[1], 16) / 255;
                      return tinycolor(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`).toHexString()
                    } catch (e) {
                      //
                    }
                  })(cell.style.fill.fgColor.argb)
                }

                if(backGroundColor) {
                  cell.style.bgcolor = backGroundColor
                }
                //*************************************************************************** */

                //*********************字体存在背景色******************************
                // 字体颜色
                let fontColor = null
                if(cell.style.font && cell.style.font.color && cell.style.font.color.argb) {
                  // 8位字符颜色先转rgb再转16进制颜色
                  fontColor = ((val) => {
                    val = val.trim().toLowerCase();  //去掉前后空格
                    let color = {};
                    try {
                      let argb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val)
                      color.r = parseInt(argb[2], 16);
                      color.g = parseInt(argb[3], 16);
                      color.b = parseInt(argb[4], 16);
                      color.a = parseInt(argb[1], 16) / 255;
                      return tinycolor(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`).toHexString()
                    } catch (e) {
                      //
                    }
                  })(cell.style.font.color.argb)
                }
                if(fontColor) {
                  cell.style.color = fontColor
                }

                // exceljs 对齐的格式转成 x-date-spreedsheet 能识别的对齐格式
                if(cell.style.alignment && cell.style.alignment.horizontal) {
                  cell.style.align = cell.style.alignment.horizontal
                  cell.style.valign = cell.style.alignment.vertical
                }

                //处理合并单元格
                let mergeAddress = _.find(mergeAddressData, function(o) { return o.startAddress == cell._address })
                if(mergeAddress)
                {
                  // 遍历的单元格属于合并单元格
                  if(cell.master.address != mergeAddress.startAddress){
                    // 不是合并单元格中的第一个单元格不需要计入数据源
                    return
                  }
                  // 说明是合并单元格区域的起始单元格
                  sheetData.rows[(rowIndex - 1).toString()].cells[(colNumber - 1).toString()] = { text: cellText, style: 0, merge: [mergeAddress.YRange, mergeAddress.XRange] }
                  sheetData.styles.push(cell.style)
                  //对应的style存放序号
                  sheetData.rows[(rowIndex - 1).toString()].cells[(colNumber - 1).toString()].style = sheetData.styles.length - 1
                }
                else {
                  // 非合并单元格
                  sheetData.rows[(rowIndex - 1).toString()].cells[(colNumber - 1).toString()] = { text: cellText, style: 0 }
                  //解析单元格,包含样式
                  sheetData.styles.push(cell.style)
                  //对应的style存放序号
                  sheetData.rows[(rowIndex - 1).toString()].cells[(colNumber - 1).toString()].style = sheetData.styles.length - 1
                }
              });
            })
            workbookData.push(sheetData)
          })
          this.xs.loadData(workbookData);
          this.$emit('rendered')
        })
      }catch (e){
        this.xs.loadData({})
        this.$emit('error', e)
      }
    }
  }
};
</script>

<style scoped lang="less">
</style>