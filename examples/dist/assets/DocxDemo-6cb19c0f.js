import{d as r}from"./docx-049a8e5a.js";import{d as x}from"./url-de9b02cf.js";import{d as m,_ as l,r as u,o as h,w as v,a as _,c as g,b as D,e as y,f as w,g as B,u as O}from"./index-067a8cdd.js";import{P as R,u as f}from"./PreviewWrapper-625564dd.js";import"./_commonjs-dynamic-modules-302442b1.js";const $=m({name:"VueOfficeDocx",props:{src:[String,ArrayBuffer,Blob],requestOptions:{type:Object,default:()=>({})},options:{type:Object,default:()=>({})}},emits:["rendered","error"],setup(e,{emit:o}){const t=u(null);let n=null;function a(){let c=t.value;r.getData(e.src,e.requestOptions).then(async d=>{n=await r.getBlob(d),r.render(n,c,e.options).then(()=>{o("rendered")}).catch(p=>{r.render("",c,e.options),o("error",p)})}).catch(d=>{r.render("",c,e.options),o("error",d)})}h(()=>{e.src&&a()}),v(()=>e.src,()=>{e.src?a():r.render("",t.value,e.options).then(()=>{o("rendered")})});function s(c){x(c||`vue-office-docx-${new Date().getTime()}.docx`,n)}return{rootRef:t,save:s}}}),b={class:"vue-office-docx"},k={class:"vue-office-docx-main",ref:"rootRef"};function V(e,o,t,n,a,s){return _(),g("div",b,[D("div",k,null,512)])}const i=l($,[["render",V]]);i.install=function(e){e.component(i.name,i)};const E={__name:"DocxDemo",setup(e){function o(){f.hideLoading()}function t(s){console.log("出差",s),f.hideLoading()}const n=location.origin+(location.pathname+"/").replace("//","/")+"static/test-files/test.docx",a=u();return(s,c)=>(_(),y(R,{accept:".docx",placeholder:"请输入docx文件地址","default-src":n},{default:w(d=>[B(O(i),{ref_key:"docxRef",ref:a,src:d.src,style:{flex:"1",height:"0"},onRendered:o,onError:t},null,8,["src"])]),_:1}))}},P=l(E,[["__scopeId","data-v-637d9a60"]]);export{P as default};
