import VueOfficeDocx from './src/main'

VueOfficeDocx.install = function (Vue) {
    Vue.component(VueOfficeDocx.name, VueOfficeDocx)
}

export default VueOfficeDocx