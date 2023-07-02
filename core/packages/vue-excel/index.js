import VueOfficeExcel from './src/main.vue';

VueOfficeExcel.install = function (Vue) {
    Vue.component(VueOfficeExcel.name, VueOfficeExcel);
};

export default VueOfficeExcel;