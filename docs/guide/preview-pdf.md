# pdf文件预览

## 使用网络地址预览

```vue
<template>
    <vue-office-pdf 
        :src="pdf"
        @rendered="renderedHandler"
        @error="errorHandler"
    />
</template>

<script>
//引入VueOfficePdf组件
import VueOfficePdf from '@vue-office/pdf'

export default {
    components: {
        VueOfficePdf
    },
    data() {
        return {
            pdf: 'http://static.shanhuxueyuan.com/test.pdf' //设置文档地址
        }
    },
    methods: {
        renderedHandler() {
            console.log("渲染完成")
        },
        errorHandler() {
            console.log("渲染失败")
        }
    }
}
</script>
```


## 上传文件预览

和docx的上传文件预览一样，获取文件的ArrayBuffer，传给组件的src属性。