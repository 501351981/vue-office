<template>
  <div class="vue-office-docx" ref="vue-office-docx"></div>
</template>

<script>
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
        })
      }).catch(e => {
        this.$emit('error', e)
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>