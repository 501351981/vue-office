let hexIn = false;
function utf16to8(str) {
    var out, i, len, c;
    var charCode;
    out = hexIn ? [] : '';
    len = str.length;
    for(i = 0; i < len; i++) {
        c = hexIn ? str[i] : str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            hexIn ? out.push(str[i]) : out += str.charAt(i);
        } else if (c > 0x07FF) {
            charCode = (0xE0 | ((c >> 12) & 0x0F)); hexIn ? out.push(charCode) : out += String.fromCharCode(charCode);
            charCode = (0x80 | ((c >> 6) & 0x3F)); hexIn ? out.push(charCode) : out += String.fromCharCode(charCode);
            charCode = (0x80 | ((c >> 0) & 0x3F)); hexIn ? out.push(charCode) : out += String.fromCharCode(charCode);
        } else {
            charCode = (0xC0 | ((c >> 6) & 0x1F)); hexIn ? out.push(charCode) : out += String.fromCharCode(charCode);
            charCode = (0x80 | ((c >> 0) & 0x3F)); hexIn ? out.push(charCode) : out += String.fromCharCode(charCode);
        }
    }
    return out;
}
var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    var charCode;

    len = str.length;
    i = 0;
    out = '';
    while(i < len) {
        c1 = (hexIn ? str[i++] : str.charCodeAt(i++)) & 0xff;
        if(i == len)
        {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += '==';
            break;
        }
        c2 = (hexIn ? str[i++] : str.charCodeAt(i++));
        if(i == len)
        {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += '=';
            break;
        }
        c3 = (hexIn ? str[i++] : str.charCodeAt(i++));
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
export function base64_encode(src) {
    return base64encode(utf16to8(src));
}