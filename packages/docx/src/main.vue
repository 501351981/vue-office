<script>
import {defineComponent, ref, onMounted, watch} from 'vue-demi';
import docx from './docx'
export default defineComponent({
  name: 'VueOfficeDocx',
  props: {
    src: [String, ArrayBuffer, Blob],
    requestOptions: {
      type: Object,
      default: () => ({})
    }
  },
  emits:['rendered', 'error'],
  setup(props, { emit }){
    console.log('setup')
    const rootRef = ref(null)

    function init(){
      let container = rootRef.value
      docx.getData(props.src, props.requestOptions).then(res => {
        console.log('container',res, container)
        docx.render(res, container).then(() => {
          emit('rendered')
        }).catch(e => {
          docx.render('', container)
          emit('error', e)
        })
      }).catch(e => {
        docx.render('', container)
        emit('error', e)
      })
    }

    onMounted(()=>{
      if(props.src){
        init()
      }
    })

    watch(() => props.src, () =>{
      if (props.src) {
        init()
      } else {
        docx.render('', rootRef.value).then(() => {
          emit('rendered')
        })
      }
    })
    return {
      rootRef
    }
  }
})
</script>

<template>
  <div class="vue-office-docx" ref="rootRef"></div>
</template>

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