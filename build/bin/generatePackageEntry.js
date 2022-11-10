const fs = require('fs');
const path = require('path');

const docxPath = path.resolve(__dirname, '../../lib/docx');

fs.copyFileSync(path.resolve(docxPath, 'vue-office-docx.common.js'), path.resolve(docxPath, 'index.js'));