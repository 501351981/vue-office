<script>
import {defineComponent, ref, onMounted, onBeforeUnmount, watch, nextTick} from 'vue-demi';
import Spreadsheet from 'x-data-spreadsheet';
import {getData, readExcelData, transferExcelToSpreadSheet} from './excel';
import {renderImage, clearCache} from './media';
import {readOnlyInput} from './hack';
import {debounce} from 'lodash';

export default defineComponent({
    name: 'VueOfficeExcel',
    props: {
        src: [String, ArrayBuffer, Blob],
        requestOptions: {
            type: Object,
            default: () => ({})
        },
        options: {
            type: Object,
            default: () => ({
                minColLength: 20
            })
        }
    },
    emits: ['rendered', 'error'],
    setup(props, {emit}) {
        const wrapperRef = ref(null);
        const rootRef = ref(null);
        let workbookDataSource = {
            _worksheets:[]
        };
        let mediasSource = [];
        let sheetIndex = 1;
        let ctx = null;
        let xs = null;
        let offset = null;

        function renderExcel(buffer) {
            readExcelData(buffer).then(workbook => {
                if (!workbook._worksheets || workbook._worksheets.length === 0) {
                    throw new Error('未获取到数据，可能文件格式不正确或文件已损坏');
                }
                const {workbookData, medias, workbookSource} = transferExcelToSpreadSheet(workbook, props.options);
                mediasSource = medias;
                workbookDataSource = workbookSource;
                offset = null;
                sheetIndex = 1;
                clearCache();
                xs.loadData(workbookData);
                renderImage(ctx, mediasSource, workbookDataSource._worksheets[sheetIndex], offset);
                emit('rendered');
                //涉及clear和offset

            }).catch(e => {
                console.warn(e);
                mediasSource = [];
                workbookDataSource = {
                    _worksheets:[]
                };
                clearCache();
                xs.loadData({});
                emit('error', e);
            });
        }
        const observerCallback = debounce(readOnlyInput, 200).bind(this,rootRef);
        const observer = new MutationObserver(observerCallback);
        const observerConfig = { attributes: true, childList: true, subtree: true };
        
        onMounted(() => {
            nextTick(()=>{
                observer.observe(rootRef.value, observerConfig);
                observerCallback(rootRef);

                window.xs = xs = new Spreadsheet(rootRef.value, {
                    mode: 'read',
                    showToolbar: false,
                    showContextmenu: props.options.showContextmenu || false,
                    view: {
                        height: () => wrapperRef.value && wrapperRef.value.clientHeight || 300,
                        width: () => wrapperRef.value && wrapperRef.value.clientWidth || 300,
                    },
                    row: {
                        height: 24,
                        len: 100
                    },
                    col: {
                        len: 26,
                        width: 80,
                        indexWidth: 60,
                        minWidth: 60,
                    },
                    autoFocus: false
                }).loadData({});

                let swapFunc = xs.bottombar.swapFunc;
                xs.bottombar.swapFunc = function (index) {
                    swapFunc.call(xs.bottombar, index);
                    sheetIndex = index + 1;
                    setTimeout(()=>{
                        xs.reRender();
                        renderImage(ctx, mediasSource, workbookDataSource._worksheets[sheetIndex], offset);
                    });

                };
                let clear = xs.sheet.editor.clear;
                xs.sheet.editor.clear = function (...args){
                    clear.apply(xs.sheet.editor, args);
                    setTimeout(()=>{
                        renderImage(ctx, mediasSource, workbookDataSource._worksheets[sheetIndex], offset);
                    });
                };
                let setOffset = xs.sheet.editor.setOffset;
                xs.sheet.editor.setOffset = function (...args){
                    setOffset.apply(xs.sheet.editor, args);
                    offset = args[0];
                    renderImage(ctx, mediasSource, workbookDataSource._worksheets[sheetIndex], offset);
                };
                const canvas = rootRef.value.querySelector('canvas');
                ctx = canvas.getContext('2d');
                if (props.src) {
                    getData(props.src, props.requestOptions).then(renderExcel).catch(e => {
                        xs.loadData({});
                        emit('error', e);
                    });
                }
            });
        });

        onBeforeUnmount(()=>{
            observer.disconnect();
            xs = null;
        });
        watch(() => props.src, () => {
            if (props.src) {
                getData(props.src, props.requestOptions).then(renderExcel).catch(e => {
                    xs.loadData({});
                    emit('error', e);
                });
            } else {
                xs.loadData({});
            }
        });
        return {
            wrapperRef,
            rootRef
        };
    }
});
</script>

<template>
    <div class="vue-office-excel" ref="wrapperRef">
        <div class="vue-office-excel-main" ref="rootRef"></div>
    </div>
</template>
<style lang="less">

</style>