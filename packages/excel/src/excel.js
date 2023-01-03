export function getData(src, options={}) {
    if (typeof src === 'string') {
        return fetchExcel(src, options)
    }
    return Promise.resolve(src)
}

function fetchExcel(src, options) {
    return fetch(src, options).then(res=>{
        return res.arrayBuffer()
    })
}
