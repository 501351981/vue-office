<template>
    <div v-loading="loading">
        <vue-office-pdf
            :src="pdf"
            @rendered="renderedHandler"
            @error="errorHandler"
        />
    </div>
</template>

<script>
//引入VueOfficePdf组件
import VueOfficePdf from '@vue-office/pdf'
export default {
    name: "VueOfficePdfDemo",
    components: {
        VueOfficePdf
    },
    data() {
        return {
            loading: true,
            pdf: 'http://static.shanhuxueyuan.com/test.pdf' //设置文档地址
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