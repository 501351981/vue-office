<template>
  <div class="vue-office-pdf" ref="vue-office-pdf">
    <div
        v-if="numPages"
        class="vue-office-pdf-wrapper"
        style="background: gray; padding: 30px 0;position: relative;">
      <canvas :ref="'canvas'+ page" v-for="page in numPages" :key="page" />
    </div>
  </div>
</template>

<script>
import {worker} from './worker'
const pdfJsLib = require('pdfjs-dist');
const PdfJsWorker = `data:text/javascript;base64,${worker}`;
pdfJsLib.GlobalWorkerOptions.workerSrc = PdfJsWorker
export default {
  name: "VueOfficePdf",
  props: {
    src: {
      type: [String]
    }
  },
  data() {
    return {
      document: '',
      numPages: 0
    }
  },
  watch: {
    src() {
      this.init()
    }
  },
  mounted() {
    if (this.src) {
      this.init()
    }
  },
  methods: {
    init() {
      if(!this.src){
        this.numPages = 0
        return
      }
      const loadingTask = pdfJsLib.getDocument(this.src);
      loadingTask.promise
          .then((pdfDocument) => {
            this.document = pdfDocument;
            this.numPages = pdfDocument.numPages;
            this.renderPage(1)
          })
    },
    renderPage(num) {
      this.document.getPage(num).then((pdfPage) => {
        const viewport = pdfPage.getViewport({scale: window.devicePixelRatio});
        const canvas = this.$refs['canvas' + num][0];
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        const renderTask = pdfPage.render({
          canvasContext: ctx,
          viewport,
        });
        renderTask.promise.then(() => {
          if (this.numPages > num) {
            this.renderPage(num + 1);
          }
        }).catch(()=>{

        });
      }).catch(()=>{

      });

    }
  }
}
</script>

<style scoped>

</style>