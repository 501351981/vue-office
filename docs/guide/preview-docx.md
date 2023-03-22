# docx文件预览

::: warning
目前只支持docx文件预览，不支持doc文件。
:::

这部分内容和快速上手中docx预览内容一样，看过的可以跳过

## 使用网络地址预览

通过配置docx文件的远程地址实现预览，这种预览方式最简单。
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
