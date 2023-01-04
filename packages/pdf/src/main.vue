<template>
  <div class="vue-office-pdf" ref="vue-office-pdf" style="text-align: center;">
    <div
        v-if="numPages"
        class="vue-office-pdf-wrapper"
        style="background: gray; padding: 30px 0;position: relative;">
      <canvas :ref="'canvas'+ page" v-for="page in numPages" :key="page"/>
    </div>
  </div>
</template>

<script>
import {worker} from './worker'
import {pdfjsLib} from './pdf'
import loadScript from "./utils/loadScript";

const pdfJsLibSrc = `data:text/javascript;base64,${pdfjsLib}`;
const PdfJsWorkerSrc = `data:text/javascript;base64,${worker}`;

export default {
  name: "VueOfficePdf",
  props: {
    src: {
      type: [String]
    },
    staticFileUrl:{
      type: String,
      default: 'https://unpkg.com/pdfjs-dist@3.1.81/'
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
      this.checkPdfLib().then(this.init)
    }
  },
  mounted() {
    if (this.src) {
      this.checkPdfLib().then(this.init)
    }
  },
  methods: {
    checkPdfLib() {
      if (window.pdfjsLib) {
        return Promise.resolve()
      }
      return this.installPdfScript()
    },
    installPdfScript() {
      return loadScript(pdfJsLibSrc).then(() => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PdfJsWorkerSrc
      });
    },
    init() {
      if (!this.src) {
        this.numPages = 0
        return
      }
      const loadingTask = window.pdfjsLib.getDocument({
        url: this.src,
        cMapUrl: `${this.staticFileUrl.endsWith('/') ? this.staticFileUrl : this.staticFileUrl + '/'}cmaps/`,
        cMapPacked: true,
        enableXfa: true,
      });
      loadingTask.promise.then((pdfDocument) => {
        this.document = pdfDocument;
        this.numPages = pdfDocument.numPages;
        this.renderPage(1)
      }).catch((e) => {
        this.$emit('error', e)
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
          } else {
            this.$emit('rendered')
          }
        }).catch((e) => {
          this.$emit('error', e)
        });
      }).catch((e) => {
        this.$emit('error', e)
      });

    }
  }
}
</script>

<style scoped>

</style>