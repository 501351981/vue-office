import { message } from 'ant-design-vue';
import {ref} from 'vue';

let loading = ref(false);
let hide;
function showLoading(content){
    hide = message.loading(content, 0);
    loading.value = true;
}
function hideLoading(){
    if(loading.value === true){
        hide();
        loading.value = false;
    }

}
export default {
    loading,
    showLoading,
    hideLoading
};