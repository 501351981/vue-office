<script>
import { defineComponent, ref, onMounted, watch } from 'vue-demi';
import workerStr from './worker?raw';
import pdfjsLib from './pdf?raw';
import { download as downloadFile, getUrl, loadScript } from '../../../utils/url';
import { base64_encode } from '../../../utils/base64';
import omit from 'lodash/omit';

const pdfJsLibSrc = `data:text/javascript;base64,${(base64_encode(pdfjsLib))}`;
const PdfJsWorkerSrc = `data:text/javascript;base64,${(base64_encode(workerStr))}`;

export default defineComponent({
    name: 'VueOfficePdf',
    props: {
        src: [String, ArrayBuffer, Blob],
        requestOptions: {
            type: Object,
            default: () => ({})
        },
        staticFileUrl: {
            type: String,
            default: 'https://unpkg.com/pdfjs-dist@3.1.81/'
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ['rendered', 'error'],
    setup(props, { emit }) {
        let pdfDocument = null;
        let loadingTask = null;
        const wrapperRef = ref(null);
        const rootRef = ref([]);
        const numPages = ref(0);

        const lazySize = 5;

        function installPdfScript() {
            return loadScript(pdfJsLibSrc).then(() => {
                if (window.pdfjsLib) {
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PdfJsWorkerSrc;
                } else {
                    return Promise.reject('window.pdfjsLib未找到');
                }
            });
        }

        function checkPdfLib() {
            if (window.pdfjsLib) {
                return Promise.resolve();
            }
            return installPdfScript();
        }

        function init() {
            if (!props.src) {
                numPages.value = 0;
                return;
            }
            loadingTask = window.pdfjsLib.getDocument({
                url: getUrl(props.src),
                cMapUrl: `${props.staticFileUrl.endsWith('/') ? props.staticFileUrl : props.staticFileUrl + '/'}cmaps/`,
                cMapPacked: true,
                enableXfa: true,
                ...omit(props.options, ['width'])
            });
            loadingTask.promise.then((pdf) => {
                pdfDocument = pdf;
                numPages.value = props.options.lazy ? Math.min(pdfDocument.numPages, lazySize) : pdfDocument.numPages;
                setTimeout(()=>{
                    renderPage(1);
                });
            }).catch((e) => {
                emit('error', e);
            });
        }

        function onScrollPdf(e) {
            if(!props.options.lazy){
                return;
            }
            const { scrollTop, scrollHeight, clientHeight } = e.target;
            if (scrollTop + clientHeight >= scrollHeight) {
              if (numPages.value >= pdfDocument.numPages) {
                return;
              }
              let oldNum = numPages.value;
              numPages.value = Math.min(pdfDocument.numPages, oldNum + lazySize);
              if (numPages.value > oldNum) {
                renderPage(oldNum + 1);
              }
            }
        }

        function renderPage(num) {
            pdfDocument.getPage(num).then((pdfPage) => {
                const viewport = pdfPage.getViewport({ scale: 2 });
                const outputScale = window.devicePixelRatio || 1;

                const canvas = rootRef.value[num - 1];
                const ctx = canvas.getContext('2d');

                canvas.width = Math.floor(viewport.width * outputScale);
                canvas.height = Math.floor(viewport.height * outputScale);

                let domWidth = Math.floor(viewport.width);
                let domHeight = Math.floor(viewport.height);
                if (props.options.width) {
                    let scale = props.options.width / domWidth;
                    domWidth = Math.floor(props.options.width);
                    domHeight = Math.floor(domHeight * scale);
                }
                let wrapperWidth = wrapperRef.value.getBoundingClientRect().width - 20;
                if (domWidth > wrapperWidth) {
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
                renderTask.promise.then(() => {
                    if (numPages.value > num) {
                        renderPage(num + 1);
                    } else {
                        emit('rendered');
                    }
                }).catch((e) => {
                    emit('error', e);
                });
            }).catch((e) => {
                emit('error', e);
            });

        }

        function rerender(){
            renderPage(1);
        }
        onMounted(() => {
            if (props.src) {
                checkPdfLib().then(init).catch(e => {
                    console.warn(e);
                });
            }
        });

        watch(() => props.src, () => {
            checkPdfLib().then(init).catch(e => {
                console.warn(e);
            });
        });
        function save(fileName) {
            pdfDocument && pdfDocument._transport && pdfDocument._transport.getData().then(fileData => {
                downloadFile(fileName || `vue-office-pdf-${new Date().getTime()}.pdf`, fileData.buffer);
            });
        }
        return {
            wrapperRef,
            rootRef,
            numPages,
            save,
            onScrollPdf,
            rerender
        };
    }
});
</script>

<template>
    <div class="vue-office-pdf" ref="vue-office-pdf" style="text-align: center;overflow-y: auto;" @scroll="onScrollPdf">
        <div v-if="numPages" ref="wrapperRef" class="vue-office-pdf-wrapper" style="background: gray; padding: 30px 0;position: relative;">
            <canvas v-for="page in numPages" ref="rootRef" :key="page" style="width:100%" />
            <slot></slot>
        </div>
    </div>
</template>
<style lang="less">
</style>
