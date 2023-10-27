//乾坤下不能渲染问题兼容
if(typeof window.setImmediate === 'undefined' ){
    window.setImmediate = function (func, ...args){
        setTimeout(()=>func(args));
    };
}

export default {}