import * as Excel from 'exceljs/dist/exceljs'
import {getUrl} from "../../../utils/url";
import tinycolor from "tinycolor2";
import _ from "lodash";

export function getData(src, options={}) {
    return fetchExcel(getUrl(src), options)
}

function fetchExcel(src, options) {
    return fetch(src, options).then(res=>{
        if(res.status !== 200){
            return Promise.reject(res)
        }
        return res.arrayBuffer()
    })
}


export function readExcelData(buffer){
    try {
        const wb = new Excel.Workbook();
        return wb.xlsx.load(buffer)

    }catch (e){
        return Promise.reject(e)
    }
}

function transferColumns(excelSheet, spreadSheet, options){
    for(let i = 0;i < (excelSheet.columns || []).length; i++){
        spreadSheet.cols[i.toString()] = {}
        if(excelSheet.columns[i].width) {
            spreadSheet.cols[i.toString()].width = excelSheet.columns[i].width * 9
        } else {
            spreadSheet.cols[i.toString()].width = 100
        }
    }

    spreadSheet.cols.len = Math.max(Object.keys(spreadSheet.cols).length, options.minColLength || 0)
}

function getCellText(cell){
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
    return cellText
}
function transferArgbColor(originColor){
    if(typeof originColor === 'object'){
        debugger
        return '#000000';
    }
    originColor = originColor.trim().toLowerCase();  //去掉前后空格
    let color = {};
    try {
        let argb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(originColor);
        color.r = parseInt(argb[2], 16);
        color.g = parseInt(argb[3], 16);
        color.b = parseInt(argb[4], 16);
        color.a = parseInt(argb[1], 16) / 255;
        return tinycolor(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`).toHexString()
    } catch (e) {
        debugger
    }
}
function getStyle(cell){
    let backGroundColor = null
    if(cell.style.fill && cell.style.fill.fgColor) {
        // 8位字符颜色先转rgb再转16进制颜色
        if(cell.style.fill.fgColor.argb){
            backGroundColor = transferArgbColor(cell.style.fill.fgColor.argb)
        }else{
            backGroundColor = '#C7C9CC'
        }

    }

    if(backGroundColor) {
        cell.style.bgcolor = backGroundColor
    }
    //*************************************************************************** */

    //*********************字体存在背景色******************************
    // 字体颜色
    let fontColor = null
    if(cell.style.font && cell.style.font.color ) {
        if(cell.style.font.color.argb){
            fontColor = transferArgbColor(cell.style.font.color.argb)
        }else{
            fontColor = '#000000'
        }

    }
    if(fontColor) {
        cell.style.color = fontColor
    }

    // exceljs 对齐的格式转成 x-date-spreedsheet 能识别的对齐格式
    if(cell.style.alignment ) {
        if(cell.style.alignment.horizontal){
            cell.style.align = cell.style.alignment.horizontal
        }
       if(cell.style.alignment.vertical){
           cell.style.valign = cell.style.alignment.vertical
       }
    }
    if(cell.style.alignment && cell.style.alignment.wrapText) {
        cell.style.textwrap = true
    }

    if(cell.style.border){
        Object.keys(cell.style.border).forEach(position =>{
            let originBorder = cell.style.border[position]
            cell.style.border[position] = [originBorder.style || 'thick', originBorder.color && originBorder.color.argb && transferArgbColor(originBorder.color.argb) || '#000000']
        })
    }

    return cell.style
}

export function transferExcelToSpreadSheet(workbook, options){
    let workbookData = []
    workbook.eachSheet((sheet) => {
        // console.log(sheet,'sheet')
        // 构造x-data-spreadsheet 的 sheet 数据源结构
        let sheetData = { name: sheet.name,styles : [], rows: {},cols:{}, merges:[] }
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

        transferColumns(sheet,sheetData, options);
        // 遍历行
        (sheet._rows || []).forEach((row,spreadSheetRowIndex) =>{
            sheetData.rows[spreadSheetRowIndex] = { cells: {} }

            if(row.height){
                sheetData.rows[spreadSheetRowIndex].height = row.height;
            }
            //includeEmpty = false 不包含空白单元格
            (row._cells || []).forEach((cell, spreadSheetColIndex) =>{
                sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex] = {}

                let mergeAddress = _.find(mergeAddressData, function(o) { return o.startAddress == cell._address })
                if(mergeAddress && cell.master.address != mergeAddress.startAddress) {
                    return
                }
                if(mergeAddress){
                    sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex].merge = [mergeAddress.YRange, mergeAddress.XRange]
                }
                sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex].text = getCellText(cell)
                sheetData.styles.push(getStyle(cell))
                sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex].style = sheetData.styles.length - 1
            })
        })
        workbookData.push(sheetData)
    })
    // console.log(workbookData, 'workbookData')
    return workbookData
}