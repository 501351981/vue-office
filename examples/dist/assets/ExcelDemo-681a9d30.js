import{l as C,r as R,S as B,a as x,g,b as $,t as L,c as k}from"./hack-22091036.js";import{d as q}from"./url-de9b02cf.js";import{d as F,_ as V,r as w,o as W,n as j,h as I,w as M,a as T,c as N,b as A,i as H,e as P,f as U,j as z,g as G,u as J}from"./index-0307dd86.js";import{P as K,u as O}from"./PreviewWrapper-d36f54b3.js";import"./_commonjs-dynamic-modules-302442b1.js";const E={xls:!1,minColLength:20},Q=F({name:"VueOfficeExcel",props:{src:[String,ArrayBuffer,Blob],requestOptions:{type:Object,default:()=>({})},options:{type:Object,default:()=>({...E})}},emits:["rendered","error"],setup(e,{emit:l}){const i=w(null),c=w(null);let a={_worksheets:[]},n=[],f=0,o=null,t=null,u=null,h=null;function v(d){h=d,$(d,e.options.xls).then(s=>{if(!s._worksheets||s._worksheets.length===0)throw new Error("未获取到数据，可能文件格式不正确或文件已损坏");e.options.beforeTransformData&&typeof e.options.beforeTransformData=="function"&&(s=e.options.beforeTransformData(s));let{workbookData:m,medias:p,workbookSource:r}=L(s,{...E,...e.options});e.options.transformData&&typeof e.options.transformData=="function"&&(m=e.options.transformData(m)),n=p,a=r,u=null,f=0,k(),t.loadData(m),x(o,n,a._worksheets[f],u,e.options),l("rendered")}).catch(s=>{console.warn(s),n=[],a={_worksheets:[]},k(),t&&t.loadData({}),l("error",s)})}const D=C.debounce(R,200).bind(this,c.value),b=new MutationObserver(D),y={attributes:!0,childList:!0,subtree:!0};W(()=>{j(()=>{b.observe(c.value,y),D(c),t=new B(c.value,{mode:"read",showToolbar:!1,showContextmenu:e.options.showContextmenu||!1,view:{height:()=>i.value&&i.value.clientHeight||300,width:()=>i.value&&i.value.clientWidth||1200},row:{height:24,len:100},col:{len:26,width:80,indexWidth:60,minWidth:60},autoFocus:!1}).loadData({});let d=t.bottombar.swapFunc;t.bottombar.swapFunc=function(r){d.call(t.bottombar,r),f=r,setTimeout(()=>{t.reRender(),x(o,n,a._worksheets[f],u,e.options)})};let s=t.sheet.editor.clear;t.sheet.editor.clear=function(...r){s.apply(t.sheet.editor,r),setTimeout(()=>{x(o,n,a._worksheets[f],u,e.options)})};let m=t.sheet.editor.setOffset;t.sheet.editor.setOffset=function(...r){m.apply(t.sheet.editor,r),u=r[0],x(o,n,a._worksheets[f],u,e.options)},o=c.value.querySelector("canvas").getContext("2d"),e.src&&g(e.src,e.requestOptions).then(v).catch(r=>{n=[],a={_worksheets:[]},t.loadData({}),l("error",r)})})}),I(()=>{b.disconnect(),t=null}),M(()=>e.src,()=>{e.src?g(e.src,e.requestOptions).then(v).catch(d=>{n=[],a={_worksheets:[]},t.loadData({}),l("error",d)}):(n=[],a={_worksheets:[]},t.loadData({}),l("error",new Error("src属性不能为空")))});function S(d){q(d||`vue-office-excel-${new Date().getTime()}.xlsx`,h)}return{wrapperRef:i,rootRef:c,save:S}}}),X={class:"vue-office-excel",ref:"wrapperRef"},Y={class:"vue-office-excel-main",ref:"rootRef"};function Z(e,l,i,c,a,n){return T(),N("div",X,[A("div",Y,null,512)],512)}const _=V(Q,[["render",Z]]);_.install=function(e){e.component(_.name,_)};const re={__name:"ExcelDemo",setup(e){function l(){O.hideLoading()}function i(o){console.log("出差",o),O.hideLoading()}function c(o){return console.log("beforeTransformData",o),o}function a(o){return console.log("transformData",o),o}const n=location.origin+(location.pathname+"/").replace("//","/")+"static/test-files/test.xlsx",f=w();return(o,t)=>{const u=H("loading");return T(),P(K,{accept:".xlsx,.xls",placeholder:"请输入xlsx文件地址","default-src":n},{default:U(h=>[z(G(J(_),{ref_key:"docxRef",ref:f,src:h.src,options:{beforeTransformData:c,transformData:a,xls:h.xls},style:{flex:"1",height:"0"},onRendered:l,onError:i},null,8,["src","options"]),[[u,!0]])]),_:1})}}};export{re as default};
