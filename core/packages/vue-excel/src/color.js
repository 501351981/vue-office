function HexToRgb (str) {
    str = str.replace('#', '');
    var hxs = str.match(/../g);
    for (var i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
    return hxs;
}

function RgbToHex (a, b, c) {
    var hexs = [a.toString(16), b.toString(16), c.toString(16)];
    for (var i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = '0' + hexs[i];
    return '#' + hexs.join('');
}


export function getDarkColor(color, level) {
    var rgbc = HexToRgb(color);
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
    return RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
}
export function getLightColor(color, level) {
    var rgbc = HexToRgb(color);
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]);
    return RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
}