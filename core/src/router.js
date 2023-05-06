import {createRouter, createWebHashHistory} from 'vue-router';
const routes = [
    { path: '', redirect: '/docx' },
    { path: '/docx', component: ()=> import('./components/DocxDemo.vue') },
    { path: '/excel', component: ()=> import('./components/ExcelDemo.vue') },
    { path: '/pdf', component: ()=> import('./components/PdfDemo.vue') },
];

export default createRouter({
    history: createWebHashHistory(),
    routes
});