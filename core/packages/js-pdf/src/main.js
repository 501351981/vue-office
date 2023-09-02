import {workerStr} from './worker.js';
import {pdfLibJsStr} from './pdf.js';
import {download as downloadFile, getUrl, loadScript} from '../../../utils/url';
import omit from 'lodash/omit';

const pdfJsLibSrc = `data:text/javascript;base64,${pdfLibJsStr}`;
const PdfJsWorkerSrc = `data:text/javascript;base64,${workerStr}`;
class JsPdfPreview{
    container = null;
    wrapper = null;
    wrapperMain = null;
    options = {};
    requestOptions = {};
    pdfDocument = null;
    constructor(container, options={}, requestOptions={}) {
        this.container = container;
        this.options = {
            staticFileUrl: 'https://unpkg.com/pdfjs-dist@3.1.81/',
            ...options
        };
        this.requestOptions = requestOptions;
        this.createWrapper();
    }
    createWrapper(){
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'vue-office-pdf';
        this.wrapper.setAttribute('style', 'text-align: center;overflow-y: auto;');
        this.container.appendChild(this.wrapper);
    }
    createWrapperMain(){
        this.wrapperMain = document.createElement('div');
        this.wrapperMain.className = 'vue-office-pdf-wrapper';
        this.wrapperMain.setAttribute('style', 'background: gray; padding: 30px 0;position: relative;');
        this.wrapper.appendChild(this.wrapperMain);
    }
    createCanvas(num){
        let existCanvas = this.wrapperMain.querySelectorAll('canvas');
        if(existCanvas[num -1]){
            return [existCanvas[num -1], existCanvas[num -1].getContext('2d')];
        }
        const canvas = document.createElement('canvas');
        canvas.setAttribute('style', 'width:100%');
        this.wrapperMain.appendChild(canvas);
        return [canvas, canvas.getContext('2d')];
    }
    installPdfScript() {
        return loadScript(pdfJsLibSrc).then(() => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = PdfJsWorkerSrc;
        });
    }
    checkPdfLib() {
        if (window.pdfjsLib) {
            return Promise.resolve();
        }
        return this.installPdfScript();
    }
    getDocument(src){
        const loadingTask = window.pdfjsLib.getDocument({
            url: getUrl(src),
            cMapUrl: `${this.options.staticFileUrl.endsWith('/') ? this.options.staticFileUrl : this.options.staticFileUrl + '/'}cmaps/`,
            cMapPacked: true,
            enableXfa: true,
            ...omit(this.options, ['width', 'staticFileUrl'])
        });
        return loadingTask.promise;
    }
    renderSinglePage(num){
        return this.pdfDocument.getPage(num).then((pdfPage) => {
            const viewport = pdfPage.getViewport({scale: 2});
            const outputScale = window.devicePixelRatio || 1;
            let [canvas, ctx] = this.createCanvas(num);

            canvas.width = Math.floor(viewport.width * outputScale);
            canvas.height = Math.floor(viewport.height * outputScale);

            let domWidth = Math.floor(viewport.width);
            let domHeight = Math.floor(viewport.height);
            if (this.options.width) {
                let scale = this.options.width / domWidth;
                domWidth = Math.floor(this.options.width);
                domHeight = Math.floor(domHeight * scale);
            }
            let wrapperWidth = this.wrapperMain.getBoundingClientRect().width - 20;
            if(domWidth > wrapperWidth){
                let scale = wrapperWidth / domWidth;
                domWidth = Math.floor(wrapperWidth);
                domHeight = Math.floor(domHeight * scale);
            }

            canvas.style.width = domWidth + 'px';
            canvas.style.height = domHeight + 'px';

            const transform = outputScale !== 1
                ? [outputScale, 0, 0, outputScale, 0, 0]
                : null;

            const renderTask = pdfPage.render({
                canvasContext: ctx,
                transform,
                viewport
            });
            return renderTask.promise.then(() => {
                if (this.pdfDocument.numPages > num) {
                    return this.renderSinglePage(num + 1);
                }
            });
        });
    }
    renderPage(){
        if(!this.wrapperMain){
            this.createWrapperMain();
        }else{
            let canvas = this.wrapperMain.querySelectorAll('canvas');
            if(canvas.length > this.pdfDocument.numPages){
                for(let i = canvas.length-1; i >= this.pdfDocument.numPages; i--){
                    this.wrapperMain.removeChild(canvas[i]);
                }
            }
        }
        return this.renderSinglePage(1);
    }
    clearAllCanvas(){
        if(this.wrapperMain){
            this.wrapper.removeChild(this.wrapperMain);
            this.wrapperMain = null;
        }
    }
    setOptions(options) {
        this.options = options;
    }
    setRequestOptions(requestOptions) {
        this.requestOptions = requestOptions;
    }
    preview(src){
        return new Promise(((resolve, reject) => {
            if(!src){
                this.clearAllCanvas();
                reject(new Error('预览地址不能为空'));
                return;
            }
            this.checkPdfLib().then(_=>{
                this.getDocument(src).then(pdf=>{
                    this.pdfDocument = pdf;
                    this.renderPage().then(_=>{
                        resolve();
                    }).catch(e=>{
                        this.clearAllCanvas();
                        reject(e);
                    });
                }).catch(e=>{
                    this.clearAllCanvas();
                    reject(e);
                });
            }).catch(e=>{
                this.clearAllCanvas();
                reject(e);
            });
        }));
    }
    rerender(){
        return this.renderPage().then(_=>{
            return Promise.resolve();
        }).catch(e=>{
            this.clearAllCanvas();
            return Promise.reject(e);
        });
    }
    save(fileName){
        this.pdfDocument && this.pdfDocument._transport && this.pdfDocument._transport.getData().then(fileData=>{
            downloadFile(fileName || `js-preview-pdf-${new Date().getTime()}.pdf`,fileData.buffer);
        });
    }
    destroy(){
        this.container.removeChild(this.wrapper);
        this.container = null;
        this.wrapper = null;
        this.wrapperMain = null;
        this.options = {};
        this.requestOptions = {};
        this.pdfDocument = null;
    }
}
export function init(container, options, requestOptions){
    return new JsPdfPreview(container, options, requestOptions);
}