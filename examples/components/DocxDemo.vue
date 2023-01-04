<template>
  <div id="docx-demo">
    <input type="file"  @change="selectFile">
    <vue-office-docx :src="src" :request-options="options"/>
  </div>
</template>

<script>
/* eslint-disable */
import VueOfficeDocx from '../../packages/docx'
export default {
  name: 'DocxDemo',
  components: {
    VueOfficeDocx
  },
  data(){
    return {
      src:'http://static.shanhuxueyuan.com/test6.docx',
      options:{
        headers:{
          a:1
        }
      }
    }
  },
  methods:{
    selectFile(event){
      let file = event.target.files[0];

      console.log(typeof file, file instanceof Blob)
      var reader = new FileReader();
      reader.onload = (loadEvent) => {
        var arrayBuffer = loadEvent.target.result;
        this.src = arrayBuffer
      };

      reader.readAsArrayBuffer(file);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
