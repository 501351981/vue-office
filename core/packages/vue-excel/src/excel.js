import * as Excel from 'exceljs/dist/exceljs';
import {getUrl} from '../../../utils/url';
import tinycolor from 'tinycolor2';
import {cloneDeep, get, find} from 'lodash';
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

const indexedColor = [
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#800000',
    '#008000',
    '#000080',
    '#808000',
    '#800080',
    '#008080',
    '#C0C0C0',
    '#808080',
    '#9999FF',
    '#993366',
    '#FFFFCC',
    '#CCFFFF',
    '#660066',
    '#FF8080',
    '#0066CC',
    '#CCCCFF',
    '#000080',
    '#FF00FF',
    '#FFFF00',
    '#00FFFF',
    '#800080',
    '#800000',
    '#008080',
    '#0000FF',
    '#00CCFF',
    '#CCFFFF',
    '#CCFFCC',
    '#FFFF99',
    '#99CCFF',
    '#FF99CC',
    '#CC99FF',
    '#FFCC99',
    '#3366FF',
    '#33CCCC',
    '#99CC00',
    '#FFCC00',
    '#FF9900',
    '#FF6600',
    '#666699',
    '#969696',
    '#003366',
    '#339966',
    '#003300',
    '#333300',
    '#993300',
    '#993366',
    '#333399',
    '#333333',
    '#FFFFFF'
];

let defaultColWidth = 80;
let defaultRowHeight = 24;
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
            spreadSheet.cols[i.toString()].width = excelSheet.columns[i].width * 6 + (options.widthOffset || 0);
        } else {
            spreadSheet.cols[i.toString()].width = defaultColWidth + (options.widthOffset || 0);
        }
    }

    spreadSheet.cols.len = Math.max(Object.keys(spreadSheet.cols).length, options.minColLength || 0);
}

function getCellText(cell){
    //console.log(cell);
    let {numFmt, value, type} = cell;
    switch (type){
        case 2: //数字
            try {
                //numFmt:
                // "0.00%"
                // "0.00_);(0.00)"
                // "#,##0.000_);(#,##0.000)"   千分位
                // "#,##0.000;[Red]#,##0.000"
                if(cell.style.numFmt){
                    if(cell.style.numFmt.endsWith('%')){
                        let precision = cell.style.numFmt.match(/\.(\d+)%/);
                        if(precision){
                            return (value * 100).toFixed(precision[1].length) + '%';
                        }else {
                            return value * 100 + '%';
                        }
                    }else if(/0(\.0+)?/.test(cell.style.numFmt)){
                        if(value === 0 && cell.style.numFmt.startsWith('_')){
                            return '-';
                        }
                        let precision = cell.style.numFmt.match(/0\.(0+)(_|;|$)/);
                        if(precision){
                            precision = precision[1].length;
                        }else{
                            precision = 0;
                        }

                        let result = value.toFixed(precision) + '';
                        if(cell.style.numFmt.includes('#,##')){
                            //千分位
                            result = result.split('.');
                            let number = result[0].split('').reverse();
                            let newNumber = [];
                            for(let i = 0; i< number.length; i++){
                                newNumber.push(number[i]);
                                if((i+1) % 3 === 0 && i < number.length - 1 && number[i+1] !== '-'){
                                    newNumber.push(',');
                                }

                            }
                            result[0] = newNumber.reverse().join('');
                            result = result.join('.');
                        }
                        return result;
                    }

                }
                return value + '';
            }catch (e){
                return value;
            }
            
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

        case 5: //超链接
            return value.text;
        case 6: //公式
            return get(value, 'result.error') || value.result;
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
        }else if(cell.style.fill.fgColor.indexed){
            backGroundColor = indexedColor[cell.style.fill.fgColor.indexed] || '#C7C9CC';
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
        }else if(cell.style.font.color.indexed){
            fontColor = indexedColor[cell.style.font.color.indexed] || '#000000';
        }else {
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
                }else if(originBorder.color.indexed){
                    bordColor = indexedColor[originBorder.color.indexed];
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
    // console.log(workbook, 'workbook');
    let sheets = [];
    workbook.eachSheet((sheet) => {
        sheets.push(sheet);
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
                sheetData.rows[spreadSheetRowIndex].height = row.height + (options.heightOffset || 0);
            }else{
                sheetData.rows[spreadSheetRowIndex].height = defaultRowHeight + (options.heightOffset || 0);
            }
            //includeEmpty = false 不包含空白单元格
            (row._cells || []).forEach((cell, spreadSheetColIndex) =>{
                sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex] = {};

                let mergeAddress = find(mergeAddressData, function(o) { return o.startAddress == cell._address; });
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

        let tempRowsKeys = Object.keys(sheetData.rows);
        sheetData.rows.len = Math.max(tempRowsKeys[tempRowsKeys.length-1] + 1, 100);
        workbookData.push(sheetData);
    });
    // console.log(workbookData, 'workbookData');
    workbook._worksheets = sheets;
    return {
        workbookData,
        workbookSource: workbook,
        medias: workbook.media || []
    };
}