<script setup>
import {ref, onMounted} from 'vue';
import {useRouter, useRoute} from 'vue-router';
const router = useRouter();
const route = useRoute();
const current = ref([]);

onMounted(()=>{
    console.log(route.path);
    let hash = location.hash;
    let currentRoute = 'docx';
    if(hash.includes('excel')){
        currentRoute = 'excel';
    }else if(hash.includes('pdf')){
        currentRoute = 'pdf';
    }
    current.value = [currentRoute];
});

function go({key}){
     router.push({
         path: key,
         query: {...route.query}
     });
}
</script>

<template>
  <div>
      <a-menu v-model:selectedKeys="current" mode="horizontal" @click="go">
          <a-menu-item key="docx">
             docx文件预览
          </a-menu-item>
          <a-menu-item key="excel">
              excel文件预览
          </a-menu-item>
          <a-menu-item key="pdf">
              pdf文件预览
          </a-menu-item>
      </a-menu>
      <router-view/>
  </div>

</template>

<style scoped>
/deep/ .ant-tabs-nav-wrap{
  padding-left: 20px !important;
}

</style>
