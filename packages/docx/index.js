import VueOfficeDocx from './src/main.vue';

VueOfficeDocx.install = function (Vue) {
    Vue.component(VueOfficeDocx.name, VueOfficeDocx);
};

export default VueOfficeDocx;