import VueOfficeDocxCom from './docx'
import VueOfficePdfCom from './pdf'

const components = [
    VueOfficeDocxCom,
    VueOfficePdfCom
]

const install = function (Vue) {
    components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export const VueOfficeDocx = VueOfficeDocxCom;
export const VueOfficePdf = VueOfficePdfCom
export default {
    install,
    VueOfficeDocx: VueOfficeDocxCom,
    VueOfficePdf: VueOfficePdfCom
}
