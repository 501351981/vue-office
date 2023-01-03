import VueOfficeExcel from './src/main'

VueOfficeExcel.install = function (Vue) {
    Vue.component(VueOfficeExcel.name, VueOfficeExcel)
}

export default VueOfficeExcel