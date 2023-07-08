export function getUrl(src){
    if(typeof src === 'string'){
        return src;
    }else if(src instanceof Blob){
        return URL.createObjectURL(src);
    }else if(src instanceof ArrayBuffer){
        return URL.createObjectURL(new Blob([src]));
    }else if(src instanceof Response){
        return URL.createObjectURL(src.blob());
    }else{
        return src;
    }
}

export function loadScript(src){
    return new Promise(((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;
        script.onload = function (){
            resolve();
        };
        script.onerror = function (){
            reject();
        };
        document.body.append(script);
    }));
}

export async function download(filename, data){
    if(!data){
        return; 
    }
   if (data instanceof ArrayBuffer) {
       data = new Blob([data]);
    }
    downloadFile(filename, URL.createObjectURL(data));
}

export function downloadFile(filename, href){
    let eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    eleLink.href = href;
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
}