# 非Vue框架文件预览

为了在非Vue的框架中进行Office文件预览，增加了通过js进行预览的方式。

docx、excel、pdf三个预览库的API几乎一致，只需要初始化时传入要挂载的Dom，然后传递要预览的文件地址，即可完成预览，非常地简单。
## docx文件预览

- 安装依赖库

```shell
# docx文件预览库
npm i @js-preview/docx
```

- 预览

```javascript
import jsPreviewDocx from "@js-preview/docx";
import '@js-preview/docx/lib/index.css'

//初始化时指明要挂载的父元素Dom节点
const myDocxPreviewer = jsPreviewDocx.init(document.getElementById('docx'));

//传递要预览的文件地址即可
myDocxPreviewer.preview('https://501351981.github.io/vue-office/examples/dist/static/test-files/test.docx').then(res=>{
    console.log('预览完成');
}).catch(e=>{
    console.log('预览失败', e);
})

```

## excel文件预览

- 安装依赖库

```shell
# docx文件预览库
npm i @js-preview/excel
```

- 预览

```javascript
import jsPreviewExcel from "@js-preview/excel";
import '@js-preview/excel/lib/index.css';

const myExcelPreviewer = jsPreviewExcel.init(document.getElementById('excel'));
myExcelPreviewer.preview('https://501351981.github.io/vue-office/examples/dist/static/test-files/test.xlsx').then(res=>{
    console.log('预览完成');
}).catch(e=>{
    console.log('预览失败', e);
})

```


## pdf文件预览

- 安装依赖库

```shell
# docx文件预览库
npm i @js-preview/pdf
```

- 预览

```javascript
import jsPreviewPdf from "@js-preview/pdf";

const myPdfPreviewer = jsPreviewPdf.init(document.getElementById('pdf'));
myPdfPreviewer.preview('https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pdf').then(res=>{
    console.log('预览完成');
}).catch(e=>{
    console.log('预览失败', e);
})

```

## API

### init方法

三种库的init方法保持一致，init方法会返回预览对象。
```ts
init: (container: HTMLElement, options?: Options, requestOptions?: any) => JsPdfPreview | JsExcelPreview |JsDocxPreview;
```

- container

预览挂载的父容器Dom

- options

预览支持的配置参数，三个预览库支持的配置不同。

docx预览支持的配置，详细说明见库docx-preview：
```ts
export interface Options {
    inWrapper?: boolean;
    ignoreWidth?: boolean;
    ignoreHeight?: boolean;
    ignoreFonts?: boolean;
    breakPages?: boolean;
    debug?: boolean;
    experimental?: boolean;
    className?: string;
    trimXmlDeclaration?: boolean;
    renderHeaders?: boolean;
    renderFooters?: boolean;
    renderFootnotes?: boolean;
    renderEndnotes?: boolean;
    ignoreLastRenderedPageBreak?: boolean;
    useBase64URL?: boolean;
    useMathMLPolyfill?: boolean;
    renderChanges?: boolean;
}
```

excel支持的配置
```ts
export interface Options {
    minColLength?: number;  //excel最少渲染多少列，如果想实现xlsx文件内容有几列，就渲染几列，可以将此值设置为0.
    showContextmenu?: boolean; //是否显示右键菜单，默认false
}
```

pdf支持的配置，详情见https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib.html

```ts
export interface Options {
    staticFileUrl?: string;
    width?: number;
    data?: BinaryData;
    httpHeaders?: Object;
    withCredentials?: boolean;
    password?: string;
    length?: number;
    docBaseUrl?: string;
    cMapUrl?: string;
    cMapPacked?: boolean;
    CMapReaderFactory?: Object;
    useSystemFonts?: boolean;
}
```

### preview方法
调用preview方法进行文件的预览。

preview方法接收参数支持三种： 文件url地址、文件ArrayBuffer格式数据、文件blob格式。

```ts
preview: (src: string | ArrayBuffer | Blob) => Promise<any>
```

url格式适合有文件静态地址的情况，ArrayBuffer格式适合文件上传前的预览。

### save方法

调用save进行文件下载，参数名为下载的文件名称，可不传。

```ts
 save: (fileName?: string) => void;
```

### destroy方法

卸载方法，可以在组件销毁前调用预览对象的卸载方法，避免长期使用造成内存泄露。

## 如果该项目帮助了您，还请您不吝点赞