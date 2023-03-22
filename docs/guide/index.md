# vue-office简介

vue-office是一个支持多种文件(docx、.xlsx、pdf)预览的vue组件库，支持vue2和vue3。

目标是成为使用最简单，功能最强大的文件预览库

[查看演示demo](https://501351981.github.io/vue-office/examples/dist/)

## 功能特色
- 一站式：提供docx、.xlsx、pdf多种文档的在线预览方案，有它就够了，不用再四处寻找、测试、集成各种库了
- 使用简单：只需提供文档的src(网络地址)即可完成文档预览，也支持ArrayBuffer、Blob等多种格式
- 支持样式：不仅能预览内容，也支持文档样式，最大限度还原office文件内容


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
npm install @vue/composition-api
```


## 使用网络地址预览

docx、xlsx、pdf三种文件的预览方式几乎一致，我们先以docx文档的预览为例，介绍下组件用法。

docx的预览如下：
```vue
<template>
    <vue-office-docx
        :src="docx"
        style="height: 100vh;"
        @rendered="renderedHandler"
        @error="errorHandler"
    />
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'

export default {
    components: {
        VueOfficeDocx
    },
    data() {
        return {
            docx: 'http://static.shanhuxueyuan.com/test6.docx' //设置文档网络地址，可以是相对地址
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
可以看出，非常的简单，只需要指定文档的src远程地址即可。

可以设置组件的style配置样式，通常需要设置下高度height，如果不设置则默认取组件的父元素高度，最小高度300px。

组件渲染完成会抛出rendered事件，渲染失败会抛出error事件。


## 上传文件预览

预览通常有两种场景，一种是已有文件的远程地址，另一种是上传前预览，上传前预览主要是通过读取文件的ArrayBuffer格式，传给预览组件来实现。

我们以ElementUI的上传组件作为示例，当然也可以使用普通的input type="file"，只要能获取文件的ArrayBuffer格式数据即可。
```vue

<template>
    <div id="docx-demo">
        <el-upload
            :limit="1"
            :file-list="fileList"
            accept=".docx"
            :beforeUpload="beforeUpload"
            action=""
        >
            <el-button size="small" type="warning">点击上传</el-button>
        </el-upload>
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
    data() {
        return {
            src: '',
            fileList: []
        }
    },
    methods: {
        //在beforeUpload中读取文件内容
        beforeUpload(file) {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (loadEvent) => {
                let arrayBuffer = loadEvent.target.result;
                this.src = arrayBuffer
            };
            return false
        }
    }
}
</script>
```
主要是利用在beforeUpload中获取上传的文件，然后利用FileReader以ArrayBuffer格式读取，读取之后传给预览组件。

如果是原生的input type="file"，也是类似的
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
    data() {
        return {
            src: ''
        }
    },
    methods: {
        changeHandle(event) {
            let file = event.target.files[0]
            let fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = () => {
                this.src = fileReader.result
            }
        }
    }
}
</script>
```

