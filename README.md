# vue-office

支持多种文件(**docx、excel、pdf、pptx**)预览的vue组件库，支持vue2/3。也支持非Vue框架的预览。

[《演示效果》](https://501351981.github.io/vue-office/examples/dist/)

[《使用非Vue框架（原生js、React等）、或者Vue里面报错，看这里》](https://501351981.github.io/vue-office/examples/docs/guide/js-preview.html)
## 功能特色
- 一站式：提供word(.docx)、pdf、excel(.xlsx, .xls)、ppt(.pptx)多种文档的在线预览方案，有它就够了
- 简单：只需提供文档的src(网络地址)即可完成文档预览
- 体验好：选择每个文档的最佳预览方案，保证用户体验和性能都达到最佳状态
- 性能好：针对数据量较大做了优化

## 安装
```shell
#docx文档预览组件
npm install @vue-office/docx vue-demi@0.14.6

#excel文档预览组件
npm install @vue-office/excel vue-demi@0.14.6

#pdf文档预览组件
npm install @vue-office/pdf vue-demi@0.14.6

#pptx文档预览组件
npm install @vue-office/pptx vue-demi@0.14.6
```
如果是vue2.6版本或以下还需要额外安装 @vue/composition-api
```shell
npm install @vue/composition-api
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

**二进制文件预览**

如果后端给的不是CDN地址，而是一些POST接口，该接口返回二进制流，则可以调用接口获取文件的ArrayBuffer数据，传递给src属性。

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
            docx: ''
        }
    },
    mounted(){
        fetch('你的API文件地址', {
            method: 'post'
        }).then(res=>{
            //读取文件的arrayBuffer
            res.arrayBuffer().then(res=>{
                this.docx = res
            })
        })
    },
    methods:{
        rendered(){
            console.log("渲染完成")
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
        style="height: 100vh"
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


# 我要支持作者

开发这样一个复杂的预览库，需要投入很多的个人时间，作者经常在周末、节假日进行该项目的开发，付出很多精力，如果该项目帮到了您，还请您不吝打赏。


![](https://501351981.github.io/vue-office/examples/dist/static/wx.png)

添加微信咨询问题请先打赏，尊重大家时间，没人有义务解答你的问题，都是在工作中抽出时间回复大家，成年人应该明白人与人之间是价值交换，不是一味索取。

## 为什么没有开放源码（打赏50+送源码）

我们都知道，如果一件事情没有收益，那是很难长久的，特别是对于一个大龄程序员来说，花费大量的时间"用爱发电"对大家来说是非常值得尊敬的，而我感觉对家庭来说可能是不道德的，没有收益，没有正反馈，很难把这个库完善下去，我们也看到了，很多开源库已经多年没有更新了。为了后续开发出更好用的前端office文件预览库，本项目需要大家的支持！

源码需付费向作者索要（_**打赏50**+_），打赏用户（无论多少）均可添加作者微信，交流该库或者前端领域话题，源码不得用于开源（这也是关闭源码的原因之一，有些人直接复制开源作为自己项目）。


## excel预览库众筹中

当前excel预览库还不完善，如果能得到大家的支持，后续准备从头开发一个更好用的excel预览库。

支持本次众筹参与方式：打赏50+，添加作者微信，并备注（众筹支持）

您将获得：
- 免费获取作者自研的pptx文件预览库源码（企业购买需5k+）
- 后续开发的excel预览库源码（源码不会在github开放，仅通过微信发送给打赏用户）
- 可选择加入高质量前端交流群
- 与作者日常前端问题交流

本次众筹金额达到5k+（100位朋友支持）则会启动 Excel预览库的自研设计与开发。

## 掘金小册

我的掘金小册[《如何写出高质量的前端代码》](https://juejin.cn/book/7351005935306801188) 已经上线啦，欢迎前端同学关注，希望能够提升大家的前端编码水平。
