<template>
  <div class="vue-office-docx" ref="vue-office-docx"></div>
</template>

<script>
import docx from './docx'

export default {
  name: "VueOfficeDocx",
  props: {
    src: [String, ArrayBuffer]
  },
  data() {
    return {
      htmlData: ''
    }
  },
  watch: {
    src: {
      handler(val) {
        if (!val) {
          this.htmlData = ''
          this.insertHtml()
          return
        }
        docx.getHtmlFromDocx(val).then(html => {
          this.htmlData = html
          this.insertHtml()
        }).catch(e => {
          this.htmlData = ''
          this.insertHtml()
          throw new Error('vue-office-docx：\n' + JSON.stringify(e))
        })
      },
      immediate: true
    }
  },
  methods: {
    insertHtml() {
      this.$refs["vue-office-docx"].innerHTML = this.htmlData
    }
  }
}
</script>

<style scoped lang="less">

</style>