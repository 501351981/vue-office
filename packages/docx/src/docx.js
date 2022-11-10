const mammoth = require('./lib/mammoth.browser')

function getHtmlFromDocx(src) {
    // eslint-disable-next-line
    return new Promise((async (resolve, reject) => {
        try{
            let arrayBuffer
            if (typeof src === 'string') {
                arrayBuffer = await fetchDocx(src)
            }else if (src instanceof ArrayBuffer){
                arrayBuffer = src
            }
            mammoth.convertToHtml({arrayBuffer})
                .then(function (result) {
                    resolve(result.value)
                });
        }catch(e){
            reject(e)
        }
    }))
}

function fetchDocx(src) {
    return fetch(src).then(res => {
        return res.arrayBuffer()
    })
}

export default {
    getHtmlFromDocx
}