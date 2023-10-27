if(typeof window.setImmediate === 'undefined' ){
    window.setImmediate = function (func, ...args){
        setTimeout(()=>func(args));
    };
}

export default {}