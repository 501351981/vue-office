var p=Object.defineProperty;var c=(i,e,t)=>e in i?p(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var n=(i,e,t)=>(c(i,typeof e!="symbol"?e+"":e,t),t);import{d as r}from"./docx-629d4f97.js";import{d as l}from"./url-065d6777.js";import{r as h,o as d,a as u,c as m}from"./index-69842e67.js";import"./jszip.min-391c5e2f.js";import"./_commonjs-dynamic-modules-302442b1.js";typeof window.setImmediate>"u"&&(window.setImmediate=function(i,...e){setTimeout(()=>i(e))});class w{constructor(e,t={},s={}){n(this,"container",null);n(this,"wrapper",null);n(this,"wrapperMain",null);n(this,"options",{});n(this,"requestOptions",{});n(this,"fileData",null);this.container=e,this.options=t,this.requestOptions=s,this.createWrapper()}createWrapper(){this.wrapper=document.createElement("div"),this.wrapper.className="vue-office-docx",this.wrapperMain=document.createElement("div"),this.wrapperMain.className="vue-office-docx-main",this.wrapper.appendChild(this.wrapperMain),this.container.appendChild(this.wrapper)}setOptions(e){this.options=e}setRequestOptions(e){this.requestOptions=e}preview(e){return new Promise((t,s)=>{r.getData(e,this.requestOptions).then(async o=>{this.fileData=await r.getBlob(o),r.render(this.fileData,this.wrapperMain,this.options).then(()=>{t()}).catch(a=>{r.render("",this.wrapperMain,this.options),s(a)})}).catch(o=>{r.render("",this.wrapperMain,this.options),s(o)})})}save(e){l(e||`js-preview-docx-${new Date().getTime()}.docx`,this.fileData)}destroy(){this.container.removeChild(this.wrapper),this.container=null,this.wrapper=null,this.wrapperMain=null,this.options=null,this.requestOptions=null}}function f(i,e,t){return new w(i,e,t)}const v={init:f};const g={__name:"JsDocxDemo",setup(i){const e=h(null);return d(()=>{let t=v.init(e.value);t.preview("/vue-office/examples/dist/static/test-files/test.docx").then(s=>{console.log("docx preview done"),setTimeout(()=>{t.preview("/vue-office/examples/dist/static/test-files/test2.docx")},3e3)}).catch(s=>{console.log("err",s)})}),(t,s)=>(u(),m("div",{ref_key:"dom",ref:e},null,512))}};export{g as default};