import VueOfficeDocxCom from './docx'
import VueOfficePdfCom from './pdf'
import VueOfficeExcelDom from './excel'

const components = [
    VueOfficeDocxCom,
    VueOfficePdfCom,
    VueOfficeExcelDom
]

const install = function (Vue) {
    components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export const VueOfficeDocx = VueOfficeDocxCom;
export const VueOfficePdf = VueOfficePdfCom;
export const VueOfficeExcel = VueOfficeExcelDom
export default {
    install,
    VueOfficeDocx,
    VueOfficePdf,
    VueOfficeExcel
}
