# vue-office

## 功能介绍
- 一站式：提供docx(已支持)、pdf、ppt、excel多种文档的在线预览方案，不必再去四处寻找/集成多种方案
- 简单：只需提供文档的src(网络地址)即可完成文档预览，也支持通过文件的arrayBuffer进行预览
- 体验好：选择每个文档的最佳预览方案，保证用户体验和性能最优

## 安装
```
npm install vue-office
```

### docx文档预览
```vue
<template>
  <vue-office-docx :src="docx"/>
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
  }
}
</script>
```
