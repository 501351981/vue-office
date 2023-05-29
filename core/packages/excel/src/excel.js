import * as Excel from 'exceljs/dist/exceljs';
import {getUrl} from '../../../utils/url';
import tinycolor from 'tinycolor2';
import _, {cloneDeep} from 'lodash';
import {getDarkColor, getLightColor} from './color';
import dayjs from 'dayjs';

const themeColor = [
    '#FFFFFF',
    '#000000',
    '#BFBFBF',
    '#323232',
    '#4472C4',
    '#ED7D31',
    '#A5A5A5',
    '#FFC000',
    '#5B9BD5',
    '#71AD47'
];

let defaultColWidth = 80;
export function getData(src, options={}) {
    return requestExcel(getUrl(src), options);
}

function requestExcel(src, options) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(options.method || 'GET', src, true);
        xhr.responseType = options.responseType || 'arraybuffer';
        xhr.onload = function() {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.status);
          }
        };
        xhr.onerror = function() {
          reject(xhr.status);
        };
        xhr.withCredentials = options.withCredentials || false;
        if(options.headers) {
            Object.keys(options.headers).forEach(function(key) {
                xhr.setRequestHeader(key, options.headers[key]);
            });
        }

        xhr.send(options.body);
    });
}

export function readExcelData(buffer){
    try {
        const wb = new Excel.Workbook();
        return wb.xlsx.load(buffer);

    }catch (e){
        console.warn(e);
        return Promise.reject(e);
    }
}

function transferColumns(excelSheet, spreadSheet, options){
    for(let i = 0;i < (excelSheet.columns || []).length; i++){
        spreadSheet.cols[i.toString()] = {};
        if(excelSheet.columns[i].width) {
            spreadSheet.cols[i.toString()].width = excelSheet.columns[i].width * 6;
        } else {
            spreadSheet.cols[i.toString()].width = defaultColWidth;
        }
    }

    spreadSheet.cols.len = Math.max(Object.keys(spreadSheet.cols).length, options.minColLength || 0);
}

function getCellText(cell){
    //console.log(cell);
    const {numFmt, value, type} = cell;
    switch (type){
        case 2: //数字
            return value + '';
        case 3: //字符串
            return value;
        case 4: //日期
            switch (numFmt){
                case 'yyyy-mm-dd;@':
                    return dayjs(value).format('YYYY-MM-DD');
                case 'mm-dd-yy':
                    return dayjs(value).format('YYYY/MM/DD');
                case '[$-F800]dddd, mmmm dd, yyyy':
                    return dayjs(value).format('YYYY年M月D日 ddd');
                case 'm"月"d"日";@':
                    return dayjs(value).format('M月D日');
                case 'yyyy/m/d h:mm;@':
                case 'm/d/yy "h":mm':
                    return dayjs(value).subtract(8, 'hour').format('YYYY/M/DD HH:mm');
                case 'h:mm;@':
                    return dayjs(value).format('HH:mm');
                default:
                    return dayjs(value).format('YYYY-MM-DD');
            }

        case 6: //公式
            return cell.result;
        case 8: //富文本
            return cell.text;
        default:
            return value;
    }
}
function transferArgbColor(originColor){
    if(typeof originColor === 'object'){
        return '#000000';
    }
    if(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(originColor)){
        return originColor.startsWith('#') ? originColor : '#' + originColor;
    }
    originColor = originColor.trim().toLowerCase(); //去掉前后空格
    let color = {};
    try {
        let argb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(originColor);
        color.r = parseInt(argb[2], 16);
        color.g = parseInt(argb[3], 16);
        color.b = parseInt(argb[4], 16);
        color.a = parseInt(argb[1], 16) / 255;
        return tinycolor(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`).toHexString();
    } catch (e) {
        console.warn(e);
    }
}
function transferThemeColor(themeIndex, tint){

    if(themeIndex > 9){
        return '#C7C9CC';
    }
    if(typeof tint === 'undefined'){
        return themeColor[themeIndex];
    }else if(tint > 0){
        return getLightColor(themeColor[themeIndex], tint);
    }else{
        return getDarkColor(themeColor[themeIndex],Math.abs(tint));
    }
}
function getStyle(cell){
    cell.style = cloneDeep(cell.style);
    let backGroundColor = null;
    if(cell.style.fill && cell.style.fill.fgColor) {
        // 8位字符颜色先转rgb再转16进制颜色
        if(cell.style.fill.fgColor.argb){
            backGroundColor = transferArgbColor(cell.style.fill.fgColor.argb);
        }else if(cell.style.fill.fgColor.hasOwnProperty('theme')){
            backGroundColor = transferThemeColor(cell.style.fill.fgColor.theme, cell.style.fill.fgColor.tint);
        }else{
            backGroundColor = '#C7C9CC';
        }

    }

    if(backGroundColor) {
        cell.style.bgcolor = backGroundColor;
    }
    //*************************************************************************** */

    //*********************字体存在背景色******************************
    // 字体颜色
    let fontColor = null;
    if(cell.style.font && cell.style.font.color ) {
        if(cell.style.font.color.argb){
            fontColor = transferArgbColor(cell.style.font.color.argb);
        }else if(cell.style.font.color.hasOwnProperty('theme')){
            fontColor = transferThemeColor(cell.style.font.color.theme, cell.style.font.color.tint);
        }else{
            fontColor = '#000000';
        }

    }
    if(fontColor) {
        cell.style.color = fontColor;
    }

    // exceljs 对齐的格式转成 x-date-spreedsheet 能识别的对齐格式
    if(cell.style.alignment ) {
        if(cell.style.alignment.horizontal){
            cell.style.align = cell.style.alignment.horizontal;
        }
       if(cell.style.alignment.vertical){
           cell.style.valign = cell.style.alignment.vertical;
       }
    }
    if(cell.style.alignment && cell.style.alignment.wrapText) {
        cell.style.textwrap = true;
    }

    if(cell.style.border){
        let styleBorder = {};
        Object.keys(cell.style.border).forEach(position =>{
            let originBorder = cell.style.border[position];
            let bordColor = '#000000';

            if(typeof originBorder.color === 'string'){
                bordColor = originBorder.color;
            }else if(originBorder.color){
                if(originBorder.color.argb){
                    bordColor = transferArgbColor(originBorder.color.argb);
                }else if(originBorder.color.hasOwnProperty('theme')){
                    bordColor = transferThemeColor(originBorder.color.theme, originBorder.color.tint);
                }
            }
            styleBorder[position] = [originBorder.style || 'thin', bordColor];
        });
        cell.style.border2 = {...cell.style.border};
        cell.style.border = styleBorder;
    }

    return cell.style;
}

export function transferExcelToSpreadSheet(workbook, options){
    let workbookData = [];
    //console.log(workbook, 'workbook')
    workbook.eachSheet((sheet) => {
        //console.log(sheet,'sheet');
        // 构造x-data-spreadsheet 的 sheet 数据源结构
        let sheetData = { name: sheet.name,styles : [], rows: {},cols:{}, merges:[],media:[] };
        // 收集合并单元格信息
        let mergeAddressData = [];
        for(let mergeRange in sheet._merges) {
            sheetData.merges.push(sheet._merges[mergeRange].shortRange);
            let mergeAddress = {};
            // 合并单元格起始地址
            mergeAddress.startAddress = sheet._merges[mergeRange].tl;
            // 合并单元格终止地址
            mergeAddress.endAddress = sheet._merges[mergeRange].br;
            // Y轴方向跨度
            mergeAddress.YRange = sheet._merges[mergeRange].model.bottom - sheet._merges[mergeRange].model.top;
            // X轴方向跨度
            mergeAddress.XRange = sheet._merges[mergeRange].model.right - sheet._merges[mergeRange].model.left;
            mergeAddressData.push(mergeAddress);
        }

        transferColumns(sheet,sheetData, options);
        // 遍历行
        (sheet._rows || []).forEach((row,spreadSheetRowIndex) =>{
            sheetData.rows[spreadSheetRowIndex] = { cells: {} };

            if(row.height){
                sheetData.rows[spreadSheetRowIndex].height = row.height;
            }
            //includeEmpty = false 不包含空白单元格
            (row._cells || []).forEach((cell, spreadSheetColIndex) =>{
                sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex] = {};

                let mergeAddress = _.find(mergeAddressData, function(o) { return o.startAddress == cell._address; });
                if(mergeAddress && cell.master.address != mergeAddress.startAddress) {
                    return;
                }
                if(mergeAddress){
                    sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex].merge = [mergeAddress.YRange, mergeAddress.XRange];
                }
                sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex].text = getCellText(cell);
                sheetData.styles.push(getStyle(cell));
                sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex].style = sheetData.styles.length - 1;
            });
        });
        if(sheetData._media){
            sheetData.media = sheetData._media;
        }
        sheetData.rows.len = Math.max(Object.keys(sheetData.rows).length, 100);
        workbookData.push(sheetData);
    });
    //console.log(workbookData, 'workbookData')
    return {
        workbookData,
        workbookSource: workbook,
        medias: workbook.media || []
    };
}