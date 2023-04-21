const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '../');
function loadModule(name) {
    try {
        return require(name);
    } catch (e) {
        return undefined;
    }
}

function copy(name, version) {
    const src = path.join(dir, `v${version}`, name);
    const dest = path.join(dir, name);
    if(!fs.existsSync(src)){
        return;
    }
    let content = fs.readFileSync(src, 'utf-8');
    try {
        fs.unlinkSync(dest);
    } catch (error) {}
    fs.writeFileSync(dest, content, 'utf-8');
}

function switchVersion(version) {
    copy('index.js', version);
    copy('index.css', version);
}

module.exports.loadModule = loadModule;
module.exports.switchVersion = switchVersion;