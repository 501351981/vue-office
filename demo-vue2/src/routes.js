import VueRouter from 'vue-router'

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/vue-office-docx'
        },
        {
            path: '/vue-office-docx',
            component: () => import('./components/VueOfficeDocx.vue')
        },
        {
            path: '/vue-office-excel',
            component: () => import('./components/VueOfficeExcel.vue')
        },
        {
            path: '/vue-office-pdf',
            component: () => import('./components/VueOfficePdf.vue')
        },
        {
            path: '/js-preview-docx',
            component: () => import('./components/JsPreviewDocx.vue')
        },
        {
            path: '/js-preview-excel',
            component: () => import('./components/JsPreviewExcel.vue')
        },
        {
            path: '/js-preview-pdf',
            component: () => import('./components/JsPreviewPdf.vue')
        }
    ]
})