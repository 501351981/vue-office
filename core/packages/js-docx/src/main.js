import docx from '../../vue-docx/src/docx';
import {download as downloadFile} from '../../../utils/url.js';
class JsDocxPreview {
    container = null;
    wrapper = null;
    wrapperMain = null;
    options = {};
    requestOptions = {};
    fileData = null;
    
    constructor(container, options={}, requestOptions={}) {
        this.container = container;
        this.options = options;
        this.requestOptions = requestOptions;
        this.createWrapper();
    }
    createWrapper(){
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'vue-office-docx';
        this.wrapperMain = document.createElement('div');
        this.wrapperMain.className = 'vue-office-docx-main';
        this.wrapper.appendChild(this.wrapperMain);
        this.container.appendChild(this.wrapper);
    }

    setOptions(options) {
        this.options = options;
    }
    setRequestOptions(requestOptions) {
        this.requestOptions = requestOptions;
    }
    preview(src){
        return new Promise((resolve, reject) => {
            docx.getData(src, this.requestOptions).then(async res =>{
                this.fileData = await docx.getBlob(res);
                docx.render(this.fileData, this.wrapperMain, this.options).then(() => {
                    resolve();
                }).catch(e => {
                    docx.render('', this.wrapperMain, this.options);
                    reject(e);
                });
            }).catch(err=>{
                docx.render('', this.wrapperMain, this.options);
                reject(err);
            });
        });
    }
    save(fileName){
        downloadFile(fileName || `js-preview-docx-${new Date().getTime()}.docx`,this.fileData);
    }
    destroy(){
        this.container.removeChild(this.wrapper);
        this.container = null;
        this.wrapper = null;
        this.wrapperMain = null;
        this.options = null;
        this.requestOptions = null;
    }
}
export function init(container, options, requestOptions){
    return new JsDocxPreview(container, options, requestOptions);
}