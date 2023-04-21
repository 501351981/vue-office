<script>
import { defineComponent,ref, onMounted, watch } from 'vue-demi';
import {worker} from './worker';
import {pdfjsLib} from './pdf';
import {getUrl, loadScript} from '../../../utils/url';

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
    staticFileUrl:{
      type: String,
      default: 'https://unpkg.com/pdfjs-dist@3.1.81/'
    }
  },
  emits:['rendered', 'error'],
  setup(props, { emit }){
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
        const viewport = pdfPage.getViewport({scale:  window.devicePixelRatio});

        const canvas = rootRef.value[num-1];
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        if(viewport.width > document.documentElement.clientWidth){
          canvas.style.width = '100%';
        }else{
          canvas.style.width = Math.floor(viewport.width) + 'px';
        }
        const ctx = canvas.getContext('2d');
        const renderTask = pdfPage.render({
          canvasContext: ctx,
          viewport,
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

    onMounted(()=>{
      if (props.src) {
        checkPdfLib().then(init);
      }
    });

    watch(() => props.src, ()=>{
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