import{d as r}from"./docx-629d4f97.js";import{d as p}from"./url-065d6777.js";import{d as x,_ as l,r as _,o as h,w as v,a as m,c as g,b as D,e as w,f as y,g as O,u as B}from"./index-69842e67.js";import{P as R,u}from"./PreviewWrapper-d9a4255b.js";import"./jszip.min-391c5e2f.js";import"./_commonjs-dynamic-modules-302442b1.js";typeof window.setImmediate>"u"&&(window.setImmediate=function(e,...o){setTimeout(()=>e(o))});const $=x({name:"VueOfficeDocx",props:{src:[String,ArrayBuffer,Blob],requestOptions:{type:Object,default:()=>({})},options:{type:Object,default:()=>({})}},emits:["rendered","error"],setup(e,{emit:o}){const n=_(null);let c=null;function a(){let t=n.value;r.getData(e.src,e.requestOptions).then(async i=>{c=await r.getBlob(i),r.render(c,t,e.options).then(()=>{o("rendered")}).catch(f=>{r.render("",t,e.options),o("error",f)})}).catch(i=>{r.render("",t,e.options),o("error",i)})}h(()=>{e.src&&a()}),v(()=>e.src,()=>{e.src?a():r.render("",n.value,e.options).then(()=>{o("rendered")})});function s(t){p(t||`vue-office-docx-${new Date().getTime()}.docx`,c)}return{rootRef:n,save:s}}}),b={class:"vue-office-docx"},V={class:"vue-office-docx-main",ref:"rootRef"};function k(e,o,n,c,a,s){return m(),g("div",b,[D("div",V,null,512)])}const d=l($,[["render",k]]);d.install=function(e){e.component(d.name,d)};const q={__name:"DocxDemo",setup(e){function o(){u.hideLoading()}function n(t){console.log("出差",t),u.hideLoading()}const c=location.origin+(location.pathname+"/").replace("//","/")+"static/test-files/test.docx",a=_(),s={headers:{"component-name":"VueOfficeDocx"}};return(t,i)=>(m(),w(R,{accept:".docx",placeholder:"请输入docx文件地址","default-src":c},{default:y(f=>[O(B(d),{ref_key:"docxRef",ref:a,src:f.src,"request-options":s,style:{flex:"1",height:"0"},onRendered:o,onError:n},null,8,["src"])]),_:1}))}},P=l(q,[["__scopeId","data-v-844ea5ef"]]);export{P as default};
