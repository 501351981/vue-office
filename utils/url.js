export function getUrl(src){
    if(typeof src === 'string'){
        return src
    }else if(src instanceof Blob){
        return URL.createObjectURL(src)
    }else if(src instanceof ArrayBuffer){
        return URL.createObjectURL(new Blob([src]))
    }else if(src instanceof Response){
        return URL.createObjectURL(src.blob())
    }else{
        return  src
    }
}