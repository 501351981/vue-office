import {worker} from '../../vue-pdf/src/worker';
import {pdfjsLib} from '../../vue-pdf/src/pdf';
import {download as downloadFile, getUrl, loadScript} from '../../../utils/url';
import omit from 'lodash/omit';

const pdfJsLibSrc = `data:text/javascript;base64,${pdfjsLib}`;
const PdfJsWorkerSrc = `data:text/javascript;base64,${worker}`;
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
    createCanvas(){
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
            let [canvas, ctx] = this.createCanvas();

            canvas.width = Math.floor(viewport.width * outputScale);
            canvas.height = Math.floor(viewport.height * outputScale);

            let domWidth = Math.floor(viewport.width);
            let domHeight = Math.floor(viewport.height);
            if (this.options.width) {
                let scale = this.options.width / domWidth;
                domWidth = Math.floor(this.options.width);
                domHeight = Math.floor(domHeight * scale);
            }
            if(domWidth > document.documentElement.clientWidth){
                let scale = document.documentElement.clientWidth / domWidth;
                domWidth = Math.floor(document.documentElement.clientWidth);
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
                    this.renderSinglePage(num + 1);
                }
            });
        });
    }
    renderPage(){
        if(!this.wrapperMain){
            this.createWrapperMain();
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