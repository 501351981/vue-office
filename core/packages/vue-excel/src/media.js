let cache = [];
export function renderImage(ctx, medias, sheet, offset, options={}){
    // console.log('medias', medias);
    // console.log('sheet', sheet);
    // console.log('offset',  offset)
    if(sheet && sheet._media.length){
        sheet._media.forEach(media => {
            let {imageId, range, type} = media;
            if(type === 'image'){
                let position = calcPosition(sheet,range,offset, options);
                drawImage(ctx,imageId, medias[imageId], position);
            }
        });
    }

}
let clipWidth = 60; //左侧序号列宽
let clipHeight = 25; //顶部序号行高
let defaultColWidth = 80;
let defaultRowHeight = 24;
let devicePixelRatio = window.devicePixelRatio;

function calcPosition(sheet, range, offset, options){
    let {widthOffset, heightOffset} = options;
    let {tl, br, ext} = range;
    let {nativeCol=0, nativeColOff=0, nativeRow=0, nativeRowOff=0} = tl || {};

    let basicX = clipWidth;
    let basicY = clipHeight;
    for(let i=0; i < nativeCol; i++){
        basicX += sheet?._columns?.[i]?.width*6 || defaultColWidth;
        basicX += widthOffset || 0;
    }
    for(let i=0; i < nativeRow; i++){
        basicY += sheet?._rows?.[i]?.height || defaultRowHeight;
        basicY += heightOffset || 0;
    }
    let x = basicX + nativeColOff/12700;
    let y = basicY + nativeRowOff/12700;

    let {
        nativeCol: nativeColEnd=0,
        nativeColOff: nativeColOffEnd=0,
        nativeRow: nativeRowEnd=0,
        nativeRowOff: nativeRowOffEnd=0
    } = br||{};
    let width =0;
    if(nativeCol === nativeColEnd){
        width = (nativeColOffEnd - nativeColOff) / 12700;
    }else if(br) {
        width = (sheet?._columns?.[nativeCol]?.width*6 || defaultColWidth) - nativeColOff/12700;

        for(let i = nativeCol+1; i < nativeColEnd; i++){
            width += sheet?._columns?.[i]?.width*6 || defaultColWidth;
        }
        width += nativeColOffEnd / 12700;
    }else if(ext?.width){
        width = ext.width / 1.333333;
    }
    let height;
    if(nativeRow === nativeRowEnd){
        height = (nativeRowOffEnd - nativeRowOff) / 12700;
    }else if(br) {
        height = (sheet?._rows?.[nativeRow]?.height || defaultRowHeight) - nativeRowOff/12700;
        for(let i = nativeRow+1; i < nativeRowEnd; i++){
            height += sheet?._rows?.[i]?.height || defaultRowHeight;
        }
        height += nativeRowOffEnd / 12700;
    }else if(ext?.height){
        height = ext.height / 1.333333;
    }

    return {
        x: (x - (offset?.scroll?.x || 0)) * devicePixelRatio,
        y: (y - (offset?.scroll?.y || 0)) * devicePixelRatio,
        width: width * devicePixelRatio,
        height: height * devicePixelRatio
    };
}
export function clearCache(){
    cache = [];
}

function drawImage(ctx,index, data, position){
    getImage(index, data).then(image=>{
        let sx = 0;
        let sy = 0;
        let sWidth = image.width;
        let sHeight = image.height;
        let dx = position.x;
        let dy = position.y;
        let dWidth = position.width;
        let dHeight = position.height;
        let scaleX = dWidth / sWidth;
        let scaleY = dHeight / sHeight;

        if(dx < clipWidth * devicePixelRatio){
            let diff = clipWidth * devicePixelRatio - dx;
            dx = clipWidth * devicePixelRatio;
            dWidth -= diff;
            sWidth -= diff/scaleX;
            sx += diff/scaleX;
        }
        if(dy < clipHeight * devicePixelRatio){
            let diff = clipHeight * devicePixelRatio - dy;
            dy = clipHeight * devicePixelRatio;
            dHeight -= diff;
            sHeight -= diff/scaleY;
            sy += diff/scaleY;
        }
        // console.log('=>', sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }).catch(e=>{
        console.error(e);
    });
}
function getImage(index, data){
    return new Promise(((resolve, reject) => {
        if(cache[index]){
            return resolve(cache[index]);
        }
        const {buffer} = data.buffer;
        let blob = new Blob([buffer], { type: 'image/' + data.extension});
        let url = URL.createObjectURL(blob);
        let image = new Image();
        image.src = url;
        image.onload = function (){
            resolve(image);
            cache[index] = image;
        };
        image.onerror = function (e){
            reject(e);
        };
    }));

}
