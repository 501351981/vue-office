import VueOfficePdf from './src/main'

VueOfficePdf.install = function (Vue) {
    Vue.component(VueOfficePdf.name, VueOfficePdf)
}

export default VueOfficePdf