const fs = require('fs');
const path = require('path');
const spawnSync = require('child_process').spawnSync;
const type = process.argv[2];

const vuePath = path.resolve(__dirname, '../node_modules/vue');
const vueBakPath = path.resolve(__dirname, '../node_modules/vue-bak');
if(type === 'bak'){
    if (!fs.existsSync(vueBakPath) && fs.existsSync(vuePath)) {
        spawnSync('mv',[vuePath, vueBakPath]);
    }
}else{
    if (!fs.existsSync(vuePath) && fs.existsSync(vueBakPath)) {
        spawnSync('mv',[vueBakPath, vuePath]);
    }
}