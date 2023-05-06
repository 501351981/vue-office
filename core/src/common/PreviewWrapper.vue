<script setup>
import {defineProps, watch} from 'vue';
import usePreview from '../hooks/usePreview.js';
import useLoading from '../hooks/useLoading.js';
import {isTest} from '../../utils/test.js';
const props = defineProps({
  accept: String,
  placeholder: String,
  defaultSrc: String
});

const {type, inputSrc, src, fileList, beforeUpload} = usePreview(props.defaultSrc);
watch(src,()=>{
    useLoading.showLoading();
},{
    immediate: true
});

</script>

<template>
  <div class="preview-wrapper">
    <div class="operate-area" v-if="!isTest()">
      <a-radio-group v-model:value="type" button-style="solid">
        <a-radio-button value="url">远程文件地址</a-radio-button>
        <a-radio-button value="upload">上传本地文件</a-radio-button>
      </a-radio-group>
      <a-input
          v-if="type==='url'"
          v-model:value="inputSrc"
          :placeholder="props.placeholder"
          style="width: 600px; margin-left:10px;"
      />
      <a-button
          v-if="type==='url'"
          type="primary"
          style="margin-left: 10px"
          @click="src=inputSrc"
      >
        预览
      </a-button>
      <a-upload
          v-if="type !== 'url'"
          :accept="props.accept"
          action=""
          :beforeUpload="beforeUpload"
          :file-list="[]"
      >
        <a-button  style="margin-left: 10px">
          <upload-outlined></upload-outlined>
          选择文件
        </a-button>
      </a-upload>

    </div>
    <slot :src="src"></slot>
    <div class="preview-wrapper-main">

    </div>
  </div>
</template>

<style scoped>
.preview-wrapper{
  height: calc(100vh - 46px);
  display: flex;
  flex-direction: column;
}
.operate-area {
  display: flex;
  margin: 10px;
  align-items: center;
  flex-wrap: wrap;
}
</style>