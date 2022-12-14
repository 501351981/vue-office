const fs = require('fs');
const path = require('path');
const libPath = path.resolve(__dirname, '../../lib');
const docxPath = path.resolve(libPath, 'docx');
const pdfPath = path.resolve(libPath, 'pdf');
const excelPath = path.resolve(libPath, 'excel');

fs.copyFileSync(path.resolve(libPath, 'vue-office.umd.min.js'), path.resolve(libPath, 'index.js'));
fs.copyFileSync(path.resolve(docxPath, 'vue-office-docx.umd.min.js'), path.resolve(docxPath, 'index.js'));
fs.copyFileSync(path.resolve(pdfPath, 'vue-office-pdf.umd.js'), path.resolve(pdfPath, 'index.js'));
fs.copyFileSync(path.resolve(excelPath, 'vue-office-excel.umd.min.js'), path.resolve(excelPath, 'index.js'));
fs.copyFileSync(path.resolve(excelPath, 'vue-office-excel.css'), path.resolve(excelPath, 'index.css'));