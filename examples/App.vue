<template>
  <div id="app">
    <docx-demo />
  </div>
</template>

<script>
/* eslint-disable */
import DocxDemo from "./components/DocxDemo";
export default {
  name: 'App',
  components: {
    DocxDemo
  },
  data(){
    return {
    }
  },
  methods:{

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
  margin-top: 0px;
}
</style>
