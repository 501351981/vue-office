# vue-office

支持多种文件(docx、pdf、excel)预览的vue组件套装。

[查看demo演示](https://501351981.github.io/vue-office/examples/dist/)

## 功能特色
- 一站式：提供docx、pdf、excel多种文档的在线预览方案，有它就够了
- 简单：只需提供文档的src(网络地址)即可完成文档预览
- 体验好：选择每个文档的最佳预览方案，保证用户体验和性能都达到最佳状态

## 安装
```
//docx文档预览组件
npm install @vue-office/docx

//excel文档预览组件
npm install @vue-office/excel

//pdf文档预览组件
npm install @vue-office/pdf
```

## 使用示例
### docx文档的预览
```vue
<template>
  <vue-office-docx :src="docx" @rendered="rendered"/>
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'

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

### excel文档预览
```vue
<template>
  <vue-office-excel :src="excel" @rendered="rendered"/>
</template>

<script>
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'

export default {
  components:{
    VueOfficeExcel
  },
  data(){
    return {
      excel: 'http://static.shanhuxueyuan.com/demo/excel.xlsx'//设置文档地址
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
import VueOfficePdf from '@vue-office/pdf'

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