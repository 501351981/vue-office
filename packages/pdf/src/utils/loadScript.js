export default function (src){
    return new Promise(((resolve, reject) => {
        let script = document.createElement('script')
        script.src = src
        script.onload = function (){
            resolve()
        }
        script.onerror = function (){
            reject()
        }
        document.body.append(script)
    }))
}