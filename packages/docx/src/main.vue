<template>
  <div class="vue-office-docx" ref="vue-office-docx"></div>
</template>

<script>
/*eslint-disable*/
import docx from './docx'

export default {
  name: "VueOfficeDocx",
  props: {
    src: [String, ArrayBuffer, Blob],
    requestOptions: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    src: {
      handler(val) {
        if (val) {
          this.init()
        } else {
          docx.render('', this.$refs["vue-office-docx"]).then(() => {
            this.$emit('rendered')
          })
        }
      }
    }
  },
  mounted() {
    if (this.src) {
      this.init()
    }
  },
  methods: {
    init() {
      docx.getData(this.src, this.requestOptions).then(res => {
        docx.render(res, this.$refs["vue-office-docx"]).then(() => {
          this.$emit('rendered')
        }).catch(e => {
          docx.render('', this.$refs["vue-office-docx"])
          this.$emit('error', e)
        })
      }).catch(e => {
        docx.render('', this.$refs["vue-office-docx"])
        this.$emit('error', e)
      })
    }
  }
}
</script>

<style lang="less">
@media screen and (max-width: 800px){
  .vue-office-docx {
    .docx-wrapper {
      padding: 10px;
      > section.docx {
        padding: 10px !important;
        width: 100% !important;
      }
    }
  }
}

</style>