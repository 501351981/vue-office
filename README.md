# vue-office

支持多种文件(**docx、excel、pdf**)预览的vue组件库，支持vue2/3。也支持非Vue框架的预览。

[《演示效果》](https://501351981.github.io/vue-office/examples/dist/)

[《非Vue框架预览看这里》](https://501351981.github.io/vue-office/examples/docs/guide/js-preview.html)
## 功能特色
- 一站式：提供docx、pdf、excel多种文档的在线预览方案，有它就够了
- 简单：只需提供文档的src(网络地址)即可完成文档预览
- 体验好：选择每个文档的最佳预览方案，保证用户体验和性能都达到最佳状态

## 安装
```shell
#docx文档预览组件
npm install @vue-office/docx vue-demi@0.13.11

#excel文档预览组件
npm install @vue-office/excel vue-demi@0.13.11

#pdf文档预览组件
npm install @vue-office/pdf vue-demi@0.13.11
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

**_如果该项目确实帮助到了您_**，为您节省了时间，请您不吝赞助，请作者喝一杯秋天的奶茶，暖一暖冰冷的心吧，哈哈哈，优化项目真的都是用爱发电^_^，不能打赏的朋友麻烦帮点个免费的赞

<img src="https://501351981.github.io/vue-office/examples/dist/static/wx.png" alt="赞助二维码" width="260"/>

<span style="color: red;">打赏的朋友欢迎**添加微信**或者进入前端开发交流群</span>，交流前端开发中遇到的技术、问题和困惑。

>【<span style="color:red;">**仅添加**打赏过的用户，不定期删除屏蔽朋友圈的好友</span>（为什么打赏了才能微信问问题？那别人为什么要先付出时间去解答你的问题？都是成年人了，人与人之间是价值交换，不是单向付出）】
> [常见问题](https://501351981.github.io/vue-office/examples/docs/guide/faq.html)

<img src="https://501351981.github.io/vue-office/examples/dist/static/wxqrcode.png" alt="个人微信" width="260"/>

<img src="https://501351981.github.io/vue-office/examples/dist/static/qun.png" alt="前端群" width="260"/>


### 恳请各位大佬不吝点赞，开源不易，感谢支持~~


## 我的其他库
- v-focus-next：一个Vue指令，使用该指令后，在表单中回车之后可以自动聚焦下一个表单元素，大大提升表单填写的流畅性。
[《v-focus-next》](https://github.com/501351981/v-focus-next)

  
- HowToCode：前端编程之道，探讨如何写出高质量的前端代码，总结前端编程的各种方法论、原则、思维模型等。[《前端编程之道》](https://github.com/501351981/HowToCode)
