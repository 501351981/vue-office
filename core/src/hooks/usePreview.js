import {ref} from 'vue';
export default function (defaultSrc){
    const type = ref('url');
    const inputSrc = ref(defaultSrc);
    const src = ref(defaultSrc);
    const xls = ref(typeof defaultSrc === 'string' ? defaultSrc.endsWith('.xls') : false);
    const fileList = ref([]);
    function beforeUpload(file){
        xls.value = file.name.endsWith('xls');
        let reader = new FileReader();
        reader.onload = (loadEvent) => {
            let arrayBuffer = loadEvent.target.result;
            src.value = arrayBuffer;
        };
        reader.readAsArrayBuffer(file);
        return false;
    }

    return {
        type,
        inputSrc,
        src,
        xls,
        fileList,
        beforeUpload
    };
}
