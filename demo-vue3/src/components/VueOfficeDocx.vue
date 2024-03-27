<template>
   <div v-loading="loading">
       <vue-office-docx
           :src="docx"
           style="height: 100vh;"
           @rendered="renderedHandler"
           @error="errorHandler"
       />
   </div>
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
console.log(VueOfficeDocx)
//引入相关样式
import '@vue-office/docx/lib/index.css'
export default {
    name: "VueOfficeDocxDemo",
    components: {
        VueOfficeDocx
    },
    data() {
        return {
            loading: true,
            docx: 'http://static.shanhuxueyuan.com/test.docx'
        }
    },
    methods: {
        renderedHandler() {
            this.loading = false;
            console.log("渲染完成")
        },
        errorHandler() {
            this.loading = false;
            console.log("渲染失败")
        }
    }
};
</script>

<style scoped>

</style>