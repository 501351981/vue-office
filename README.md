# vue-office

支持多种文件(**docx、excel、pdf**)预览的vue组件库，支持vue2/3。

[《演示效果》](https://501351981.github.io/vue-office/examples/dist/)

## 功能特色
- 一站式：提供docx、pdf、excel多种文档的在线预览方案，有它就够了
- 简单：只需提供文档的src(网络地址)即可完成文档预览
- 体验好：选择每个文档的最佳预览方案，保证用户体验和性能都达到最佳状态

## 安装
```shell
#docx文档预览组件
npm install @vue-office/docx vue-demi

#excel文档预览组件
npm install @vue-office/excel vue-demi

#pdf文档预览组件
npm install @vue-office/pdf vue-demi
```
如果是vue2.6版本或以下还需要额外安装 @vue/composition-api
```shell
npm install @vue/composition-api/
```

## 使用示例
文档预览场景大致可以分为两种：
- 有文档网络地址，比如 https://***.docx
- 文件上传时预览，此时可以获取文件的ArrayBuffer或Blob

### .docx文件预览
**使用网络地址预览**
```vue
<template>
  <vue-office-docx 
      :src="docx"
      style="height: 100vh;"
      @rendered="rendered"
  />
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'

export default {
  components:{
    VueOfficeDocx
  },
  data(){
    return {
      docx: 'http://static.shanhuxueyuan.com/test6.docx' //设置文档网络地址，可以是相对地址
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

**上传文件预览**

读取文件的ArrayBuffer
```vue
<template>
  <div>
    <input type="file" @change="changeHandle"/>
    <vue-office-docx :src="src"/>
  </div>
</template>

<script>
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

export default {
  components: {
    VueOfficeDocx
  },
  data(){
    return {
      src: ''
    }
  },
  methods:{
    changeHandle(event){
      let file = event.target.files[0]
      let fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload =  () => {
        this.src = fileReader.result
      }
    }
  }
}
</script>
```
### excel文件预览

通过网络地址预览示例如下，通过文件ArrayBuffer预览和上面docx的使用方式一致。
```vue
<template>
    <vue-office-excel
        :src="excel"
        style="height: 100vh;"
        @rendered="renderedHandler"
        @error="errorHandler"
    />
</template>

<script>
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'

export default {
    components: {
        VueOfficeExcel
    },
    data() {
        return {
            excel: 'http://static.shanhuxueyuan.com/demo/excel.xlsx'//设置文档地址
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

### pdf文件预览
通过网络地址预览示例如下，通过文件ArrayBuffer预览和上面docx的使用方式一致。
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


## 赞助和微信交流

**_如果该项目确实帮助到了您_**，欢迎赞助，以鼓励我将更多的休息时间，投入到该项目的优化中，也欢迎赞助后添加微信交流：\_hit757_

<img src="https://501351981.github.io/vue-office/examples/dist/static/wx.png" alt="赞助二维码" width="260"/>

### 恳请各位大佬不吝点赞，开源不易，感谢支持~~
