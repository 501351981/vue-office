import VueOfficePdf from './src/main.vue';

VueOfficePdf.install = function (Vue) {
    Vue.component(VueOfficePdf.name, VueOfficePdf);
};

export default VueOfficePdf;