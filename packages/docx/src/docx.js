const docxPreview = require('docx-preview')
function getData(src, options={}) {
    if (typeof src === 'string') {
         return fetchDocx(src, options)
    }
    return Promise.resolve(src)
}

function fetchDocx(src, options) {
    return fetch(src, options)
}

function render(data, container){
    if(!data){
        container.innerHtml = ''
        return Promise.resolve()
    }
    let blob
    if(data instanceof Blob){
        blob = data
    }else if(data instanceof Response) {
        blob = data.blob()
    } else if(data instanceof ArrayBuffer){
        blob = new Blob([data])
    }
    return docxPreview.renderAsync(blob, container);
}

export default {
    getData,
    render
}