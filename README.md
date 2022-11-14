# vue-office

支持多种文件(docx、pdf、ppt、excel)预览的vue组件套装。

## 功能特色
- 一站式：提供docx(已支持)、pdf(已支持)、ppt、excel多种文档的在线预览方案，有它就够了
- 简单：只需提供文档的src(网络地址)即可完成文档预览
- 体验好：选择每个文档的最佳预览方案，保证用户体验和性能都达到最佳状态

## 安装
```
npm install vue-office
```

## 使用
### docx文档的预览
```vue
<template>
  <vue-office-docx :src="docx" @rendered="rendered"/>
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from 'vue-office/lib/docx'

export default {
  components:{
    VueOfficeDocx
  },
  data(){
    return {
      docx: 'http://static.shanhuxueyuan.com/test6.docx' //设置文档地址
    }
  },
  methods:{
    rendered(){
      console.log("渲染完成")
    }
  }
}
</script>
```



### pdf文档预览
```vue
<template>
  <vue-office-pdf :src="pdf" @rendered="rendered"/>
</template>

<script>
//引入VueOfficePdf组件
import VueOfficePdf from 'vue-office/lib/pdf'

export default {
  components:{
    VueOfficePdf
  },
  data(){
    return {
      pdf: 'http://static.shanhuxueyuan.com/test.pdf' //设置文档地址
    }
  },
  methods:{
    rendered(){
      console.log("渲染完成")
    }
  }
}
</script>
```