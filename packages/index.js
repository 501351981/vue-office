import VueOfficeDocxCom from './docx'

const components = [
    VueOfficeDocxCom
]

const install = function (Vue) {
    components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export const VueOfficeDocx = VueOfficeDocxCom;
export default {
    install,
    VueOfficeDocx: VueOfficeDocxCom
}
