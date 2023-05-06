<script>
import {defineComponent, ref, onMounted, watch} from 'vue-demi';
import {worker} from './worker';
import {pdfjsLib} from './pdf';
import {getUrl, loadScript} from '../../../utils/url';
import omit from 'lodash/omit';

const pdfJsLibSrc = `data:text/javascript;base64,${pdfjsLib}`;
const PdfJsWorkerSrc = `data:text/javascript;base64,${worker}`;

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
    setup(props, {emit}) {
        let pdfDocument = null;
        const rootRef = ref([]);
        const numPages = ref(0);

        function installPdfScript() {
            return loadScript(pdfJsLibSrc).then(() => {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = PdfJsWorkerSrc;
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
            const loadingTask = window.pdfjsLib.getDocument({
                url: getUrl(props.src),
                cMapUrl: `${props.staticFileUrl.endsWith('/') ? props.staticFileUrl : props.staticFileUrl + '/'}cmaps/`,
                cMapPacked: true,
                enableXfa: true,
                ...omit(props.options, ['width'])
            });
            loadingTask.promise.then((pdf) => {
                pdfDocument = pdf;
                numPages.value = pdfDocument.numPages;
                renderPage(1);
            }).catch((e) => {
                emit('error', e);
            });
        }

        function renderPage(num) {
            pdfDocument.getPage(num).then((pdfPage) => {
                const viewport = pdfPage.getViewport({scale: 2});
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

        onMounted(() => {
            if (props.src) {
                checkPdfLib().then(init);
            }
        });

        watch(() => props.src, () => {
            checkPdfLib().then(init);
        });
        return {
            rootRef,
            numPages
        };
    }
});
</script>

<template>
    <div class="vue-office-pdf" ref="vue-office-pdf" style="text-align: center;overflow-y: auto;">
        <div
            v-if="numPages"
            class="vue-office-pdf-wrapper"
            style="background: gray; padding: 30px 0;position: relative;">
            <canvas
                v-for="page in numPages"
                ref="rootRef"
                :key="page"
                style="width:100%"
            />
        </div>
    </div>
</template>
<style lang="less">

</style>