# 属性

## src

- 类型：String, ArrayBuffer, Blob

文档地址，文件在CDN或服务器上的地址，或者是通过FileReader读取的文件ArrayBuffer或者Blob格式。

## request-options
- 类型：Object

如果属性src是个文件地址，组件内部会通过window.fetch进行请求，对应window.fetch的请求参数，可以用来设置header等请求信息。


## options

- 类型： Object

预览需要的一些特殊配置，不同预览组件可配置项各不相同。

- excel预览

excel相关的配置，目前支持配置项很少。

minColLength: excel最少渲染多少列，如果想实现xlsx文件内容有几列，就渲染几列，可以将此值设置为0.

widthOffset：在默认渲染的列表宽度上再加10px宽

heightOffset：在默认渲染的列表高度上再加10px高

transformData：在预览之前可以通过transformData对即将渲染数据及样式进行修改

```javascript
{
  "minColLength": 20,
  "widthOffset": 0, //在默认渲染的列表宽度上再加10px宽
  "heightOffset": 0, //在默认渲染的列表高度上再加10px高
  "transformData": function (workbookData){
      //修改workbookData
      return workbookData;    
  }
}
```

- docx预览

docx预览组件支持的可配置项如下

```typescript
{
    className: string = "docx", //class name/prefix for default and document style classes
    inWrapper: boolean = true, //enables rendering of wrapper around document content
    ignoreWidth: boolean = false, //disables rendering width of page
    ignoreHeight: boolean = false, //disables rendering height of page
    ignoreFonts: boolean = false, //disables fonts rendering
    breakPages: boolean = true, //enables page breaking on page breaks
    ignoreLastRenderedPageBreak: boolean = false, //disables page breaking on lastRenderedPageBreak elements
    experimental: boolean = false, //enables experimental features (tab stops calculation)
    trimXmlDeclaration: boolean = true, //if true, xml declaration will be removed from xml documents before parsing
    useBase64URL: boolean = false, //if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
    useMathMLPolyfill: boolean = false, //includes MathML polyfills for chrome, edge, etc.
    showChanges: false, //enables experimental rendering of document changes (inserions/deletions)
    debug: boolean = false, //enables additional logging
    }
```

- pdf预览

pdf 预览组件支持的可配置项如下

```javascript
const options = {
    width: 500, //number，可不传，用来控制pdf预览的宽度，默认根据文档实际宽度计算
    httpHeaders: {}, //object, Basic authentication headers
    password: '', //string, 加密pdf的密码
    //更多配置参见 https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib.html
}

```





## staticFileUrl [pdf特有属性]
- 类型： String

pdf渲染时可能会请求一些bcmap文件，这些文件默认从 https://unpkg.com/pdfjs-dist@3.1.81/ 加载，但是可能存在网络不通问题，如果遇到这种问题，可以将这些文件放到自己静态目录，然后修改该属性，告诉组件去这里请求bcmap文件。

涉及的文件存放在当前github项目中examples/public/cmaps目录下，可将cmaps目录复制到你的静态服务目录下，然后修改staticFileUrl为cmaps文件夹对应的父地址，必须已http或https开头，如 http://yourdomain/static/