import {ref} from 'vue';
export default function (defaultSrc){
    const type = ref('url');
    const inputSrc = ref(defaultSrc);
    const src = ref(defaultSrc);
    const fileList = ref([]);
    function beforeUpload(file){
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
        fileList,
        beforeUpload
    };
}
