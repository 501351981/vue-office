const fs = require('fs');
const path = require('path');
const libPath = path.resolve(__dirname, '../../lib');
const docxPath = path.resolve(libPath, 'docx');

fs.copyFileSync(path.resolve(libPath, 'vue-office.umd.min.js'), path.resolve(libPath, 'index.js'));
fs.copyFileSync(path.resolve(docxPath, 'vue-office-docx.umd.min.js'), path.resolve(docxPath, 'index.js'));