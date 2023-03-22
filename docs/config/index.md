# 属性

## src

- 类型：String, ArrayBuffer, Blob

文档地址，文件在CDN或服务器上的地址，或者是通过FileReader读取的文件ArrayBuffer或者Blob格式。

## request-options
- 类型：Object

如果属性src是个文件地址，组件内部会通过window.fetch进行请求，对应window.fetch的请求参数，可以用来设置header等请求信息。


## options [xlsx特有属性]

- 类型： Object

excel相关的配置，目前支持配置项很少。

minColLength: excel最少渲染多少列，如果想实现xlsx文件内容有几列，就渲染几列，可以将此值设置为0.

```json
{
  "minColLength": 20 
}
```

## staticFileUrl [pdf特有属性]
- 类型： String

pdf渲染时可能会请求一些bcmap文件，这些文件默认从 https://unpkg.com/pdfjs-dist@3.1.81/ 加载，但是可能存在网络不通问题，如果遇到这种问题，可以将这些文件放到自己静态目录，然后修改该属性，告诉组件去这里请求bcmap文件。

涉及的文件存放在当前github项目中examples/public/cmaps目录下，可将cmaps目录复制到你的静态服务目录下，然后修改staticFileUrl为cmaps文件夹对应的父地址，必须已http或https开头，如 http://yourdomain/static/